'use strict'

define([
  'angular'
  , 'directives'
  , 'jquery'
], function (angular, directives, $) {

  directives.directive('t4mTrackerMap', function ($timeout, $log) {
    return {
      restrict : 'E',
      replace : true,
      template : '<div style="margin: 0; padding: 0; width: 100%; height: 100%;" />',

      link : function (scope, iEl, iAttrs, controller) {
        iEl.css({visibility : 'hidden'})

        var frameEl = $('<iframe class="map" style="margin: 0; padding: 0; width: 100%; height: 100%;" frameborder="0"></iframe>')
          .appendTo(iEl)
          .load(function () {
            frameEl.contents().find('#map').parent()
              .css({
                position : 'absolute',
                float : 10000,
                left : 0,
                top : 0,
                width : '100%',
                height : '100%',
                border : 'none',
                background : 'gray'
              })
              .appendTo(frameEl.contents().find('body'))

            iEl.css({visibility : 'visible'})
          })
          .attr('src', '/services/trackers0/2013-allied-forces-team')
      }
    }
  })
})
