/*jshint node:true*/
'use strict'

var express = require('express')
  , Q = require('q')

var services = express()

services.configure(function () {
  /* Empty for now. */
})

module.exports = Q.all([

  require('./articles').then(function (articles) {
    services.use('/articles', articles)
  }),

  require('./stripe').then(function (stripe) {
    services.use('/stripe', stripe)
  })

]).then(

  function () {
    console.info('services', 'available')
    return services
  },

  function (reason) {
    console.error('services', 'unavailable', reason)
  }

)