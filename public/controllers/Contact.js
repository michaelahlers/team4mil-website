'use strict'

define([

  'controllers',

  'services/Cache',
  'services/Resource'

], function (controllers) {

  controllers.controller('Contact', function ($rootScope, $scope, $log, Cache, Resource) {
    $scope.content = Cache.get('contact', function () {
      return Resource.get({name : 'contact'})
    })
  })

})