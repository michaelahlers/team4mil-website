(function (window, module) {
  /* See https://github.com/jrburke/r.js/blob/master/build/example.build.js for complete documentation on these options. */

  /* In browsers, export to build then use a local script afterwards to assign window.build to var require. This
   * silly workaround is meant to cope with inexplicable Internet Explorer bugs, and is documented in the RequireJS
   * manual at http://requirejs.org/docs/api.html#config under Configuration Options. */

  /* See http://requirejs.org/docs/api.html#config-shim for clarification shimming jQuery plugins and other libraries
   * that augment an existing namespace. */

  return window.build = module.exports = {
    baseUrl : '.',
    name : 'index',
    out : 'index.production.js',

    paths : {
      'angular' : 'lib/angular-1.1.2/angular',
      'angular-bootstrap' : 'lib/angular-1.1.2/angular-bootstrap',
      'angular-bootstrap-prettify' : 'lib/angular-1.1.2/angular-bootstrap-prettify',
      'angular-loader' : 'lib/angular-1.1.2/angular-loader',
      'angular-resource' : 'lib/angular-1.1.2/angular-resource',
      'angular-sanitize' : 'lib/angular-1.1.2/angular-sanitize',
      'angular-ui-bootstrap' : 'lib/ui-bootstrap-tpls-0.1.0',

      'bootstrap-button' : 'lib/bootstrap-2.3.1/js/bootstrap-button',
      'bootstrap-collapse' : 'lib/bootstrap-2.3.1/js/bootstrap-collapse',
      'bootstrap-dropdown' : 'lib/bootstrap-2.3.1/js/bootstrap-dropdown',
      'bootstrap-modal' : 'lib/bootstrap-2.3.1/js/bootstrap-modal',
      'bootstrap-tooltip' : 'lib/bootstrap-2.3.1/js/bootstrap-tooltip',
      'bootstrap-transition' : 'lib/bootstrap-2.3.1/js/bootstrap-transition',
      'bootstrap-typeahead' : 'lib/bootstrap-2.3.1/js/bootstrap-typeahead',

      'jquery' : 'lib/jquery-1.8.3',
      'jquery-gridster' : 'lib/gridster.js-master/dist/jquery.gridster.js',
      'jquery-imagesLoaded' : 'lib/jquery.imagesloaded',
      'jquery-smooth-scroll' : 'lib/jquery-smooth-scroll-1.4.9/jquery.smooth-scroll',

      'async' : 'lib/requirejs-plugins-master/src/async',
      'depend' : 'lib/requirejs-plugins-master/src/depend',
      'json' : 'lib/requirejs-plugins-master/src/json',
      'noext' : 'lib/requirejs-plugins-master/src/noext',
      'text' : 'lib/text-2.0.5'
    },

    shim : {

      'angular' : {
        exports : 'angular'
      },

      'angular-bootstrap' : {
        deps : [
          'angular'
          , 'bootstrap-button'
          , 'bootstrap-collapse'
          , 'bootstrap-dropdown'
          , 'bootstrap-modal'
          , 'bootstrap-tooltip'
          , 'bootstrap-transition'
          , 'bootstrap-typeahead'
        ]
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

      'angular-ui-bootstrap' : {
        deps : [
          'angular'
          , 'bootstrap-button'
          , 'bootstrap-collapse'
          , 'bootstrap-dropdown'
          , 'bootstrap-modal'
          , 'bootstrap-tooltip'
          , 'bootstrap-transition'
          , 'bootstrap-typeahead'
          , 'jquery']
      },

      'bootstrap-button' : {
        deps : ['jquery']
      },

      'bootstrap-collapse' : {
        deps : ['jquery']
      },

      'bootstrap-dropdown' : {
        deps : ['jquery']
      },

      'bootstrap-modal' : {
        deps : ['jquery', 'bootstrap-transition']
      },

      'bootstrap-tooltip' : {
        deps : ['jquery']
      },

      'bootstrap-transition' : {
        deps : ['jquery']
      },

      'bootstrap-typeahead' : {
        deps : ['jquery']
      },

      'jquery' : {
        /* jQuery does not depend on Angular JS, but it must be loaded
         * afterwards to avoid subtle bugs. */
        deps : ['angular'],
        exports : '$'
      },

      'jquery-gridster' : {
        deps : ['jquery'],
        exports : 'jQuery.fn.gridster'
      },

      'jquery-imagesLoaded' : {
        deps : ['jquery'],
        exports : 'jQuery.fn.imagesLoaded'
      },

      'jquery-smooth-scroll' : {
        deps : ['jquery'],
        exports : 'jQuery.fn.smoothScroll'
      }
    },

    optimize : 'uglify2',
    uglify2 : {
      warnings : true,
      /* Mangling defeats Angular injection by function argument names. */
      mangle : false
    }
  }
})('undefined' === typeof window ? {} : window, 'undefined' === typeof module ? {} : module)