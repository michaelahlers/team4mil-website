/*jshint node:true*/
'use strict'

var express = require('express')
  , Q = require('q')

var articles = express()

articles.configure(function () {
  /* Empty for now. */
})

module.exports = Q.all([

  require('./version0').then(function (version0) {
    articles.use('/0', version0)
  }),

  require('./version0').then(function (latest) {
    articles.use('/', latest)
  })

]).then(

  function () {
    console.info('services-articles', 'available')
    return articles
  },

  function (reason) {
    console.error('services-articles', 'unavailable', reason)
  }

)