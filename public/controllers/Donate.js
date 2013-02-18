'use strict'

define([
  'controllers',
  'services/Stripe'
], function (controllers) {

  return controllers.controller('Donate', function ($rootScope, $scope, $http, $log, Stripe) {

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

    var openStatus = function () {
      $('#modalStatus').modal({
        backdrop : 'static',
        keyboard : false
      })
    }

    var closeStatus = function () {
      $('#modalStatus').modal('hide')
    }

    $scope.resetDonation = function () {
      reset()
    }

    $scope.startDonation = function () {
      openStatus()
    }

    $scope.cancelDonation = function () {
      closeStatus()
    }

    $scope.confirmDonation = function () {

      Stripe.charge(
        {
          card : {
            name : $scope.$eval('donation.donor.name'),
            number : $scope.$eval('donation.card.number'),
            expiration : {
              month : $scope.$eval('donation.card.expiration.month'),
              year : $scope.$eval('donation.card.expiration.year')
            },
            code : $scope.$eval('donation.card.code')
          },
          currency : 'USD',
          amount : $scope.$eval('donation.amount') * 100
        },

        function (err, result) {
          $log.log(err, result)
        })

    }
  })

})