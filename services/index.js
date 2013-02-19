/*jshint node:true*/
'use strict'

var articles = require('./articles')
  , stripe = require('./stripe')

module.exports = function (connect) {
  articles(connect)
  stripe(connect)
}