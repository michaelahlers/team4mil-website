'use strict'

define([
  'controllers'
  , 'services/Trackers'
  , 'directives/t4m-tracker-map'
], function (controllers) {

  return controllers.controller('Trackers', function ($rootScope, $scope, $log, Trackers) {
    $scope.settings = {}

    $scope.$watch('settings.team', function (team) {
      $log.log(team)
    })

    $scope.trackers = Trackers.query().$then(function (response) {
      var trackers = response.data
      $scope.settings.tracker = (trackers || [])[0]
      return trackers
    })
  })

})
