'use strict'

define([
  'controllers'
], function (controllers) {

  return controllers.controller('Footer', function ($rootScope, $scope, $log) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
      $scope.visible = true
    })
  })

})