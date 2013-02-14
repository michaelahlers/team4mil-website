/*jshint node:true*/
'use strict'

var contact = require('./contact')
  , resources = require('./resources')

exports.index = function (req, res) {
  res.render('index')
}

exports.directives = function (req, res) {
  res.render('directives/' + req.params.name)
}

exports.partials = function (req, res) {
  res.render('partials/' + req.params.name)
}

exports.contact = contact
exports.resources = resources