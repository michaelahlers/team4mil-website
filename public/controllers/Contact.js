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
    var getRecipients = $scope.getRecipients = function () {
      return [
        {
          name : 'Anybody',
          mail : 'contact@team4mil.org'
        }
      ].concat($scope.$eval('content.board.members') || [])
    }

    $scope.reset = function () {
      $scope.recipient = getRecipients()[0]
      delete $scope.sender
      delete $scope.subject
      delete $scope.body
    }

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

          $timeout(closeStatus, 5000)
          $timeout($scope.reset, 5000)
        })
        .error(function () {
          $scope.status = {
            error : true
          }
        })
    }

    $scope.reset()
  })

})