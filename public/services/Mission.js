'use strict'

define([
  'services', 'async', 'angular-resource', 'services/Cache'
], function (services, async) {

  services.factory('Resource', function ($q, $resource, $http, $timeout, $log, Cache) {

    return {
      get : function () {

        /* Return either the cached promise. */
        return Cache.get(name, function () {
            var deferred = $q.defer()

            async.parallel([
              function (callback) {
                $resource('/resources/mission').get({}, function (result) {
                  callback(result)
                })
              },

              function(callback) {

              }
            ], function (results) {


            })


            $resource('/resources/mission').get({name : name}, function (result) {
              $timeout(function () {
                deferred.resolve(result)
              }, 2000)
            })

            /* Provides the promise to the cache. */
            return deferred.promise
          }
        )

      }
    }
  })

})