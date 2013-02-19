'use strict'

define(
  [
    'angular',

    'services/Articles',

    'controllers',

    'controllers/Navigation',
    'controllers/Mission',
    'controllers/Contact',
    'controllers/Sponsorship',
    'controllers/Teams',
    'controllers/Donate',

    'directives',

    'filters',

    'angular-bootstrap',
    'angular-ui-bootstrap'
  ],
  function (angular) {

    var module = angular.module('app', [ 'services', 'controllers', 'directives', 'filters', 'bootstrap', 'ui.bootstrap' ])

    module.config(function ($routeProvider, $locationProvider) {

      $routeProvider.when('/mission', {
        templateUrl : 'partials/mission',
        controller : 'Mission',
        resolve : {
          content : function (Articles) {
            return Articles.get('mission')
          }
        }
      })

      $routeProvider.when('/teams/:id', {
        templateUrl : 'partials/teams',
        controller : 'Teams',
        reloadOnSearch : false,
        resolve : {
          content : function (Articles) {
            return Articles.get('teams')
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
          content : function (Articles) {
            return Articles.get('sponsorship')
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
          content : function (Articles) {
            return Articles.get('contact')
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