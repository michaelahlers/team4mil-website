'use strict'

define([

  'controllers',

  'services/Resource'

], function (controllers) {
  controllers.controller('Sponsors', function ($rootScope, $scope, $log, Resource) {
    $scope.sponsors = Resource.get({name : 'sponsors'})

    $scope.getSponsorGroups = function () {
      var sponsors = []

      $.each($scope.sponsors.data || [], function (index, value) {
        index = Math.floor(index / 4)
        sponsors[index] = sponsors[index] || []
        sponsors[index].push(value)
      })

      $log.log(sponsors)

      return sponsors
    }
  })
})