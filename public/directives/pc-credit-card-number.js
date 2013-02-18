'use strict'

define([

  'angular',
  'directives',

  'services/Stripe'

], function (angular, directives) {

  /**
   * Verifies a field contains a valid credit card number.
   */
  directives.directive('pcCreditCardNumber', function ($log, Stripe) {

      return {

        restrict : 'A',
        require : 'ngModel',

        link : function (scope, element, attrs, ctrl) {

          ctrl.$parsers.unshift(function (viewValue) {
            var valid = Stripe.validateNumber(viewValue)

            if (!valid) {
              ctrl.$setValidity('creditCardNumber', false);
              return undefined;
            }

            ctrl.$setValidity('creditCardNumber', true);
            return viewValue;
          })

        }
      }
    }
  )
})