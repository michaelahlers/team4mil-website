/*jshint node:true*/
'use strict'

var express = require('express')
  , path = require('path')
  , Q = require('q')

var mission = require('./mission')
  , teams = require('./teams')
  , sponsorship = require('./sponsorship')
  , contact = require('./contact')

var service = express()

service.configure(function () {
  /* Empty for now. */
})

service.get('/mission', mission.get)
service.get('/teams', teams.get)
service.get('/sponsorship', sponsorship.get)
service.get('/contact', contact.get)

module.exports = Q.fcall(function () {
  console.info('services-articles-version0', 'available')
  return service
})