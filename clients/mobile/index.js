/*jshint node:true*/
'use strict'

var express = require('express')
  , path = require('path')

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

exports.application = application