'use strict'

define([

  'jquery',

  'controllers',

  'services/Cache',
  'services/Resource'

], function ($, controllers) {

  controllers.controller('Teams', function ($rootScope, $scope, $timeout, $routeParams, $location, $log, Cache, Resource) {
    $scope.content = Cache.get('teams', function () {
      return Resource.get({name : 'teams'})
    })

    $scope.toRows = function (array, length) {
      array = (array || []).slice(0)

      var rows = []

      while (array.length) {
        rows.push(array.splice(0, length))
      }

      $log.log(rows)

      return rows
    }

    $scope.$on('$routeUpdate', function () {
      $scope.focused = {
        id : $routeParams.id
      }
    })

    $scope.$on('$routeChangeSuccess', function (event, current, previous) {
      $scope.focused = {
        id : $routeParams.id
      }
    })

    $scope.$watch('content.teams + focused.id', function () {
      if (!$scope.content.teams || !$scope.focused.id) {
        return
      }

      var members = $.map($scope.content.teams, function (team) {
        return team.members
      })

      $scope.focused = members.filter(function (member) {
        return $scope.focused.id == member.id
      })[0]
    })

//    $('#modalBiography').on('hide', function () {
//      $scope.focused = {}
//    })

    $scope.$watch('focused', function (current, previous) {
      if (current.id) {
        $('#modalBiography').modal({
          backdrop : 'static',
          keyboard : false
        })
      } else {
        $('#modalBiography').modal('hide')
        $location.search({})
      }
    })
  })

})