'use strict'

define([
  'angular'
  , 'directives'
  , 'jquery'
], function (angular, directives, $) {

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

          $rootScope.$broadcast('t4m-loadingStart')

          $window.t4m_tracker_map_onload_fn = function () {

            delete $window.t4m_tracker_map_onload_fn

            var frameEl = $(iEl.find('iframe'))
              , documentEl = frameEl.contents()
              , headEl = documentEl.find('head')
              , bodyEl = documentEl.find('body')
              , mapEl = documentEl.find('#map')
              , windowObj = documentEl[0].parentWindow || documentEl[0].defaultView
              , mapsAPI = windowObj.google.maps
              , mapObj = new mapsAPI.Map(mapEl[0])

            headEl.append($('<style type="text/css">.x-panel, .x-border-panel { visibility: hidden; }</style>'))
            headEl.append($('<style type="text/css">body { background: red ! important; }</style>'))

            var getReady = function () {
              var deferred = $q.defer()

//              function monitor() {
//                if (windowObj.isMapSetup && windowObj.isFirstSuccessfulReq) {
//                  deferred.resolve(true)
//                  return
//                }
//
//                $timeout(monitor, 500)
//              }
//
//              monitor()

              mapsAPI.event.addListenerOnce(mapObj, 'idle', function () {
                scope.$apply(function () {
                  deferred.resolve(true)
                })
              })

              return deferred.promise
            }

            /* This callback is triggered from outside the Angular digest cycle. */
            //scope.$apply(function () {
            getReady().then(function (ready) {
              alert('ready')

              mapEl
                .appendTo(bodyEl)
                .css({
                  display : 'block',
                  position : 'absolute',
                  left : 0,
                  top : 0,
                  width : '100%',
                  height : '100%',
                  visibility : 'visible',
                  background : 'blue'
                })

              frameEl.css({
                width : '100%',
                height : '100%',
                visibility : 'visible'
              })

              $rootScope.$broadcast('t4m-loadingSuccess')
            })
            //})
          }

          iEl.html('<iframe class="map" style="margin: 0; padding: 0; width: 99%; height: 99%; border: 0; visibility: hidden;" frameBorder="0" scrolling="no" onload="t4m_tracker_map_onload_fn()" src="/services/trackers0/' + tracker.id + '"></iframe>')

        })
      }
    }
  })
})
