'use strict'

define(
  [
    'controllers',
    'controllers/Mission',
    'controllers/Teams',
    'controllers/Sponsorship',
    'controllers/Contact'
  ],

  function (controllers) {
    controllers.controller('Application', function ($rootScope, $scope, $route, $routeParams, $log) {
        $scope.$on('$routeChangeSuccess', function (event, current, previous) {
          $scope.controller = current && current.$route && current.$route.controller
        })
      }
    )
  })