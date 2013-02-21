#!/usr/bin/env node

/*jshint node:true*/
'use strict'

var express = require('express')
  , Facebook = require('facebook-node-sdk')
  , http = require('http')
  , Q = require('q')

var server = express()

server.configure(function () {
  server.set('port', process.env.PORT || 3000)

  server.use(express.logger('dev'))

  server.use(express.bodyParser())
  server.use(express.methodOverride())

  server.use(Facebook.middleware({
    appId : '273576052771797',
    secret : '666835a394317bd1bc070afcf00c6702'
  }))

})


server.configure('development', function () {
  server.use(express.errorHandler({ dumpExceptions : true, showStack : true }))
})

server.configure('production', function () {
  server.use(express.errorHandler())
})


var startServices = Q.all([

  require('./services').then(function (services) {
    server.use('/services', services)
  })

])

var startClients = Q.all([

  require('./clients/desktop').then(function (application) {
    server.use('/', application)
  }),

  require('./clients/mobile').then(function (application) {
    server.use('/mobile', application)
  })

])

var startServer = Q.fcall(function () {
  http.createServer(server).listen(server.get('port'), function () {
    console.log('Express server listening on port ' + server.get('port') + '.')
  })
})

Q.all([
  startServices,
  startClients
]).then(startServer)