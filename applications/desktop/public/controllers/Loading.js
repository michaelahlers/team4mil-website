'use strict'

define([
  'controllers'
], function (controllers) {

  return controllers.controller('Loading', function ($rootScope, $scope, $log) {
    $scope.visible = true

    $rootScope.$on('$routeChangeStart', function (event, current, previous) {
      $scope.visible = true
    })

    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
      $scope.visible = false
    })
  })

})