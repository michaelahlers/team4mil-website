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
        settings : {
          article : 'mission',
          title : 'Mission',
          body : {
            style : 't4m-mission'
          }
        },
        resolve : {
          content : function (Articles) {
            return Articles.get('mission')
          }
        }
      })

      $routeProvider.when('/teams/:id', {
        templateUrl : 'partials/teams',
        controller : 'Teams',
        settings : {
          article : 'teams',
          title : 'Teams',
          body : {
            style : 't4m-teams'
          }
        },
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

      $routeProvider.when('/trackers', {
        templateUrl : 'partials/trackers',
        controller : 'Trackers',
        settings : {
          article : 'trackers',
          title : 'Trackers',
          body : {
            style : 't4m-trackers'
          },
          header : {
            inverse : false
          }
        },
        reloadOnSearch : false
      })

      $routeProvider.when('/sponsorship', {
        templateUrl : 'partials/sponsorship',
        controller : 'Sponsorship',
        settings : {
          article : 'sponsorship',
          title : 'Sponsorship',
          body : {
            style : 't4m-sponsorship'
          }
        },
        reloadOnSearch : false,
        resolve : {
          content : function (Articles) {
            return Articles.get('sponsorship')
          }
        }
      })

      $routeProvider.when('/donate', {
        templateUrl : 'partials/donate',
        controller : 'Donate',
        settings : {
          article : 'donate',
          title : 'Donate',
          body : {
            style : 't4m-donate'
          }
        }
      })

      $routeProvider.when('/contact', {
        templateUrl : 'partials/contact',
        controller : 'Contact',
        settings : {
          article : 'contact',
          title : 'Contact',
          body : {
            style : 't4m-contact'
          }
        },
        reloadOnSearch : false,
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
        delete $rootScope.settings
      })

      $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.settings = ((current || {}).$$route || {}).settings
      })
    })

    return module

  })
