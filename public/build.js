(function (window, module) {
  /* See https://github.com/jrburke/r.js/blob/master/build/example.build.js for complete documentation on these options. */

  /* In browsers, export to build then use a local script afterwards to assign window.build to var require. This
   * silly workaround is meant to cope with inexplicable Internet Explorer bugs, and is documented in the RequireJS
   * manual at http://requirejs.org/docs/api.html#config under Configuration Options. */

  /* See http://requirejs.org/docs/api.html#config-shim for clarification shimming jQuery plugins and other libraries
   * that augment an existing namespace. */

  return window.build = module.exports = {
    baseUrl : '/',
    name : './index',
    out : './index.production.js',

    paths : {
      'angular' : 'lib/angular-1.1.2/angular',
      'angular-bootstrap' : 'lib/angular-1.1.2/angular-bootstrap',
      'angular-bootstrap-prettify' : 'lib/angular-1.1.2/angular-bootstrap-prettify',
      'angular-loader' : 'lib/angular-1.1.2/angular-loader',
      'angular-resource' : 'lib/angular-1.1.2/angular-resource',
      'angular-sanitize' : 'lib/angular-1.1.2/angular-sanitize',
      'async' : 'lib/async',
      'bootstrap' : 'lib/bootstrap-2.2.2/js/bootstrap',
      'jquery' : 'lib/jquery-1.8.3',
      'jquery-gridster' : 'lib/gridster.js-master/dist/jquery.gridster.js',
      'jquery-imagesLoaded' : 'lib/jquery.imagesloaded',
      'jquery-scrollTo' : 'lib/balupton-jquery-scrollto-c90f9b7/scripts/jquery.scrollto',
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
      },

      'jquery-gridster' : {
        deps : ['jquery'],
        exports : 'jQuery.fn.gridster'
      },

      'jquery-imagesLoaded' : {
        deps : ['jquery'],
        exports : 'jQuery.fn.imagesLoaded'
      },

      'jquery-scrollTo' : {
        deps : ['jquery'],
        exports : 'jQuery.fn.ScrollTo'
      }
      //,
      //
      //'jquery-ui' : {
      //  deps : ['jquery']
      //}

    },

    optimize : 'uglify2',
    uglify2 : {
      warnings : true,
      /* Mangling defeats Angular injection by function argument names. */
      mangle : false
    }
  }
})('undefined' === typeof window ? {} : window, 'undefined' === typeof module ? {} : module)