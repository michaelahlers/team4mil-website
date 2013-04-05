require([

  'jquery',
  'angular',

  /* The application itself. */
  'applications'

], function ($, angular) {

  $(function () {
    /* The requirements on this script ensure the application module has been
     * defined prior to bootstrapping AngularJS. If this is done in the wrong
     * order, there will be visible flicker as ngCloak is removed and the main
     * application scope is digested. */
    angular.bootstrap(document, ['app'])
  })

})