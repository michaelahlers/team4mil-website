'use strict'

define([

  'controllers'

], function (controllers) {
  controllers.controller('Sponsorship', function ($rootScope, $scope, $routeParams, $log, content) {
    $scope.content = content

    var getView = function () {
      if ($routeParams.contributors) {
        return 'contributors'
      }

      if ($routeParams.opportunities) {
        return 'opportunities'
      }

      return 'contributors'
    }

    $scope.$on('$routeUpdate', function () {
      $scope.view = getView()
    })

    $scope.$on('$routeChangeSuccess', function (event, current, previous) {
      $scope.view = getView()
    })
  })
})