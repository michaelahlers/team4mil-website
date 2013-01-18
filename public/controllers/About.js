'use strict'

define(['controllers', 'services/Resource'], function (controllers) {
  controllers.controller('About', function ($rootScope, $scope, Resource) {
    $scope.content = Resource.get({name : 'about'})
  })
})