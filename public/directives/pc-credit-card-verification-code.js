'use strict'

define([

  'angular',
  'directives',

  'services/Stripe'

], function (angular, directives) {

  /**
   * Verifies a field contains a valid credit card verification code.
   */
  directives.directive('pcCreditCardVerificationCode', function ($log, Stripe) {

      return {

        restrict : 'A',
        require : 'ngModel',

        link : function (scope, element, attrs, ctrl) {

          ctrl.$parsers.unshift(function (viewValue) {
            var valid = Stripe.validate.CVC(viewValue)

            if (!valid) {
              ctrl.$setValidity('creditCardVerificationCode', false);
              return undefined;
            }

            ctrl.$setValidity('creditCardVerificationCode', true);
            return viewValue;
          })

        }
      }
    }
  )
})