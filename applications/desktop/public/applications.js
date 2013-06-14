'use strict'

define(
  [
    'angular',

    'services/Analytics',
    'services/Articles',

    'controllers',

    'controllers/Loading',
    'controllers/Header',
    'controllers/Footer',

    'controllers/Mission',
    'controllers/Contact',
    'controllers/Sponsorship',
    'controllers/Teams',
    'controllers/Trackers',
    'controllers/Donate',

    'directives',

    'filters',

    'angular-bootstrap',
    'angular-ui-bootstrap'
  ],
  function (angular, gaq) {

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
        redirectTo : '/teams/',
        /* TODO: Remove this temporary hack for issue #14. */
        resolve : {
          content : function (Articles) {
            return Articles.get('teams')
          }
        }
      })

      $routeProvider.when('/trackers/:id', {
        templateUrl : 'partials/trackers',
        controller : 'Trackers',
        reloadOnSearch : false
      })

      $routeProvider.when('/trackers', {
        redirectTo : '/trackers/'
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
        reloadOnSearch : false,
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

    module.run(function ($rootScope, $log, Analytics) {
      $rootScope.$on('$viewContentLoaded', Analytics.trackPageView)
      $rootScope.$on('$routeUpdate', Analytics.trackPageView)

      $rootScope.$on('$routeChangeStart', function (event, current, previous) {
        delete $rootScope.active
      })

      $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        var controller = current && current.$$route && current.$$route.controller || ''
          , article = controller.toLowerCase()
          , styleClass = 't4m-article-' + article

        $rootScope.active = {
          controller : controller,
          article : article,
          styleClass : styleClass
        }
      })
    })

    return module

  })
