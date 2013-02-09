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

    $scope.$watch('content.board.members', function (members) {
      var recipients = $scope.recipients = [
        {
          id : 'anybody',
          name : 'Team 4Mil',
          mail : 'contact@team4mil.org'
        }
      ].concat(members || [])

      $scope.recipientId = recipients[0].id
    })

    var reset = $scope.reset = function () {
      $scope.recipientId = $scope.$eval('recipients[0].id')
      delete $scope.sender
      delete $scope.subject
      delete $scope.body
    }

    reset()

    $scope.$watch('recipientId', function (id) {
      $scope.recipient = $.grep($scope.recipients || [], function (recipient) {
        return recipient.id == id
      })[0]
    })

    var openStatus = function () {
      $('#modalStatus').modal({
        backdrop : 'static',
        keyboard : false
      })
    }

    var closeStatus = $scope.closeStatus = function () {
      $('#modalStatus').modal('hide')
    }

    $scope.send = function () {

      $scope.status = {
        pending : true,
        recipient : $scope.recipient,
        sender : $scope.sender
      }

      openStatus()

      $http.post('/contact', {
        message : {
          recipient : $scope.recipient,
          sender : $scope.sender,
          subject : $scope.subject,
          body : $scope.body
        }
      })
        .success(function (data, status, headers, config) {

          $scope.status = {
            success : true,
            recipient : data.recipient,
            sender : data.sender
          }

          $scope.reset()
          $timeout(closeStatus, 5000)

        })
        .error(function (data, status, headers, config) {

          $scope.status = {
            error : true
          }

        })

    }
  })

})