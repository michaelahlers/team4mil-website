'use strict'

define('Stripe', ['noext!https://js.stripe.com/v1/'], function (stripe, status) {
  return window.Stripe
})

define([
  'angular',
  'services',
  'Stripe'
], function (angular, services, Stripe) {

    var isUndefined = angular.isUndefined
    var isArray = angular.isArray
    var isString = angular.isString

    var report = function (list, message) {
      if (isString(list) && isUndefined(message)) {
        return [list]
      }

      if (isUndefined(list)) {
        list = []
      }

      if (!isArray(list)) {
        list = [list]
      }

      list.push(message)

      return list
    }

    /**
     * Visit https://stripe.com/docs/stripe.js for details.
     */
    services.factory('Stripe', function ($q, $http, $parse, $rootScope, $log) {

        /**
         * @return {promise} Promise providing the Stripe status object.
         */
        var getStatus = function () {
          var deferred = $q.defer()

          $http.get('/stripe/status')
            .success(function (data, status) {
              deferred.resolve(data)
            })
            .error(function (data, status) {
              /* Dispose the response object. Too messy for our needs. */
              $log.error('Failed to GET status service.', status, data)
              deferred.reject(report('status.service.unavailable'))
            }
          )

          return deferred.promise
        }

        /**
         * Configures the Stripe service API.
         *
         * @return {promise} Promise providing the configuration.
         */
        var getConfiguration = function () {
          var deferred = $q.defer()

          getStatus().then(
            /* Resolved. Status was received. */
            function (status) {
              var key = status.keys.publishable
              Stripe.setPublishableKey(key)
              deferred.resolve({
                key : key
              })
            },

            /* Rejected. Status was not received.. */
            function (reasons) {
              $log.error('Unable to configure.', reasons)
              deferred.reject(report(reasons, 'stripe.service.unconfigured'))
            }
          )

          return deferred.promise
        }

        /**
         * Submittings the credit card information directly to Stripe, who then replies with a single-use token.
         *
         * @return {promise} Promise providing a single-use token for issuing a charge.
         */
        var createToken = function (card) {
          var deferred = $q.defer()

          getConfiguration().then(
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
                      $log.error('Failed to create token.', status, result)
                      deferred.reject(report('stripe.charge.card.invalid'))
                    }
                  })
                }
              )
            },

            /* Rejected. Configuration failed. */
            function (reasons) {
              $log.error('Unable to create token.', reasons)
              deferred.reject(report(reasons, 'stripe.service.unavailable'))
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
                  $log.error('Failed to create charge.', status, data)
                  /* TODO: Interpret the cause. */
                  deferred.reject(data)
                })

            },

            /* Rejected. The token failed. */
            function (reasons) {
              $log.error('Unable to create charge.', reasons)
              deferred.reject(report(reasons, 'stripe.charge.create.failed'))
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
              function (reasons) {
                $log.error('Failed to charge account.', reasons)

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

  }
)