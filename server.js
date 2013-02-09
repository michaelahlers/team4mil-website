#!/usr/bin/env node

/*jshint node:true*/
'use strict'

var express = require('express')
  , Facebook = require('facebook-node-sdk')
  , http = require('http')
  , https = require('https')
  , path = require('path')
  , routes = require('./routes')

var server = express()

server.configure(function () {
  server.set('port', process.env.PORT || 3000)

  server.set('views', __dirname + '/public')
  server.set('view engine', 'jade')

  server.use(express.favicon())

  server.use(express.logger('dev'))

  server.use(express.bodyParser())
  server.use(express.methodOverride())

  server.use(express.cookieParser('your secret here'))
  server.use(express.session({
    secret : 'your secret here'
  }))

  /* TODO: Reconfigure to direct output elsewhere besides source. */
  server.use(require('less-middleware')({ src : __dirname + '/public' }))

  server.use(express.static(path.join(__dirname, '/public')))

  server.use(Facebook.middleware({
    appId : '273576052771797',
    secret : '666835a394317bd1bc070afcf00c6702'
  }))
})

server.configure('development', function () {
  server.use(express.errorHandler())
})

/*
 * User interface routes.
 */
server.get('/', routes.index)
server.get('/partials/:name', routes.partials)

server.get('/resources/mission', routes.resources.mission)
server.get('/resources/teams', routes.resources.teams)
server.get('/resources/sponsors', routes.resources.sponsors)
server.get('/resources/contact', routes.resources.contact)

server.post('/contact', routes.contact.send)

http.createServer(server).listen(server.get('port'), function () {
  console.log('Express server listening on port ' + server.get('port') + '.')
})