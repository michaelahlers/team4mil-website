/*jshint node:true*/
'use strict'

//var articles = require('./articles')
//  , stripe = require('./stripe')
//module.exports = function (connect) {
//  articles(connect)
//  stripe(connect)
//}


var express = require('express')
  , Q = require('q')

var getArticles = require('./articles')

var services = express()

services.configure(function () {
  /* Empty for now. */
})

module.exports = Q.all([

  getArticles.then(function (articles) {
    articles.use('/articles', articles)
  })

])