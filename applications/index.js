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

var applications = express()

applications.configure(function () {
  applications.enable('strict routing')
})

module.exports = Q.all([

  require('./desktop').then(function (desktop) {

    applications.get('/desktop', function (req, res) {
      res.redirect('desktop/')
    })
    applications.use('/desktop/', desktop)

  }),

  require('./mobile').then(function (articles) {

    applications.get('/mobile', function (req, res) {
      res.redirect('mobile/')
    })
    applications.use('/mobile/', articles)
  })

]).then(

  function () {
    console.info('applications', 'available')
    return applications
  },

  function (reason) {
    console.error('applications', 'unavailable', reason)
  }

)