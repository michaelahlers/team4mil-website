'use strict'

define([
  'services'
  , 'angular-resource'
], function (services) {
  services.factory('Trackers', function ($q, $resource) {
    return $resource('/services/trackers0/:id', {id : '@id'})
  })
})
