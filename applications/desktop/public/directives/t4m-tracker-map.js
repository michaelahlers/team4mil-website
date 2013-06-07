'use strict'

define([
  'angular'
  , 'directives'
  , 'jquery'
], function (angular, directives, $) {

  directives.directive('t4mTrackerMap', function ($log) {
    return {
      restrict : 'E',
      replace : true,
      template : '<div style="margin: 0; padding: 0; width: 100%; height: 100%;" />',

      link : function (scope, iEl, iAttrs, controller) {
        $('<iframe class="map" style="margin: 0; padding: 0; width: 100%; height: 100%;" frameborder="0"></iframe>')
          .appendTo(iEl)
          .load(function () {
            alert('Loaded.')
          })
          .attr('src', '/services/trackers0/2013-allied-forces-team')
      }
    }
  })
})
