'use strict'

define('google-analytics', ['//google-analytics.com/ga.js'], function () {
  return window._gaq
})

define([
  'angular',
  'jquery',
  'services',
  'google-analytics'
], function (angular, $, services, gaq) {
    services.factory('Analytics', function ($rootScope, $parse, $q, $http, $log, $location) {

        /**
         * @return {promise} Promise providing the Analytics status object.
         */
        var getStatus = function () {
          var deferred = $q.defer()

          $http.get('/services/analytics0')
            .success(function (data) {
              deferred.resolve(data)
            })
            .error(function (data, status) {
              $log.error('Failed to GET status service.', status, data)
              deferred.reject('status.analytics.unavailable')
            }
          )

          return deferred.promise
        }

        var getQueue = function () {
          var deferred = $q.defer()

          getStatus().then(function (status) {
            var tracking = $parse('google.analytics.tracking')(status)

            if (tracking.id && tracking.domainName) {
              gaq.push(['_setAccount', tracking.id ])
              gaq.push(['_setDomainName', tracking.name ])
              gaq.push(['_setAllowLinker', true])
              gaq.push(['_trackPageview', true])

              deferred.resolve(gaq)
            } else {
              deferred.reject('Could not configure Google Analytics API.')
            }
          })

          return deferred.promise
        }

        var queue = getQueue()

        var trackPageView = function () {
          queue.then(function (gaq) {
            $log.log('Tracking page view.')
            gaq.push(['_trackPageview', $location.url()])
          })
        }

        return {
          trackPageView : trackPageView
        }

      }
    )

  }
)