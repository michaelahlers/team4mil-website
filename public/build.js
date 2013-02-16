(function (window, module) {
  /* See https://github.com/jrburke/r.js/blob/master/build/example.build.js for complete documentation on these options. */

  return window.require = module.exports = {
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
      'domReady' : 'lib/domReady-2.0.1',
      'jquery' : 'lib/jquery-1.8.3',
      'jquery-gridster' : 'lib/gridster.js-master/dist/jquery.gridster.js',
      'jquery-imagesLoaded' : 'lib/jquery.imagesloaded',
      'jquery-masonry' : 'lib/masonry-master/jquery.masonry',
      'modernizr' : 'lib/modernizr-2.6.1',
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
        deps : ['jquery']
      },

      'jquery-imagesLoaded' : {
        deps : ['jquery']
      },

      'jquery-masonry' : {
        deps : ['jquery', 'jquery-imagesLoaded']
      }//,

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