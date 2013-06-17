'use strict'

define([
  'angular'
  , 'directives'
  , 'jquery'
], function (angular, directives, $) {

  directives.directive('t4mTrackerMap', function ($rootScope, $window, $q, $timeout, $log) {
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
              , documentEl = frameEl.contents()
              , headEl = documentEl.find('head')
              , bodyEl = documentEl.find('body')
              , mapEl = documentEl.find('#map')
              , windowObj = documentEl[0].parentWindow || documentEl[0].defaultView

            headEl.append($('<style type="text/css">.x-panel, .x-border-panel { visibility: hidden; }</style>'))

            var getReady = function () {
              var deferred = $q.defer()

              function monitor() {
                if (windowObj.isMapSetup) {
                  deferred.resolve(true)
                  return
                }

                $timeout(monitor, 500)
              }

              monitor()

              return deferred.promise
            }

            /* This callback is triggered from outside the Angular digest cycle. */
            scope.$apply(function () {
              getReady().then(function (status) {
                mapEl.appendTo(bodyEl)
                frameEl.css({
                  width : '100%',
                  height : '100%',
                  visibility : 'visible'
                })
                $rootScope.$broadcast('t4m-loadingSuccess')
              })
            })
          }

          iEl.html('<iframe class="map" style="margin: 0; padding: 0; width: 99%; height: 99%; border: 0; visibility: hidden;" frameBorder="0" scrolling="no" onload="t4m_tracker_map_onload_fn()" src="/services/trackers0/' + tracker.id + '"></iframe>')

        })
      }
    }
  })
})
