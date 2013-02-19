'use strict'

define([
  'services', 'angular-resource', 'services/Cache'
], function (services) {
  services.factory('Articles', function ($q, $resource, $timeout, $log, Cache) {
    var resource = $resource('/resources/:name')

    return {
      /**
       * Retrieves the named resource.
       * @param name Identifies which content block to load.
       * @return {*} An existing loaded resource, or a promise.
       */
      get : function (name) {

        /* Return either the cached promise. */
        return Cache.get(name, function () {
          var deferred = $q.defer()

          $resource('/articles/:name?version=0').get({name : name}, function (result) {
            deferred.resolve(result)
          })

          /* Provides the promise to the cache. */
          return deferred.promise
        })

      }
    }

  })
})