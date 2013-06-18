'use strict'

define('google-visualization', ['goog!visualization,1,packages:[corechart,gauge]'], function () {
  return window.google.visualization
})

define([
  'angular'
  , 'directives'
  , 'google-visualization'
], function (angular, directives, visualization) {


  directives.directive('t4mTrackersSpeed', function ($rootScope, $log) {
    return {
      restrict : 'E',
      replace : true,
      template : '<div class="t4m-trackers-speed" />',

      link : function (scope, iEl, iAttrs, controller) {
        var options = {
          width : 150,
          redFrom : 40, redTo : 60,
          yellowFrom : 30, yellowTo : 40,
          max: 60,
          minorTicks : 5
        };

        var chart = new visualization.Gauge(iEl[0])
        //chart.draw(data, options)

        $rootScope.$on('t4m-trackers-progress', function (event, progress) {
          var data = visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['MPH', Math.round(progress.speed.mph * 10) / 10]
          ])

          chart.draw(data, options)
        })
      }
    }
  })
})