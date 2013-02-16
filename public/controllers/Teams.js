'use strict'

define([

  'jquery',

  'controllers'

], function ($, controllers) {

  controllers.controller('Teams', function ($rootScope, $scope, $timeout, $routeParams, $location, $log, content) {

    $scope.content = content

    $scope.$on('$routeChangeSuccess', function (event, current, previous) {
      var id = $routeParams.id || $scope.$eval('content.teams[0].id')
      $scope.team = $.grep($scope.$eval('content.teams') || [], function (team) {
        return team.id == id
      })[0]
    })

    var selectMember = function () {
      $scope.member = $.grep($scope.$eval('team.members') || [], function (member) {
        return member.id == $routeParams.member
      })[0]
    }

    $scope.$on('$routeChangeSuccess', selectMember)
    $scope.$on('$routeUpdate', selectMember)

    /*
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
     */
  })

})