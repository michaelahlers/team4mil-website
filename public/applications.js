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

//      $routeProvider.when('/teams', {
//        redirectTo : '/teams/'
//      })

      $routeProvider.when('/teams', {
        templateUrl : 'partials/teams',
        reloadOnSearch : false,
        controller : 'Teams'
      })

      $routeProvider.when('/sponsorship', {
        templateUrl : 'partials/sponsorship',
        controller : 'Sponsorship'
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