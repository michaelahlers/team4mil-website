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

    $scope.getNext = function () {
      var members = ($scope.$eval('team.members') || [])
      return members[(members.indexOf($scope.$eval('member')) + 1) % members.length]
    }

    $scope.getPrevious = function () {
      var members = ($scope.$eval('team.members') || [])
      return members[(members.indexOf($scope.$eval('member')) + members.length - 1) % members.length]
    }

  })

})