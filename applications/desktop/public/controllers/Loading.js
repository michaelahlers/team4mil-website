'use strict'

define([
  'controllers'
], function (controllers) {

  return controllers.controller('Loading', function ($rootScope, $scope, $log) {
    $rootScope.$on('$routeChangeStart', function (event, current, previous) {
      $scope.visible = true
    })

    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
      $scope.visible = false
    })

    $rootScope.$on('$routeUpdate', function (event, current, previous) {
      $scope.visible = false
    })

    $rootScope.$on('t4m-loadingStart', function () {
      $scope.visible = true
    })

    $rootScope.$on('t4m-loadingSuccess', function () {
      $scope.visible = false
    })
  })

})
