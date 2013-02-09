'use strict'

define([

  'controllers',
  'jquery',

  'services/Cache',
  'services/Resource'

], function (controllers, $) {

  controllers.controller('Contact', function ($rootScope, $scope, $log, Cache, Resource) {
    $scope.content = Cache.get('contact', function () {
      return Resource.get({name : 'contact'})
    })
  })

  controllers.controller('ContactMessage', function ($rootScope, $scope, $log, $http) {
    $scope.recipient = {
      mail : 'contact@team4il.org'
    }

    var findRecipient = function (mail) {
      if (!$scope.content || !$scope.content.board) {
        return undefined
      }

      return $.grep($scope.content.board.members, function (member) {
        return member.mail == mail
      })[0]
    }

    $scope.send = function () {

      $scope.status = {
        message : 'Sending your message to ' + $scope.recipient.mail + '.'
      }

//      if (current.id) {
      $('#modalStatus').modal({
        backdrop : 'static',
        keyboard : false
      })
//      } else {
//        $('#modalBiography').modal('hide')
//        $location.search({})
//      }

      $http.post('/contact', {
        message : {
          recipient : $scope.recipient,
          sender : $scope.sender,
          subject : $scope.subject,
          body : $scope.body
        }
      })
        .success(function () {

        })
        .error(function () {

        })
    }
  })

})