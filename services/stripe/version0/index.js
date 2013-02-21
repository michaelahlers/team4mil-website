/*jshint node:true*/
'use strict'

var express = require('express')
  , path = require('path')
  , Q = require('q')

var status = require('./status')
  , charges = require('./charges')

var service = express()

service.configure(function () {
  /* Empty for now. */
})

service.get('/', status)
service.post('/charges', charges.create)

module.exports = Q.fcall(function () {
  console.info('services-stripe-version0', 'available')
  return service
})