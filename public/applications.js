'use strict'

define(
  [
    'angular',

    'controllers',
    'controllers/Application',

    'controllers/Mission',
    'controllers/Contact',
    'controllers/Sponsors',

    'directives'
  ],
  function (angular) {

    var module = angular.module('app', [ 'controllers', 'directives'])

    module.config(function ($routeProvider, $locationProvider) {

      $routeProvider.when('/mission', {
        templateUrl : 'partials/mission',
        controller : 'Mission'
      })

      $routeProvider.when('/teams', {
        templateUrl : 'partials/teams',
        controller : 'Teams'
      })

      $routeProvider.when('/teams/:id', {
        templateUrl : 'partials/teams',
        controller : 'Teams'
      })

      $routeProvider.when('/sponsors', {
        templateUrl : 'partials/sponsors',
        controller : 'Sponsors'
      })

      $routeProvider.when('/contact', {
        templateUrl : 'partials/contact',
        controller : 'Contact'
      })

      $routeProvider.otherwise({
        redirectTo : '/mission'
      })

    })

    module.run(function ($rootScope, $log) {
    })

    return module

  })