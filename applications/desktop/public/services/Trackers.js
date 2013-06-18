'use strict'

define([
  'services', 'angular-resource'
], function (services) {
  services.factory('Trackers', function ($q, $resource, $http, $log) {

    var routePoints = $http.get('/services/trackers0/2013-raam-route').then(function (response) {
      return response.data
    })

    return {
      getRoutePoints : function () {
        return routePoints
      }
    }
  })
})