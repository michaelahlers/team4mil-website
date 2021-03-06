#!/usr/bin/env node

/*jshint node:true*/
'use strict'

var express = require('express')
  , http = require('http')
  , Q = require('q')

var server = express()

server.configure(function () {
  server.set('port', process.env.PORT || 3000)

  server.use(express.logger('dev'))

  server.use(express.bodyParser())
  server.use(express.methodOverride())

})


server.configure('development', function () {
  server.use(express.errorHandler({ dumpExceptions : true, showStack : true }))
})

server.configure('production', function () {
  server.use(express.errorHandler())
})

var startServices = require('./services').then(function (services) {
  server.use('/services', services)
})


var startApplications = Q.allResolved([

  require('./applications').then(function (applications) {
    server.use('/applications', applications)
  }),

  require('./applications/desktop').then(function (desktop) {
    server.use('/', desktop)
  }),

  require('./applications/mobile').then(function (mobile) {
    server.use('/mobile', mobile)
  })

])

Q.allResolved([

  startServices,
  startApplications
])
  .then(function () {
    http.createServer(server).listen(server.get('port'), function () {
      console.log('Express server listening on port ' + server.get('port') + '.')
    })
  })