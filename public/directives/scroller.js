'use strict'

define([

  'directives',
  'jquery',
  'jquery-smooth-scroll'

], function (directives, $) {

  /**
   * Scrolls to this element under defined events.
   */
  directives.directive('pcScroller', function ($log) {

      return {

        restrict : 'E',
        replace : false,
        scope : {
          watch : '@'
        },

        controller : function ($rootScope, $scope, $element, $attrs) {
          var watch = $attrs.watch

          if (!watch) {
            throw new Error('The watch expression is required.')
          }

          $scope.$watch(watch, function (incoming, outgoing) {
            $.smoothScroll({
              scrollTarget : $($element)//,
              //offset : -$('body > header > nav').outerHeight(true)
            })

          })

        }
      }
    }
  )
})