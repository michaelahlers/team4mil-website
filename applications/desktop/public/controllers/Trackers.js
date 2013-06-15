'use strict'

define([
  'controllers'
  , 'directives/t4m-tracker-map'
], function (controllers) {

  return controllers.controller('Trackers', function ($rootScope, $scope, $log, $resource) {
    var service = $resource('/services/trackers0/:id', {id : '@id'})

    $scope.settings = {}

    $scope.trackers = service.query().$then(function (response) {
      var trackers = response.data || []
      $scope.settings.tracker = trackers[0]
      return trackers
    })
  })

})
