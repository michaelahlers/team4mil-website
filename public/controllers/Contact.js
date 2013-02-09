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

  controllers.controller('ContactMessage', function ($rootScope, $scope, $log, $http) {
    $scope.recipient = {
      mail : 'contact@team4il.org'
    }

    $scope.send = function () {
      $http.post('/contact', {
        message : {
          recipient : $scope.recipient,
          sender : $scope.sender,
          subject : $scope.subject,
          body : $scope.body
        }
      })
    }
  })

})