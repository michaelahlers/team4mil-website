/*jshint node:true*/
'use strict'

var express = require('express')
  , path = require('path')
  , Q = require('q')
  , requirejs = require('requirejs')

var contact = require('./contact')

var application = express()

application.configure(function () {
  application.set('views', path.join(__dirname, 'public'))
  application.set('view engine', 'jade')
  application.use(express.favicon(path.join(__dirname, 'public', 'images', 'logos', 'team4mil_favicon.ico')))
  application.use(require('less-middleware')({ src : path.join(__dirname, 'public') }))
  application.use(express.static(path.join(__dirname, 'public')))
})

var getBuild = function () {
  var deferred = Q.defer()

  application.configure('development', function () {
    /* Resolve immediately. No build will be done. */
    deferred.resolve()
  })

  application.configure('production', function () {
    var config = require('./public/build')

    config.baseUrl = __dirname + '/public'
    config.out = __dirname + '/public/' + config.out

    console.info('Building the desktop web client.')

    requirejs.optimize(config, function (result) {
      if (result instanceof Error) {
        console.error('Could not build desktop web client.', result)
        deferred.reject(result)
        return
      }

      console.error('Desktop web client built.')
      deferred.resolve(result)
    })

  })

  return deferred.promise
}

application.get('/', function (req, res) {
  res.render('index')
})

application.get('/directives/:name', function (req, res) {
  res.render('directives/' + req.params.name)
})

application.get('/partials/:name', function (req, res) {
  res.render('partials/' + req.params.name)
})

application.post('/contact', contact.send)

module.exports = getBuild().then(function (build) {
  return application
})