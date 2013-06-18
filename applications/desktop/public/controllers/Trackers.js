'use strict'

define([
  'controllers'
  , 'directives/t4m-tracker-map'
  , 'directives/t4m-trackers-speed'
  , 'directives/t4m-trackers-completion'
  , 'services/Trackers'
], function (controllers) {

  return controllers.controller('Trackers', function ($rootScope, $scope, $log, $resource, Trackers) {
    var service = $resource('/services/trackers0/:id', {id : '@id'})

    $scope.settings = {}

    $scope.trackers = service.query().$then(function (response) {
      var trackers = response.data || []
      $scope.settings.tracker = trackers[0]
      return trackers
    })

    $scope.route = Trackers.getRoute()

    $scope.$on('t4m-trackers-progress', function (event, progress) {
      $scope.progress = progress
    })
  })

})
