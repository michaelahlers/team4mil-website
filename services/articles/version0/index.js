/*jshint node:true*/
'use strict'

var express = require('express')
  , Facebook = require('facebook-node-sdk')
  , path = require('path')
  , Q = require('q')

var mission = require('./mission')
  , teams = require('./teams')
  , sponsorship = require('./sponsorship')
  , contact = require('./contact')

var service = express()

service.configure(function () {
  /* Empty for now. */

  service.use(Facebook.middleware({
    appId : '273576052771797',
    secret : '666835a394317bd1bc070afcf00c6702'
  }))

})

service.get('/mission', mission.get)
service.get('/teams', teams.get)
service.get('/sponsorship', sponsorship.get)
service.get('/contact', contact.get)

module.exports = Q.fcall(function () {
  console.info('services-articles-version0', 'available')
  return service
})