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
        var $container = $($element)

        $container.css({ opacity : 0 })

        $container.imagesLoaded(function () {
          $container.masonry({
            columnWidth : function (containerWidth) {
              return containerWidth / 4;
            }
          })
          $container.css({ opacity : 1 })
        })

        $scope.$watch(function () {
          $container.imagesLoaded(function () {
            $container.masonry('reload')
          })
        })
      }
    }
  })
})