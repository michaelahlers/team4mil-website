'use strict'

define([
  'angular'
  , 'directives'
  , 'jquery'
], function (angular, directives, $) {

  directives.directive('t4mTrackerMap', function ($rootScope, $window, $timeout) {
    return {
      restrict : 'E',
      replace : true,
      template : '<div style="margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden;" />',

      scope : {
        tracker : '=ngModel'
      },

      link : function (scope, iEl, iAttrs, controller) {
        scope.$watch('tracker', function (tracker) {
          //iEl.css({visibility : 'hidden'})

          iEl.html('')

          if (!tracker) {
            return
          }

          $rootScope.$broadcast('t4m-loadingStart')

          var frameEl = $('<iframe class="map" frameBorder="0" scrolling="no" onload="t4m_tracker_map_onload_fn()"></iframe>')

          frameEl
            .css({
              margin : 0,
              padding : 0,
              width : '99%',
              height : '99%',
              border : 0,
              visibility : 'hidden'
            })
            .appendTo(iEl)

          $window['t4m_tracker_map_onload_fn'] = function () {
            //.load(function () {

            var spotEl = frameEl.contents()
              , spotHeadEl = spotEl.find('head')
              , spotBodyEl = spotEl.find('body')
              , spotMapEl = spotEl.find('#map')
              , googleMapEl = spotMapEl.children()

            //spotHeadEl.append('<style type="text/css">.ext-el-mask, .x-mask-loading { display: none ! important; }</style>')
            spotBodyEl.children().css({display : 'none'})
            spotMapEl.appendTo(spotBodyEl).css({display : 'block', visibility : 'visible'})

            /* This callback is triggered from outside the Angular digest cycle. */
            scope.$apply(function () {
              $timeout(function () {

                spotMapEl
                  .css({
                    display : 'block',
                    position : 'absolute',
                    float : 1000,
                    left : 0,
                    top : 0,
                    width : '100%',
                    height : '100%',
                    border : 'none',
                    background : 'gray'
                    //,visibility : 'hidden'
                  })

                // googleMapEl.css({width : '100%'})
                // spotMapEl.css({visibility : 'visible'})
                frameEl.css({
                  width : '100%',
                  height : '100%',
                  visibility : 'visible'
                })
                // iEl.css({visibility : 'visible'})

                $rootScope.$broadcast('t4m-loadingSuccess')

              }, 500)
            })
          }
          //})

          frameEl.attr('src', '/services/trackers0/' + tracker.id)

        })
      }
    }
  })
})
