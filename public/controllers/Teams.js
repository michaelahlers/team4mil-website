'use strict'

define([

  'jquery',

  'controllers',

  'services/Cache',
  'services/Resource'

], function ($, controllers) {

  controllers.controller('Teams', function ($rootScope, $scope, $routeParams, $log, Cache, Resource) {
    $scope.content = Cache.get('teams', function () {
      return Resource.get({name : 'teams'})
    })

    $scope.$on('$routeChangeSuccess', function (event, current, previous) {
      $scope.focusedId = $routeParams.id

      //$('#modalBiography').modal('show')
      //$('#modalBiography').modal('hide')
    })

    $scope.$watch('content.teams + focusedId', function () {
      if (!$scope.content.teams || !$scope.focusedId) {
        return
      }

      var members = $.map($scope.content.teams, function (team) {
        return team.members
      })

      $scope.focused = members.filter(function (member) {
        return $scope.focusedId = member.id
      })[0]
    })

    $scope.$watch('focused', function (current, previous) {
      $log.log(current, previous)
    })
  })

})