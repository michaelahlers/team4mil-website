'use strict'

define(
  [
    'angular',

    'controllers',
    'controllers/Application',

    'controllers/About',
    'controllers/Contact',
    'controllers/Sponsors',

    'directives'
  ],
  function (angular) {

    var module = angular.module('app', [ 'controllers', 'directives'])

    module.config(function ($routeProvider, $locationProvider) {

      $routeProvider.when('/about', {
        templateUrl : 'partials/about',
        controller : 'About'
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
        redirectTo : '/about'
      })

    })

    module.run(function ($rootScope, $log) {
    })

    return module

  })