'use strict'

define([
  'controllers',
  'services/Stripe',
  'directives/pc-credit-card-number',
  'directives/pc-credit-card-verification-code',
  'filters/sequence'
], function (controllers) {

  return controllers.controller('Donate', function ($rootScope, $scope, $http, $parse, $filter, $log, Stripe) {

    /* TODO: Move to constants for injection. */
    $scope.months = [
      { name : 'January', index : 1 },
      { name : 'February', index : 2 },
      { name : 'March', index : 3 },
      { name : 'April', index : 4 },
      { name : 'May', index : 5 },
      { name : 'June', index : 6 },
      { name : 'July', index : 7 },
      { name : 'August', index : 8 },
      { name : 'September', index : 9 },
      { name : 'October', index : 10 },
      { name : 'November', index : 11 },
      { name : 'December', index : 12 }
    ]

    /* TODO: Move to constants for injection. */
    $scope.years = $.map($filter('sequence')([], 0, 20), function (offset) {
      /* There is a magic time of year when this will produce the wrong output... */
      return new Date().getFullYear() + offset
    })

    var updateCardType = function () {
      $parse('donation.card.type').assign($scope, Stripe.getCardType($scope.$eval('donation.card.number')))
    }

    $scope.$watch('donation', updateCardType)
    $scope.$watch('donation.card', updateCardType)
    $scope.$watch('donation.card.number', updateCardType)

    var reset = function () {
      var now = new Date()

      $scope.donation = {
        donor : {
          name : '',
          mail : ''
        },
        card : {
          number : '',
          expiration : {
            month : NaN, //now.getMonth() + 1,
            year : NaN//now.getFullYear()
          },
          code : ''
        },
        amount : NaN
      }
    }

    /**
     * Exists only for testing purposes.
     */
    $scope.populate = function () {
      var now = new Date()

      $scope.donation = {
        donor : {
          name : 'Michael Ahlers',
          mail : 'michael.ahlers@patternconsulting.com'
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

    var closeStatus = $scope.closeStatus = function () {
      $('#modalStatus').modal('hide')
    }

    $scope.resetDonation = function () {
      reset()
    }

    $scope.startDonation = function () {
      var number = $scope.$eval('donation.card.number').trim()
      number = number.substring(number.length - 4)

      $scope.status = {
        pending : true,
        card : {
          number : number
        },
        amount : $scope.$eval('donation.amount')
      }

      openStatus()
    }

    $scope.cancelDonation = function () {
      closeStatus()
    }

    $scope.confirmDonation = function () {

      $scope.status = {
        processing : true
      }

      Stripe.charge({
        payer : {
          name : $scope.$eval('donation.donor.name'),
          mail : $scope.$eval('donation.donor.mail')
        },
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
      }).then(

        /* Resolved. */
        function (result) {
          var number = $scope.$eval('donation.card.number').trim()
          number = number.substring(number.length - 4)

          $scope.status = {
            success : true,
            donor : {
              mail : $scope.$eval('donation.donor.mail')
            },
            card : {
              number : number
            },
            charge : {
              id : result.id
            },
            amount : $scope.$eval('donation.amount')
          }

          reset()
        },

        /* Rejected. */
        function (reasons) {
          $log.error('Unable to charge account.', reasons)

          $scope.status = {
            error : true,
            service : {
              unavailable : reasons.hasAny(
                'status.service.unavailable',
                'stripe.configuration.unavailable',
                'stripe.service.token.unavailable',
                'stripe.service.unavailable',
                'charge.token.unavailable')
            },
            card : {
              invalid : reasons.hasAny('charge.card.invalid')
            }
          }
        })

    }
  })

})