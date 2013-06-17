'use strict'

define([
  'angular'
  , 'directives'
  , 'jquery'
], function (angular, directives, $) {

  directives.directive('t4mTrackerMap', function ($rootScope, $window, $timeout, $log) {
    return {
      restrict : 'E',
      replace : true,
      template : '<div style="margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden;" />',

      scope : {
        tracker : '=ngModel'
      },

      link : function (scope, iEl, iAttrs, controller) {
        scope.$watch('tracker', function (tracker) {
          //iEl.css({visibility : 'hidden'})

          if (!tracker) {
            return
          }

          $rootScope.$broadcast('t4m-loadingStart')

          $window.t4m_tracker_map_onload_fn = function () {

            var frameEl = $(iEl.find('iframe'))
              , spotEl = frameEl.contents()
              , spotHeadEl = spotEl.find('head')
              , spotBodyEl = spotEl.find('body')
              , spotMapEl = spotEl.find('#map')

            spotHeadEl.append($('<style type="text/css">.x-panel, .x-border-panel { visibility: hidden; }</style>'))

            /* This callback is triggered from outside the Angular digest cycle. */
            scope.$apply(function () {
              $timeout(function () {

                spotMapEl.appendTo(spotBodyEl)

//                spotMapEl
//                  .appendTo(spotBodyEl)
//                  .css({
//                    display : 'block'
//                    position : 'absolute',
//                    float : 1000,
//                    left : 0,
//                    top : 0,
//                    width : '100%',
//                    height : '100%',
//                    border : 'none',
//                    background : 'gray'
//                    visibility : 'visible'
//                  })

                // googleMapEl.css({width : '100%'})
                // spotMapEl.css({visibility : 'visible'})
                frameEl.css({
                  width : '100%',
                  height : '100%',
                  visibility : 'visible'
                })

                // iEl.css({visibility : 'visible'})

                $rootScope.$broadcast('t4m-loadingSuccess')

              }, 500)
            })
          }

          iEl.html('<iframe class="map" style="margin: 0; padding: 0; width: 99%; height: 99%; border: 0; visibility: hidden;" frameBorder="0" scrolling="no" onload="t4m_tracker_map_onload_fn()" src="/services/trackers0/' + tracker.id + '"></iframe>')

        })
      }
    }
  })
})
