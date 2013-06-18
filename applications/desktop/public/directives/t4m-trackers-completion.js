'use strict'

define('google-visualization', ['goog!visualization,1,packages:[corechart,gauge]'], function () {
  return window.google.visualization
})

define([
  'angular'
  , 'directives'
  , 'google-visualization'
], function (angular, directives, visualization) {


  directives.directive('t4mTrackersCompletion', function ($rootScope, $filter, $log) {
    return {
      restrict : 'E',
      replace : true,
      template : '<div class="t4m-trackers-completion" />',

      link : function (scope, iEl, iAttrs, controller) {
        var options = {
          width : 125, height : 125,
//          greenFrom : 20, greenTo : 35,
//          yellowFrom : 35, yellowTo : 50,
//          redFrom : 50, redTo : 60,
          max : 100,
          minorTicks : 5,
          animation : {
            'duration' : 1000,
            'easing' : 'inAndOut'
          }
        }

        var chart = new visualization.Gauge(iEl[0])

        var data = visualization.arrayToDataTable([
          ['Label', 'Value'],
          ['Completed', 0],
        ])

        chart.draw(data, options)

        $rootScope.$on('t4m-trackers-progress', function (event, progress) {

          var data = visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['Completed', Number($filter('number')(progress.percent * 100))],
          ])

          chart.draw(data, options)
        })
      }
    }
  })
})