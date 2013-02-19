'use strict'

define([
  'controllers'
], function (controllers) {

  return controllers.controller('Navigation', function ($rootScope, $scope, $log) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
      $scope.controller = current && current.$route && current.$route.controller
    })
  })

})