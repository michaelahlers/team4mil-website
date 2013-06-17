'use strict'

define([
  'angular'
  , 'directives'
  , 'jquery'
], function (angular, directives, $) {

  var instance = 0

  directives.directive('t4mTrackerMap', function ($rootScope, $parse, $window, $q, $timeout, $log) {
    return {
      restrict : 'E',
      replace : true,
      template : '<div style="margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden;" />',

      scope : {
        tracker : '=ngModel'
      },

      link : function (scope, iEl, iAttrs, controller) {
        scope.$watch('tracker', function (tracker) {
          if (!tracker) {
            iEl.html('')
            return
          }

          instance++

          var onloadRef = 't4m_tracker_map_onload_fn' + instance

          $rootScope.$broadcast('t4m-loadingStart')

          $window[onloadRef] = function () {
            delete $window[onloadRef]

            var frameEl = $(iEl.find('iframe'))
              , documentEl = frameEl.contents()
              , bodyEl = documentEl.find('body')
              , mapEl = documentEl.find('#map')
              , windowObj = documentEl[0].parentWindow || documentEl[0].defaultView

            /* The onload callback is triggered from outside the Angular digest cycle. */
            scope.$apply(function () {

              var isReady = function () {
                var deferred = $q.defer()

                function monitor() {
                  if (windowObj.isMapSetup && windowObj.isFirstSuccessfulReq && 0 == bodyEl.find('.x-mask-loading').length) {
                    deferred.resolve()
                    return
                  }

                  $timeout(monitor, 500)
                }

                monitor()

                return deferred.promise
              }

              isReady().then(function () {

                mapEl.appendTo(bodyEl)
                mapEl.css({
                  position : 'absolute',
                  left : 0,
                  top : 0,
                  width : '100%',
                  height : '100%'
                })

                frameEl.css({ width : '100%', height : '100%' })
                iEl.find('div').remove()
                $rootScope.$broadcast('t4m-loadingSuccess')
              })
            })
          }

          iEl.html('<div style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; background: #333;"></div><iframe class="map" style="margin: 0; padding: 0; width: 99%; height: 99%; border: 0;" frameBorder="0" scrolling="no" onload="' + onloadRef + '()" src="/services/trackers0/' + tracker.id + '"></iframe>')

        })
      }
    }
  })
})
