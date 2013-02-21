'use strict'

define([
  'angular',
  'filters'
], function (angular, filters) {

  filters.filter('sequence', function () {
    return function (input, start, end) {
      start = parseInt(start)
      end = parseInt(end)
      for (var i = start; i <= end; i++) {
        input.push(i)
      }
      return input
    }
  })
})