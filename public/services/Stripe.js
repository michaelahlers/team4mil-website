'use strict'

define('Stripe', ['noext!https://js.stripe.com/v1/'], function () {
  window.Stripe.setPublishableKey('pk_test_bAwWmtD5CZPctFHF5mzK2ZUx')
  return window.Stripe
})

define([
  'services',
  'Stripe'
], function (services, Stripe) {

  services.factory('Stripe', function ($http, $log) {

      var createToken = function (card, callback) {

        Stripe.createToken(

          /* Map our values to the Stripe API. */
          {
            name : card.name,
            number : card.number,
            exp_month : card.expiration.month,
            exp_year : card.expiration.year,
            cvc : card.code
          },

          /* Handle the response, and invoke the callback appropriately. */
          function (status, result) {
            if (200 == status) {
              callback(undefined, result)
            } else {
              callback(result, undefined)
            }
          })

      }

      var createCharge = function (charge, callback) {
        $http.post('/stripe/charges', charge)
          .success(function (data, status) {
            callback(undefined, data)
          })
          .error(function (data, status) {
            callback(data, undefined)
          })
      }

      return {
        charge : function (charge, callback) {

          createToken(charge.card, function (err, result) {
            if (err) {
              callback(err, undefined)
              return
            }

            createCharge(

              /* Map the result into a one-time charge object. */
              {
                id : result.id,
                currency : charge.currency,
                amount : charge.amount
              },

              /* Handle the response. */
              function (err, result) {
                if (err) {
                  callback(err, undefined)
                  return
                }

                callback(undefined, err)
              })
          })

        }
      }

    }
  )

})