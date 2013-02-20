'use strict'

define([
  'services', 'angular-resource'
], function (services) {
  services.factory('Articles', function ($q, $resource, $timeout, $log) {

    var cache = {}

    return {
      /**
       * Retrieves the named resource.
       * @param name Identifies which content block to load.
       * @return {*} An existing loaded resource, or a promise.
       */
      get : function (name) {

        var deferred = cache[name] = (cache[name] || $q.defer())

        $resource('/articles/0/:name').get({name : name}, function (result) {
          /* Helpful for testing. */
          //$timeout(function () {
            deferred.resolve(result)
          //}, 2000)
        })

        /* Provides the promise. */
        return deferred.promise

      }
    }

  })
})