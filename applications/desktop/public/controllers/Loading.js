'use strict'

define([
  'controllers'
], function (controllers) {

  return controllers.controller('Loading', function ($rootScope, $scope, $log) {
    $scope.loaders = 0

    $scope.$watch('loaders', function (loaders) {
      $log.log(loaders)
      $scope.visible = loaders > 0
    })

    $rootScope.$on('$routeChangeStart', function (event, current, previous) {
      $scope.loaders++
    })

    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
      $scope.loaders--
    })

    $rootScope.$on('t4m-loadingStart', function () {
      $scope.loaders++
    })

    $rootScope.$on('t4m-loadingSuccess', function () {
      $scope.loaders--
    })
  })

})
