/*jshint node:true*/
'use strict'

var express = require('express')
  , path = require('path')
  , Q = require('q')
  , requirejs = require('requirejs')

var contact = require('./contact')

var application = express()

application.configure(function () {
  application.set('views', __dirname + '/public')
  application.set('view engine', 'jade')
  application.use(express.favicon(__dirname + '/public/images/logos/team4mil_favicon.ico'))
  application.use(require('less-middleware')({ src : __dirname + '/public' }))
  application.use(express.static(path.join(__dirname, '/public')))
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

    requirejs.optimize(config, function (result) {
      if (result instanceof Error) {
        deferred.reject(result)
        return
      }
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

module.exports = getBuild().then(function () {
  return application
})