#!/usr/bin/env node

/*jshint node:true*/
'use strict'

var express = require('express')
  , Facebook = require('facebook-node-sdk')
  , http = require('http')

var server = express()

server.configure(function () {
  server.set('port', process.env.PORT || 3000)

  server.use(express.logger('dev'))

  server.use(express.bodyParser())
  server.use(express.methodOverride())

  server.use('/', require('./clients/desktop').application)
  server.use('/touch', require('./clients/mobile').application)

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

require('./services')(server)

//var build = function (callback) {
//  console.log('Building client...')
//
//  var requirejs = require('requirejs')
//    , config = require('./public/build')
//
//  config.baseUrl = __dirname + '/public'
//  config.out = __dirname + '/public/' + config.out
//
//  requirejs.optimize(config, function (result) {
//    if (result instanceof Error) {
//      callback(result)
//      return
//    }
//    callback()
//  })
//}

var start = function () {
  http.createServer(server).listen(server.get('port'), function (foo) {
    console.log('Express server listening on port ' + server.get('port') + '.')
  })
}

switch (process.env.NODE_ENV) {

//  case 'production':
//    build(function (err) {
//      if (err) {
//        console.log(err)
//        throw err
//      }
//      start()
//    })
//    break

  default:
    start()

}
