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

  directives.directive('t4mTrackerMap', function ($rootScope, $resource, $parse, $window, $q, $timeout, $log) {
    var feed = $resource('/services/trackers0/:id')

    return {
      restrict : 'E',
      replace : true,
      template : '<div class="t4m-tracker-map" />',

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
          mapTypeId : maps.MapTypeId.TERRAIN,
          disableDefaultUI : true,
          panControl : true,
          zoomControl : true
        })

        getDefaultViewport().then(function (viewport) {
          map.fitBounds(viewport)
        })

        // maps.event.addListenerOnce(map, 'idle', function () {
        //scope.$apply(function () {
        //$rootScope.$broadcast('t4m-loadingSuccess')
        //})
        //})

        scope.$watch('tracker', function (tracker) {
          if (!tracker) {
            delete scope.messages
            return
          }

          var monitor = function () {
            if (tracker == scope.tracker) {
              scope.messages = feed.get({ id : tracker.id}).$then(function (response) {
                $rootScope.$broadcast('t4m-loadingSuccess')
                return response.data.response.feedMessageResponse.messages.message
              })
              $timeout(monitor, 10000)
            }
          }
          monitor()
        })

        var path
          , marker

        scope.$watch('messages', function (messages) {
          if (path) {
            path.setMap(null)
          }

          if (marker) {
            marker.setMap(null)
          }

          if (!messages) {
            return
          }

          var coordinates = jQuery.map(messages, function (message) {
            return new maps.LatLng(message.latitude, message.longitude)
          })

          path = new maps.Polyline({
            path : coordinates,
            strokeColor : '#FF0000',
            strokeOpacity : 0.5,
            strokeWeight : 3
          })

          path.setMap(map)

          marker = new maps.Marker({
            position : coordinates[0],
            map : map
          })

          map.panTo(coordinates[0])
          map.setZoom(7)
        })
      }
    }
  })
})
