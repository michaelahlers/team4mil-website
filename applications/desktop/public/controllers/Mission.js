'use strict'

define([

  'controllers'

], function (controllers) {

  return controllers.controller('Mission', function ($rootScope, $scope, $log, content) {
    $scope.content = content
  })

})