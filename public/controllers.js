'use strict'

define(
  [
    'angular-sanitize'
  ],
  function () {
    var module = angular.module('controllers', [ 'ngSanitize', 'services' ])

    return module
  })
