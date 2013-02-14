'use strict'

define([

  'directives',
  'jquery'

], function (directives, $) {

  directives.directive('pcLoading', function ($log, $timeout) {

      return {

        restrict : 'A',
        replace : true,
        scope : {
          placement : '@pcLoading'
        },

        controller : function ($rootScope, $scope, $element, $attrs) {
          $($element).tooltip({
            placement : $scope.placement || 'bottom',
            animation : true,
            trigger : 'manual',
            html : true,
            title : 'Loading&hellip;'
          })

          var pending

          $($element).on('click', function () {
            pending = $timeout(function () {
              $($element).tooltip('show')
            }, 1000)
          })

          var dismiss = function () {
            $timeout.cancel(pending)
            $($element).tooltip('hide')
          }

          $rootScope.$on('$routeChangeSuccess', dismiss)
        }
      }
    }
  )
})