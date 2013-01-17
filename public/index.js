require({

  paths : {
    'angular' : 'lib/angular-1.1.1/angular',
    'angular-bootstrap' : 'lib/angular-1.1.1/angular-bootstrap',
    'angular-bootstrap-prettify' : 'lib/angular-1.1.1/angular-bootstrap-prettify',
    'angular-loader' : 'lib/angular-1.1.1/angular-loader',
    'angular-resource' : 'lib/angular-1.1.1/angular-resource',
    'angular-sanitize' : 'lib/angular-1.1.1/angular-sanitize',
    'bootstrap' : 'lib/bootstrap-2.2.2/js/bootstrap',
    'domReady' : 'lib/domReady-2.0.1',
    'jquery' : 'lib/jquery-1.8.3',
    'text' : 'lib/text-2.0.3.js'
  },

  shim : {

    'angular' : {
      exports : 'angular'
    },

    'angular-bootstrap' : {
      deps : ['angular', 'bootstrap']
    },

    'angular-bootstrap-prettify' : {
      deps : ['angular', 'angular-bootstrap']
    },

    'angular-loader' : {
      deps : ['angular']
    },

    'angular-resource' : {
      deps : ['angular']
    },

    'angular-sanitize' : {
      deps : ['angular']
    },

    'bootstrap' : {
      deps : ['jquery']
    },

    'jquery' : {
      /* jQuery does not depend on Angular JS, but it must be loaded
       * afterwards to avoid subtle bugs. */
      deps : ['angular'],
      exports : '$'
    }//,

    //'jquery-ui' : {
    //  deps : ['jquery']
    //}

  },

  urlArgs : 'v1'

}, [

  'domReady!',
  'angular',

  /* Load Twitter Bootstrap. */
  'bootstrap',

  /* The application itself. */
  'applications'

], function (document, angular) {

  /* The requirements on this script ensure the application module has been
   * defined prior to bootstrapping AngularJS. If this is done in the wrong
   * order, there will be visible flicker as ngCloak is removed and the main
   * application scope is digested. */
  angular.bootstrap(document, ['app'])

})