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

        $container.masonry({
          columnWidth : function (containerWidth) {
            return containerWidth / 4;
          }
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