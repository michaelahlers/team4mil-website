'use strict'

define([

  'controllers',

  'services/Cache',
  'services/Resource'

], function (controllers) {
  controllers.controller('Sponsorship', function ($rootScope, $scope, $routeParams, $log, Cache, Resource) {

    $scope.$on('$routeChangeSuccess', function (event, current, previous) {
      $scope.active = 'Sponsorship' == (current && current.$route && current.$route.controller)
    })

    $scope.content = Cache.get('sponsorship', function () {
      return Resource.get({name : 'sponsorship'})
    })

    var getView = function () {
      if ($routeParams.contributors) {
        return 'contributors'
      }

      if ($routeParams.opportunities) {
        return 'opportunities'
      }

      return 'contributors'
    }

    $scope.$on('$routeUpdate', function () {
      $scope.view = getView()
    })

    $scope.$on('$routeChangeSuccess', function (event, current, previous) {
      $scope.view = getView()
    })
  })
})