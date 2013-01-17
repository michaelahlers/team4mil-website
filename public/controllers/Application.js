'use strict'

define(
  [
    'controllers',

    'controllers/About'
  ],

  function (controllers) {
    controllers.controller('Application', function ($rootScope, $scope, $route, $routeParams, $log) {
        $scope.$on('$routeChangeSuccess', function (event, current, previous) {
          // $scope.view = current && current.$route && current.$route.target
        })
      }
    )
  })