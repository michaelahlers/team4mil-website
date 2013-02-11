'use strict'

define([

  'controllers',

  'services/Cache',
  'services/Resource'

], function (controllers) {
  controllers.controller('Sponsorship', function ($rootScope, $scope, $log, Cache, Resource) {
    $scope.content = Cache.get('sponsorship', function () {
      return Resource.get({name : 'sponsorship'})
    })
  })
})