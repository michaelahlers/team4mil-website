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
  , 'services/Trackers'
], function (angular, directives, jQuery, maps) {

  var geocoder = new maps.Geocoder()
    , popup = new maps.InfoWindow()

  var toLatLng = function (point) {
    return new maps.LatLng(point.latitude, point.longitude)
  }

  var toLatLngs = function (points) {
    return jQuery.map(points, toLatLng)
  }

  directives.directive('t4mTrackerMap', function ($rootScope, $http, $resource, $q, $timeout, Trackers, $log) {
    var feed = $resource('/services/trackers0/:id')

    return {
      restrict : 'E',
      replace : true,
      template : '<div class="t4m-tracker-map" />',

      scope : {
        tracker : '=ngModel'
      },

      link : function (scope, iEl, iAttrs, controller) {
        //$rootScope.$broadcast('t4m-loadingStart')

        var map = new maps.Map(iEl[0], {
          mapTypeId : maps.MapTypeId.TERRAIN,
          disableDefaultUI : true,
          panControl : true,
          zoomControl : true
        })

        Trackers.getRoute().then(function (route) {
          var points = route.points
            , start = toLatLng(points[0])
            , finish = toLatLng(points[points.length - 1])

          map.fitBounds(new maps.LatLngBounds(start, finish))

          geocoder.geocode({'location' : start}, function (results, status) {
            var marker = new maps.Marker({
              position : start,
              map : map
            })

            maps.event.addListener(marker, 'click', function () {
              popup.setContent(results[0].formatted_address)
              popup.open(map, marker)
            })
          })

          geocoder.geocode({'location' : finish}, function (results, status) {
            var marker = new maps.Marker({
              position : finish,
              map : map
            })

            maps.event.addListener(marker, 'click', function () {
              popup.setContent(results[0].formatted_address)
              popup.open(map, marker)
            })
          })
        })

        scope.$watch('tracker', function (tracker) {
          Trackers.monitor(tracker)
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
          map.panTo(currentMarker.getPosition())
        })

        scope.$on('t4m-trackers-progress', function (event, progress) {
          var currentCoordinate = toLatLng(progress.reference.point)

          currentMarker.setPosition(currentCoordinate)

          Trackers.getRoute().then(function (route) {
            var points = toLatLngs(route.points)
              , behindPoints = points.slice(0, progress.nearest.index)
              , aheadPoints = points.slice(progress.nearest.index, points.length - 1)

            behindPolyline.setPath(behindPoints.concat([currentCoordinate]))
            aheadPolyline.setPath([currentCoordinate].concat(aheadPoints))

            geocoder.geocode({'location' : currentCoordinate}, function (results, status) {
              currentPopup.setContent(results[0].formatted_address)
            })
          })
        })
      }
    }
  })
})
