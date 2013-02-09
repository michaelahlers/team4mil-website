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
      name : 'Anybody',
      mail : 'contact@team4il.org'
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