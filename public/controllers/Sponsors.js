'use strict'

define([

  'controllers',

  'services/Resource',

  'directives/masonry'

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

//    $scope.$watch('sponsors', function (outgoing, incoming) {
//      $(function () {
//
//        var $container = $('#logos');
//
//        $container.imagesLoaded(function () {
//          alert('')
//          $container.masonry({
//            itemSelector : 'img'
//          })
//        })
//
//      })
//    })
  })
})