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

      /* Handles the first step, submitting the credit card information directly to Stripe, who then replies with a single-use token. */
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

      /* After the single-use token is retrieved, issue the charge with the amount to our server, which holds the private key. The server then issues the charge request to Stripe. */
      var createCharge = function (charge, callback) {
        $http.post('/stripe/charges',

          {
            token : charge.token,
            currency : charge.currency,
            amount : charge.amount
          })

          .success(function (data, status) {
            callback(undefined, data)
          })

          .error(function (data, status) {
            callback(data, undefined)
          })

      }

      return {
        validate : {

          number : function (value) {
            return Stripe.validateCardNumber(value)
          }

        },

        charge : function (charge, callback) {

          createToken(charge.card, function (err, result) {
            if (err) {
              callback(err, undefined)
              return
            }

            createCharge(

              /* Map the result into a one-time charge object. */
              {
                token : result.id,
                currency : charge.currency,
                amount : charge.amount
              },

              /* Handle the response. */
              function (err, result) {
                if (err) {
                  callback(err, undefined)
                  return
                }

                callback(undefined, result)
              })
          })

        }
      }

    }
  )

})