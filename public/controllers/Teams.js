'use strict'

define([

  'controllers',

  'services/Cache',
  'services/Resource'

], function (controllers) {

  controllers.controller('Teams', function ($rootScope, $scope, $log, Cache, Resource) {
    $scope.content = Cache.get('teams', function () {
      return Resource.get({name : 'teams'})
    })
  })

})