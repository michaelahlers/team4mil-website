/*jshint node:true*/
'use strict'

var express = require('express')
  , Q = require('q')

var services = express()

services.configure(function () {
  /* Empty for now. */
})

module.exports = Q.all([

    require('./analytics0').then(function (analytics0) {
      services.use('/analytics0', analytics0)
    }),

    require('./articles').then(function (articles) {
      services.use('/articles', articles)
    }),

    require('./stripe').then(function (stripe) {
      services.use('/stripe', stripe)
    }),

    require('./trackers0').then(function (trackers0) {
      services.use('/trackers0', trackers0)
    })

  ])

  .then(function () {
    console.info('services', 'available')
    return services
  })

  .fail(function (reason) {
    console.error('services', 'unavailable', reason)
  })
