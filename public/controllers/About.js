'use strict'

define([

  'controllers',

  'services/Cache',
  'services/Resource'

], function (controllers) {

  controllers.controller('About', function ($rootScope, $scope, $log, Cache, Resource) {
    $scope.content = Cache.get('about', function () {
      return Resource.get({name : 'about'})
    })
  })

})