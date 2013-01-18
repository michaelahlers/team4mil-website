define(
  [
    'services',

    /* AngularJS dependencies. */
    'angular-resource'
  ],
  function (services) {

    services.factory('Resource', function ($resource, $log) {

      var service = $resource('/resources/:name', { 'resource' : '@resource' })

      return service

    })

  })