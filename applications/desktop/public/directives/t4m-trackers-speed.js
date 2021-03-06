'use strict'

define('google-visualization', ['goog!visualization,1,packages:[corechart,gauge]'], function () {
  return window.google.visualization
})

define([
  'angular'
  , 'directives'
  , 'google-visualization'
], function (angular, directives, visualization) {


  directives.directive('t4mTrackersSpeed', function ($rootScope, $filter, $log) {
    return {
      restrict : 'E',
      replace : true,
      template : '<div class="t4m-trackers-speed" />',

      link : function (scope, iEl, iAttrs, controller) {
        var options = {
          width : 125, height : 125,
          greenFrom : 20, greenTo : 35,
          yellowFrom : 35, yellowTo : 50,
          redFrom : 50, redTo : 60,
          max : 60,
          minorTicks : 5,
          animation : {
            'duration' : 1000,
            'easing' : 'inAndOut'
          }
        }

        var chart = new visualization.Gauge(iEl[0])

        var data = visualization.arrayToDataTable([
          ['Label', 'Value'],
          ['Avg. MPH', 0],
        ])

        chart.draw(data, options)

        $rootScope.$on('t4m-trackers-progress', function (event, progress) {

          var data = visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['Avg. MPH', Number($filter('number')(progress.speed.mph))],
          ])

          chart.draw(data, options)
        })
      }
    }
  })
})