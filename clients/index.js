/*jshint node:true*/
'use strict'

/*
 * This module must deal with the classic trailing slash problem. To
 * understand how this works, PLEASE READ THESE TWO ARTICLES.
 *
 * http://stackoverflow.com/questions/10867052/cannot-serve-static-files-with-express-routing-and-no-trailing-slash
 * http://stackoverflow.com/questions/5457885/relative-urls-and-trailing-slashes
 *
 * This is stuff every web developer should know anyway.
 */

var express = require('express')
  , Q = require('q')

var clients = express()

clients.configure(function () {
  clients.enable('strict routing')
})

module.exports = Q.all([

  require('./desktop').then(function (desktop) {

    clients.get('/desktop', function (req, res) {
      res.redirect('desktop/')
    })
    clients.use('/desktop/', desktop)

  }),

  require('./mobile').then(function (articles) {

    clients.get('/mobile', function (req, res) {
      res.redirect('mobile/')
    })
    clients.use('/mobile/', articles)
  })

]).then(

  function () {
    console.info('clients', 'available')
    return clients
  },

  function (reason) {
    console.error('clients', 'unavailable', reason)
  }

)