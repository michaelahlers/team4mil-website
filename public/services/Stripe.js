'use strict'

define('Stripe', ['noext!https://js.stripe.com/v1/'], function (stripe, status) {
  return window.Stripe
})

define([
  'services',
  'Stripe'
], function (services, Stripe) {

  /**
   * Visit https://stripe.com/docs/stripe.js for details.
   */
  services.factory('Stripe', function ($q, $http, $rootScope, $log) {

      var getStatus = function () {
        return $http.get('/stripe/status')
      }

      var configure = function () {
        var deferred = $q.defer()

        getStatus().then(
          /* Resolved. Status was received. */
          function (response) {
            var key = response.data.keys.publishable
            Stripe.setPublishableKey(key)
            deferred.resolve({
              key : key
            })
          },

          /* Rejected. Status was received. */
          function (reason) {
            deferred.reject(reason)
          }
        )

        return deferred.promise
      }

      /* Handles the first step, submitting the credit card information directly to Stripe, who then replies with a single-use token. */
      var createToken = function (card) {
        var deferred = $q.defer()

        configure().then(
          /* Resolved. Configuration was successful. */
          function (configuration) {
            Stripe.createToken(
              /* Map our values to the Stripe API. */
              {
                name : card.name,
                number : card.number,
                exp_month : card.expiration.month,
                exp_year : card.expiration.year,
                cvc : card.code
              },

              /* Handle the response, and configures the promise. */
              function (status, result) {
                /* This callback is triggered outside the Angular lifecycle. */
                $rootScope.$apply(function () {
                  if (200 == status) {
                    deferred.resolve(result.id)
                  } else {
                    /* TODO: Interpret the cause. */
                    deferred.reject(result)
                  }
                })
              }
            )
          },

          /* Rejected. Configuration failed. */
          function (reason) {
            deferred.reject(reason)
          }
        )

        return deferred.promise
      }

      /* After the single-use token is retrieved, issue the charge with the amount to our server, which holds the private key. The server then issues the charge request to Stripe. */
      var createCharge = function (charge) {
        var deferred = $q.defer()

        createToken(charge.card).then(
          /* Resolved. To token was received. */
          function (token) {

            $http.post('/stripe/charges',
              {
                token : token,
                currency : charge.currency,
                amount : charge.amount
              })
              .success(function (data, status) {
                deferred.resolve(data)
              })
              .error(function (data, status) {
                /* TODO: Interpret the cause. */
                deferred.reject(data)
              })

          },

          /* Rejected. The token failed. */
          function (reason) {
            /* TODO: Interpret the cause. */
            deferred.reject(reason)
          }
        )

        return deferred.promise
      }

      return {

        validateNumber : function (value) {
          return Stripe.validateCardNumber(value)
        },

        validateCVC : function (value) {
          return Stripe.validateCVC(value)
        },

        getCardType : function (value) {
          return Stripe.cardType(value || '')
        },

        charge : function (charge, callback) {

          createCharge(charge).then(
            /* Resolved. */
            function (token) {
              $log.log(token)

              callback(undefined, {})
            },
            /* Rejected. */
            function (reason) {
              $log.error(reason)

              callback({}, undefined)
            })

//          createToken(charge.card, function (err, result) {
//            if (err) {
//              callback(err, undefined)
//              return
//            }
//
//            createCharge(
//
//              /* Map the result into a one-time charge object. */
//              {
//                token : result.id,
//                currency : charge.currency,
//                amount : charge.amount
//              },
//
//              /* Handle the response. */
//              function (err, result) {
//                if (err) {
//                  callback(err, undefined)
//                  return
//                }
//
//                callback(undefined, result)
//              })
//          })

        }
      }

    }
  )

})