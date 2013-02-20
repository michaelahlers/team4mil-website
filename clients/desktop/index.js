/*jshint node:true*/
'use strict'

var express = require('express')
  , path = require('path')

var contact = require('./contact')

var application = express()

application.configure(function () {
  application.set('views', __dirname + '/public')
  application.set('view engine', 'jade')
  application.use(express.favicon(__dirname + '/public/images/logos/team4mil_favicon.ico'))

  application.use(require('less-middleware')({ src : __dirname + '/public' }))

  application.use(express.static(path.join(__dirname, '/public')))
})

application.configure('production', function () {

  /* TODO: Either make this block or publish a promise. */

  console.log('Building desktop web client...')

  var requirejs = require('requirejs')
    , config = require('./public/build')

  config.baseUrl = __dirname + '/public'
  config.out = __dirname + '/public/' + config.out

  requirejs.optimize(config, function (result) {
    if (result instanceof Error) {
      console.log(result)
      return
    }
    console.log('Desktop web build completed.')
  })

})

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

exports.application = application