'use strict'

define(
  [
    'angular',

    'controllers',
    'controllers/Application',
    'controllers/About',

    'directives'
  ],
  function (angular) {

    var module = angular.module('app', [ 'controllers'/*, 'directives'*/])

    module.config(function ($routeProvider, $locationProvider) {

      $routeProvider.when('/about', {
        templateUrl : 'partials/about',
        controller : 'About'
      })

      $routeProvider.when('/sponsors', {
        templateUrl : 'partials/sponsors',
        controller : 'Sponsors'
      })

      $routeProvider.otherwise({
        redirectTo : '/about'
      })

    })

    module.run(function ($rootScope, $log) {
    })

    return module

  })