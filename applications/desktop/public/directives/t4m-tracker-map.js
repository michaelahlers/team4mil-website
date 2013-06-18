'use strict'

define('google-maps', ['async!https://maps.googleapis.com/maps/api/js?sensor=false!callback'], function () {
  window.google.maps.visualRefresh = true
  return window.google.maps
})

define([
  'angular'
  , 'directives'
  , 'jquery'
  , 'google-maps'
], function (angular, directives, jQuery, maps) {

  var instance = 0

  directives.directive('t4mTrackerMap', function ($rootScope, $resource, $parse, $window, $q, $timeout, $log) {
    var feed = $resource('/services/trackers0/:id')

    return {
      restrict : 'E',
      replace : true,
      template : '<div style="margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden;" />',

      scope : {
        tracker : '=ngModel'
      },

      link : function (scope, iEl, iAttrs, controller) {
        $rootScope.$broadcast('t4m-loadingStart')

        var getDefaultViewport = function () {
          var deferred = $q.defer()

          new maps.Geocoder().geocode({'address' : 'US'}, function (results, status) {
            scope.$apply(function () {
              deferred.resolve(results[0].geometry.viewport)
            })
          })

          return deferred.promise
        }

        var map = new maps.Map(iEl[0], {
          mapTypeId : maps.MapTypeId.TERRAIN
        })

        getDefaultViewport().then(function (viewport) {
          map.fitBounds(viewport)
        })

        maps.event.addListenerOnce(map, 'idle', function () {
          scope.$apply(function () {
            $rootScope.$broadcast('t4m-loadingSuccess')
          })
        })

        scope.$watch('tracker', function (tracker) {
          if (!tracker) {
            delete scope.messages
            return
          }

          var monitor = function () {
            if (tracker == scope.tracker) {
              scope.messages = feed.get({ id : tracker.id}).$then(function (response) {
                return response.data.response.feedMessageResponse.messages.message
              })
              //$timeout(monitor, 10000)
            }
          }
          monitor()
        })

//        scope.$watch('messages', function (messages) {
//          if (!messages) {
//            return
//          }
//
//          var coordinates = jQuery.map(messages, function (message) {
//            return new maps.LatLng(message.latitude, message.longitude)
//          })
//
//          var path = new maps.Polyline({
//            path : coordinates,
//            strokeColor : '#FF0000',
//            strokeOpacity : 1.0,
//            strokeWeight : 2
//          })
//
//          path.setMap(map)
//
//          var marker = new maps.Marker({
//            position : coordinates[0],
//            map : map
//          })
//
//          map.setCenter(coordinates[0])
//
//        })


//        scope.$watch('tracker', function (tracker) {
//          if (!tracker) {
//            iEl.html('')
//            return
//          }
//
//          instance++
//
//          var onloadRef = 't4m_tracker_map_onload_fn' + instance
//
//          $rootScope.$broadcast('t4m-loadingStart')
//
//          $window[onloadRef] = function () {
//            delete $window[onloadRef]
//
//            var frameEl = $(iEl.find('iframe'))
//              , documentEl = frameEl.contents()
//              , bodyEl = documentEl.find('body')
//              , mapEl = documentEl.find('#map')
//              , windowObj = documentEl[0].parentWindow || documentEl[0].defaultView
//
//            /* The onload callback is triggered from outside the Angular digest cycle. */
//            scope.$apply(function () {
//
//              var isReady = function () {
//                var deferred = $q.defer()
//
//                function monitor() {
//                  if (windowObj.isMapSetup && windowObj.isFirstSuccessfulReq && 0 == bodyEl.find('.x-mask-loading').length) {
//                    deferred.resolve()
//                    return
//                  }
//
//                  $timeout(monitor, 500)
//                }
//
//                monitor()
//
//                return deferred.promise
//              }
//
//              isReady().then(function () {
//
//                mapEl.appendTo(bodyEl)
//                mapEl.css({
//                  position : 'absolute',
//                  left : 0,
//                  top : 0,
//                  width : '100%',
//                  height : '100%'
//                })
//
//                frameEl.css({ width : '100%', height : '100%' })
//                iEl.find('div').remove()
//                $rootScope.$broadcast('t4m-loadingSuccess')
//              })
//            })
//          }
//
//          iEl.html('<div style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; background: #333;"></div><iframe class="map" style="margin: 0; padding: 0; width: 99%; height: 99%; border: 0;" frameBorder="0" scrolling="no" onload="' + onloadRef + '()" src="/services/trackers0/' + tracker.id + '"></iframe>')
//
//        })
      }
    }
  })
})
