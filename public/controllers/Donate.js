'use strict'

define('Stripe', ['noext!https://js.stripe.com/v1/'], function () {
  return window.Stripe
})

define([
  'controllers',
  'Stripe'
], function (controllers, Stripe) {

  Stripe.setPublishableKey('pk_test_bAwWmtD5CZPctFHF5mzK2ZUx')

  return controllers.controller('Donate', function ($rootScope, $scope, $log) {

    var reset = function () {
      var now = new Date()

      $scope.donation = {
        donor : {
          name : 'John Smith',
          mail : 'john@example.com'
        },
        card : {
          /* Sample credit card number for Stripe testing. */
          number : '4242 4242 4242 4242',
          expiration : {
            month : now.getMonth() + 1,
            year : now.getFullYear()
          },
          code : '1234'
        },
        amount : 100
      }
    }

    reset()

    $scope.resetDonation = function () {
      reset()
    }

    $scope.startDonation = function () {

      Stripe.createToken({
        number : $scope.$eval('donation.card.number'),
        exp_month : $scope.$eval('donation.card.expiration.month'),
        exp_year : $scope.$eval('donation.card.expiration.year'),
        cvc : $scope.$eval('donation.card.code')
      }, function (res) {
        $log.log(arguments)
      })

    }

    $scope.cancelDonation = function () {

    }

    $scope.confirmDonation = function () {

    }
  })

})