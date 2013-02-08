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

  controllers.controller('ContactMessage', function ($rootScope, $scope, $log) {
    $scope.recipient = {
      mail : 'contact@team4il.org'
    }


  })

})