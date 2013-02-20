/*jshint node:true*/
'use strict'

var express = require('express')
  , path = require('path')
  , Q = require('q')

var application = express()

application.configure(function () {
  application.set('views', __dirname + '/public')
  application.set('view engine', 'ejs')
  application.use(require('less-middleware')({ src : __dirname + '/public' }))
  application.use(express.static(path.join(__dirname, '/public')))
})

application.get('/', function (req, res) {
  res.render('index', { title : '(Mobile)' })
})

module.exports = Q.fcall(function () {
  /* No other asynchronous calls at the moment. */
  return application
})