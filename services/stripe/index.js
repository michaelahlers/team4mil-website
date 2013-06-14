/*jshint node:true*/
'use strict'

var express = require('express')
  , Q = require('q')

var stripe = express()

stripe.configure(function () {
  /* Empty for now. */
})

module.exports = Q.all([

  require('./version0').then(function (version0) {
    stripe.use('/0', version0)
  }),

  require('./version0').then(function (latest) {
    stripe.use('/', latest)
  })

]).then(

  function () {
    console.info('services-stripe', 'available')
    return stripe
  },

  function (reason) {
    console.error('services-stripe', 'unavailable', reason)
  }

)