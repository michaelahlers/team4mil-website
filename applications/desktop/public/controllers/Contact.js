'use strict'

define([

  'controllers',
  'jquery'

], function (controllers, $) {

  controllers.controller('Contact', function ($rootScope, $scope, $log, $route, $routeParams, $http, $timeout, content) {
    $scope.content = content

    var selectRecipient = function () {
      $scope.recipient = $.grep($scope.recipients || [], function (recipient) {
        return $routeParams.recipient == recipient.id
      })[0] || $scope.recipients[0]
    }

    var updateRecipients = function (members) {
      $scope.recipients = [
        {
          id : 'anybody',
          name : 'Team 4Mil',
          mail : 'contact@team4mil.org'
        }
      ].concat(members || [])

      selectRecipient()
    }

    updateRecipients()

    $scope.$watch('content.board.members', updateRecipients)

    $scope.$on('$routeUpdate', selectRecipient)
    $scope.$on('$routeChangeSuccess', selectRecipient)

    var reset = $scope.reset = function () {
      $scope.recipient = $scope.recipients[0]
      $scope.sender = {}
      $scope.subject = $routeParams.subject || ''
      $scope.body = $routeParams.body || ''
    }

    reset()

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
