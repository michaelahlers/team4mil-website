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
      template : '<div style="margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; visibility: hidden;" />',

      scope : {
        tracker : '=ngModel'
      },

      link : function (scope, iEl, iAttrs, controller) {
        scope.$watch('tracker', function (tracker) {
          iEl.css({visibility : 'hidden'})
          iEl.html('')

          if (!tracker) {
            return
          }

          var frameEl = $('<iframe class="map" style="margin: 0; padding: 0; width: 100%; height: 100%; border: 0;" frameBorder="0" scrolling="no" hspace="0" vspace="0" marginheight="0" marginwidth="0"></iframe>')
            .appendTo(iEl)
            .load(function () {
              frameEl.contents().find('#map')
                .css({
                  position : 'absolute',
                  float : 1000,
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
            .attr('src', '/services/trackers0/' + tracker.id)

        })
      }
    }
  })
})
