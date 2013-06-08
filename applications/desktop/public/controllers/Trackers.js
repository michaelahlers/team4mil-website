'use strict'

define([
  'controllers'
  , 'directives/t4m-tracker-map'
], function (controllers) {

  return controllers.controller('Trackers', function ($rootScope, $scope, $log) {
    $scope.settings = {}

    $scope.$watch('settings.team', function (team) {
      $log.log(team)
    })
  })

})
