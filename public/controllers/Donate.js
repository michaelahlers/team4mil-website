'use strict'

define([

  'controllers'

], function (controllers) {

  return controllers.controller('Donate', function ($rootScope, $scope, $log) {

    var reset = function () {
      var now = new Date()

      $scope.donation = {
        donor : {
          name : '',
          mail : ''
        },
        card : {
          /* Sample credit card number for Stripe testing. */
          number : '4242 4242 4242 4242',
          expiration : {
            month : now.getMonth() + 1,
            year : now.getFullYear()
          },
          code : ''
        }
      }
    }

    reset()

    $scope.resetDonation = function () {
      reset()
    }

    $scope.startDonation = function () {

    }

    $scope.cancelDonation = function () {

    }

    $scope.confirmDonation = function () {

    }
  })

})