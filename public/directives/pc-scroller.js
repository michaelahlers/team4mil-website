'use strict'

define([

  'angular',
  'directives',
  'jquery',
  'jquery-smooth-scroll'

], function (angular, directives, $) {

  /**
   * Scrolls to this element under defined events.
   */
  directives.directive('pcScroller', function ($log) {

      return {

        restrict : 'E',
        replace : false,

        scope : {
          /**
           * Watch expression to trigger scrolling, evaluated in the parent scope.
           */
          watch : '@',

          /**
           * Expression executed in the parent scope, or independently (if that fails) that calculates the scroll offset.
           */
          offset : '@',

          /**
           * Expression evaluated in the parent scope that determines if the scrolling should be aborted.
           */
          cancel : '&'
        },

        controller : function ($rootScope, $scope, $element, $attrs) {
          var watch = $attrs.watch
          var offset = $scope.$parent.$eval($attrs.offset) || eval($attrs.offset) || 0

          if (!watch) {
            throw new Error('The watch expression is required.')
          }

          $scope.$parent.$watch(watch, function (incoming, outgoing) {
            if (angular.isDefined($attrs.cancel)) {
              var cancel = $scope.cancel()

              if (!(true === cancel || false === cancel)) {
                /* A harmless error, but worth informing the developer. */
                $log.error('Ignoring pc-scroller cancel expression, "' + $attrs.cancel + '", because it did not evaluate to boolean (got "' + cancel + '").')
              }

              if (true === cancel) {
                return
              }
            }

            /* Visit https://github.com/kswedberg/jquery-smooth-scroll for documentation. */
            $.smoothScroll({
              scrollTarget : $($element),
              offset : offset
            })

          })

        }
      }
    }
  )
})