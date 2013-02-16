'use strict'

define(
  [
    'angular',

    'services/Resource',

    'controllers',

    'controllers/Navigation',
    'controllers/Mission',
    'controllers/Contact',
    'controllers/Sponsorship',
    'controllers/Teams',
    'controllers/Donate',

    'directives',

    'angular-bootstrap',
    'angular-ui-bootstrap'
  ],
  function (angular) {

    var module = angular.module('app', [ 'services', 'controllers', 'directives', 'bootstrap', 'ui.bootstrap' ])

    module.config(function ($routeProvider, $locationProvider) {

      $routeProvider.when('/mission', {
        templateUrl : 'partials/mission',
        controller : 'Mission',
        resolve : {
          content : function (Resource) {
            return Resource.get('mission')
          }
        }
      })

      $routeProvider.when('/teams/:id', {
        templateUrl : 'partials/teams',
        controller : 'Teams',
        reloadOnSearch : false,
        resolve : {
          content : function (Resource) {
            return Resource.get('teams')
          }
        }
      })

      $routeProvider.when('/teams', {
        redirectTo : '/teams/'
      })

      $routeProvider.when('/sponsorship', {
        templateUrl : 'partials/sponsorship',
        controller : 'Sponsorship',
        reloadOnSearch : false,
        resolve : {
          content : function (Resource) {
            return Resource.get('sponsorship')
          }
        }
      })

      $routeProvider.when('/donate', {
        templateUrl : 'partials/donate',
        controller : 'Donate'
      })

      $routeProvider.when('/contact', {
        templateUrl : 'partials/contact',
        controller : 'Contact',
        resolve : {
          content : function (Resource) {
            return Resource.get('contact')
          }
        }
      })

      $routeProvider.otherwise({
        redirectTo : '/mission'
      })

    })

    module.run(function ($rootScope, $log) {
    })

    return module

  })