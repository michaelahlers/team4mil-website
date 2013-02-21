/*jshint node:true*/
'use strict'

var express = require('express')
  , Q = require('q')

var articles = express()

articles.configure(function () {
  /* Empty for now. */
})


var getVersion0 = require('./version0')
  , getLatest = getVersion0

module.exports = Q.all([

  getVersion0.then(function (version0) {
    articles.use('/0', version0)
  }),

  getLatest.then(function (latest) {
    articles.use('/', latest)
  })

])