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

  var geocoder = new maps.Geocoder()
    , popup = new maps.InfoWindow()

  directives.directive('t4mTrackerMap', function ($rootScope, $http, $resource, $q, $timeout, $log) {
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

          geocoder.geocode({'address' : 'US'}, function (results, status) {
            scope.$apply(function () {
              deferred.resolve(results[0].geometry.viewport)
            })
          })

          return deferred.promise
        }

        var getRoute = function () {
          return $http.get('/services/trackers0/2013-raam-route').then(function (response) {
            return response.data
          })
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

        getRoute().then(function (route) {
          var coordinates = jQuery.map(route, function (position) {
            return new maps.LatLng(position.latitude, position.longitude)
          })

//var path = new maps.Polyline({
//  path : coordinates,
//  strokeColor : '#000000',
//  strokeOpacity : 0.5,
//  strokeWeight : 5
//})
//
//path.setMap(map)

          geocoder.geocode({'location' : coordinates[0]}, function (results, status) {
            var marker = new maps.Marker({
              position : coordinates[0],
              map : map
            })

            maps.event.addListener(marker, 'click', function () {
              popup.setContent(results[0].formatted_address)
              popup.open(map, marker)
            })
          })

          geocoder.geocode({'location' : coordinates[coordinates.length - 1]}, function (results, status) {
            var marker = new maps.Marker({
              position : coordinates[coordinates.length - 1],
              map : map
            })

            maps.event.addListener(marker, 'click', function () {
              popup.setContent(results[0].formatted_address)
              popup.open(map, marker)
            })
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
                $rootScope.$broadcast('t4m-loadingSuccess')
                return response.data.response.feedMessageResponse.messages.message
              })
              $timeout(monitor, 1000 * 30)
            }
          }
          monitor()
        })

        var behindPolyline = new maps.Polyline({
            strokeColor : '#FF0000',
            strokeOpacity : 0.75,
            strokeWeight : 5
          })
          , aheadPolyline = new maps.Polyline({
            strokeColor : '#000000',
            strokeOpacity : 0.5,
            strokeWeight : 3
          })
          , currentMarker = new maps.Marker({ map : map })
          , currentPopup = new maps.InfoWindow()

        behindPolyline.setMap(map)
        aheadPolyline.setMap(map)

        maps.event.addListener(currentMarker, 'click', function () {
          currentPopup.open(map, currentMarker)
        })

        var toLatLng = function (point) {
          return new maps.LatLng(point.latitude, point.longitude)
        }

        var toLatLngs = function (points) {
          return jQuery.map(points, toLatLng)
        }

        var toDistance = function (point0, point1) {
          return Math.sqrt(Math.pow(point0.latitude - point1.latitude, 2) + Math.pow(point0.longitude - point1.longitude, 2))
        }

        var getProgress = function (referencePoint) {
          var deferred = $q.defer()

          getRoute().then(function (points) {
            var shortestDistance = toDistance(referencePoint, points[0])
              , closestIndex = 0

            for (var index = 1; index < points.length; index++) {
              var distance = toDistance(referencePoint, points[index])

              if (distance < shortestDistance) {
                closestIndex = index
                shortestDistance = distance
              }
            }

            deferred.resolve({
              index : closestIndex,
              total : points.length,
              all : points,
              behind : points.slice(0, closestIndex),
              ahead : points.slice(closestIndex, points.length - 1),
              resolved : points[closestIndex],
              reference : referencePoint
            })
          })

          return deferred.promise
        }

        scope.$watch('messages', function (messages) {
          if (!messages) {
            return
          }

          var currentCoordinate = toLatLng(messages[0])

          currentMarker.setPosition(currentCoordinate)

          getProgress(messages[0]).then(function (progress) {
            behindPolyline.setPath(toLatLngs(progress.behind))
            aheadPolyline.setPath(toLatLngs(progress.ahead))
          })

          geocoder.geocode({'location' : currentCoordinate}, function (results, status) {
            currentPopup.setContent(results[0].formatted_address)
          })
        })
      }
    }
  })
})
