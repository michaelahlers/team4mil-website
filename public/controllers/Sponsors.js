'use strict'

define([

  'controllers',

  'services/Resource',

  'directives/masonry'

], function (controllers) {
  controllers.controller('Sponsors', function ($rootScope, $scope, $log, Resource) {
    $scope.sponsors = Resource.get({name : 'sponsors'})
  })
})