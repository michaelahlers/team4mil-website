'use strict'

define([

  'controllers'

], function (controllers) {
  controllers.controller('Sponsorship', function ($rootScope, $scope, $routeParams, $log, $location, content) {
    $scope.content = content

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

    $scope.toContact = function (recipient, subject, body) {
      $rootScope.contact = {
        subject : subject,
        body : body
      }

      $location.path('/contact')
      $location.search('recipient', recipient)
    }
  })
})