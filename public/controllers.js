'use strict'

define([
  'angular',

  'angular-sanitize',
  'services'
], function (angular) {
  return angular.module('controllers', [ 'ngSanitize', 'services' ])
})
