'use strict'

define([

  'directives',
  'jquery',
  'jquery-masonry'

], function (directives, $) {

  directives.directive('pcMasonry', function ($log) {

    return {

      restrict : 'A',

      controller : function ($rootScope, $scope, $element, $attrs, $log) {
        $log.log('controller')
      },

      link : function (scope, iElement, iAttrs) {
        var $container = $(iElement);

        setTimeout(function () {
          $container.imagesLoaded(function () {
            $container.masonry({
              columnWidth : function (containerWidth) {
                return containerWidth / 4;
              }
            })
          })
        }, 1000)
      }
    }
  })
})