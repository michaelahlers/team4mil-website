define(
  [
    'services',

    /* AngularJS dependencies. */
    'angular-resource'
  ],
  function (services) {

    services.factory('Cache', function ($resource, $log) {

        var cache = {}

        return {
          get : function (key, factory) {
            return cache[key] || (cache[key] = factory())
          }
        }

      }
    )

  })