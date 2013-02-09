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

  controllers.controller('ContactMessage', function ($rootScope, $scope, $log, $timeout, $http) {
    var defaultRecipient = $scope.recipient = {
      mail : 'contact@team4il.org'
    }

//var findRecipient = function (mail) {
//  if (!$scope.content || !$scope.content.board) {
//    return undefined
//  }
//
//  return $.grep($scope.content.board.members, function (member) {
//    return member.mail == mail
//  })[0]
//}

    $scope.send = function () {

      var closeStatus = $scope.closeStatus = function () {
        $('#modalStatus').modal('hide')
      }

      $scope.status = {
        pending : true
      }

      $('#modalStatus').modal({
        backdrop : 'static',
        keyboard : false
      })

      $http.post('/contact', {
        message : {
          recipient : $scope.recipient,
          sender : $scope.sender,
          subject : $scope.subject,
          body : $scope.body
        }
      })
        .success(function () {
          $scope.status = {
            success : true
          }

          $scope.recipient = defaultRecipient
          delete $scope.sender
          delete $scope.subject
          delete $scope.body

          $timeout(closeStatus, 5000)
        })
        .error(function () {
          $scope.status = {
            error : true
          }
        })
    }
  })

})