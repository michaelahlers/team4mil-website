'use strict'

define([

  'controllers',

  'services/Cache',
  'services/Resource'

], function (controllers) {

  controllers.controller('Mission', function ($rootScope, $scope, $log, Cache, Resource) {
    $scope.content = Cache.get('mission', function () {
      return Resource.get({name : 'mission'})
    })
  })

})