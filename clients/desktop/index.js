/*jshint node:true*/
'use strict'

var express = require('express')
  , path = require('path')

var application = express()

application.configure(function () {
  application.set('views', __dirname + '/public')
  application.set('view engine', 'jade')
  application.use(express.favicon(__dirname + '/public/images/logos/team4mil_favicon.ico'))

  //application.use(express.bodyParser())
  //application.use(express.methodOverride())

  //application.use(express.cookieParser('your secret here'))
  //application.use(express.session({
  //  secret : 'your secret here'
  //}))

  /* TODO: Reconfigure to direct output elsewhere besides source. */
  application.use(require('less-middleware')({ src : __dirname + '/public' }))

  application.use(express.static(path.join(__dirname, '/public')))
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

exports.application = application