'use strict'

define([
  'services', 'angular-resource'
], function (services) {
  services.factory('Trackers', function ($rootScope, $q, $resource, $http, $timeout) {

    var route = $http.get('/services/trackers0/2013-raam-route').then(function (response) {
      return response.data
    })

    var activeTracker

    return {
      getRoute : function () {
        return route
      },

      monitor : function (tracker) {
        activeTracker = tracker

        if (!tracker || !tracker.id) {
          $rootScope.$broadcast('t4m-trackers-stopped')
          return
        }

        $rootScope.$broadcast('t4m-trackers-started', tracker)

        var monitor = function () {
          if (tracker == activeTracker) {
            $http.get('/services/trackers0/' + tracker.id).then(function (response) {
              $rootScope.$broadcast('t4m-trackers-progress', response.data)
            })
            $timeout(monitor, 10000)
          }
        }

        monitor()
      }
    }
  })
})