'use strict'

define([
  'angular'
  , 'directives'
  , 'jquery'
], function (angular, directives, $) {

  directives.directive('t4mTrackerMap', function ($rootScope) {
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

          $rootScope.$broadcast('t4m-loadingStart')

          var frameEl = $('<iframe class="map" style="margin: 0; padding: 0; width: 100%; height: 100%; border: 0;" frameBorder="0" scrolling="no" hspace="0" vspace="0" marginheight="0" marginwidth="0"></iframe>')
            .appendTo(iEl)
            .load(function () {

              var spotEl = frameEl.contents()
                , spotHeadEl = spotEl.find('head')
                , spotBodyEl = spotEl.find('body')
                , spotMapEl = spotEl.find('#map')
                , googleMapEl = spotMapEl.children()

              spotHeadEl.append('<style type="text/css">.ext-el-mask, .x-mask-loading { display: none ! important; }</style>')

              googleMapEl
                .css({
                  position : 'absolute',
                  float : 1000,
                  left : 0,
                  top : 0,
                  width : '100%',
                  height : '100%',
                  border : 'none',
                  background : 'gray',
                  visibility : 'hidden'
                })
                .appendTo(spotBodyEl)

//              googleMapEl
//                .css({
//                  visibility : 'hidden'
//                })

              spotMapEl.css({visibility : 'visible'})
              googleMapEl.css({visibility : 'visible'})
              iEl.css({visibility : 'visible'})

              scope.$apply(function () {
                $rootScope.$broadcast('t4m-loadingSuccess')
              })
            })
            .attr('src', '/services/trackers0/' + tracker.id)

        })
      }
    }
  })
})
