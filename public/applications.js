'use strict'

define(
  [
    'angular',

    'controllers',
    'controllers/Application',

    'controllers/Mission',
    'controllers/Contact',
    'controllers/Sponsorship',

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
        controller : 'Teams',
        reloadOnSearch : false
      })

      $routeProvider.when('/sponsorship', {
        templateUrl : 'partials/sponsorship',
        controller : 'Sponsorship',
        reloadOnSearch : false
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