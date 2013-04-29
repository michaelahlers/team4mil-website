'use strict'

define([
  'services', 'angular-resource'
], function (services) {
  services.factory('Articles', function ($q, $resource, $timeout, $log) {

    var cache = {}

    var retrieve = function (name) {
      var deferred = $q.defer()

      $resource('/services/articles/0/:name').get({name : name}, function (result) {
        /* Helpful for testing. */
        //$timeout(function () {
        deferred.resolve(result)
        //}, 2000)
      })

      return deferred.promise
    }

    return {
      /**
       * Retrieves the named resource.
       * @param name Identifies which content block to load.
       * @return {*} An existing loaded resource, or a promise.
       */
      get : function (name) {
        return cache[name] || (cache[name] = retrieve(name))
      },

      invalidate : function (name) {
        delete cache[name]
      }
    }

  })
})