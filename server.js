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
    secret : 'your secret here',
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

server.get('/facebook', /*Facebook.loginRequired(),*/ function (req, res) {
  req.facebook.api('/452343718147971', function (err, user) {
    res.json(user)
  })

//  $authToken = fetchUrl("https://graph.facebook.com/oauth/access_token?type=client_cred&client_id={$app_id}&client_secret={$app_secret}");
//  $json_object = fetchUrl("https://graph.facebook.com/{$profile_id}/feed?{$authToken}")

//  var options = {
//    host : 'graph.facebook.com',
//    port : 443,
//    path : '/oauth/access_token?type=client_cred&client_id=273576052771797&client_secret=666835a394317bd1bc070afcf00c6702',
//    method : 'GET'
//  }
//
//  https.get(options, function (result) {
//    res.json(result)
//  })
})

http.createServer(server).listen(server.get('port'), function () {
  console.log('Express server listening on port ' + server.get('port') + '.')
})