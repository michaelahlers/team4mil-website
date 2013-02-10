'use strict'

define([

  'controllers',

  'services/Cache',
  'services/Resource'

], function (controllers) {
  controllers.controller('Sponsors', function ($rootScope, $scope, $log, Cache, Resource) {
    $scope.content = Cache.get('sponsors', function () {
      return Resource.get({name : 'sponsors'})
    })
  })
})