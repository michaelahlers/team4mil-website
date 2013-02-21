/*jshint node:true*/
'use strict'

var express = require('express')
  , Q = require('q')

var clients = express()

clients.configure(function () {
  /* Empty for now. */
})

module.exports = Q.all([

  require('./desktop').then(function (desktop) {
    clients.use('/desktop', desktop)
  }),

  require('./mobile').then(function (articles) {
    clients.use('/mobile', articles)
  })

]).then(

  function () {
    console.info('clients', 'available')
    return clients
  },

  function (reason) {
    console.error('clients', 'unavailable', reason)
  }

)