'use strict'

define([
  'controllers'
], function (controllers) {

  return controllers.controller('Header', function ($rootScope, $scope, $log) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
      $scope.visible = true
      $scope.controller = current && current.$route && current.$route.controller
    })
  })

})