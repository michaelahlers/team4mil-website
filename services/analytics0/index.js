/*jshint node:true*/
'use strict'

var express = require('express')
  , environment = require('../../environment')
  , Q = require('q')

var analytics0 = express()

analytics0.configure(function () {
  /* Empty for now. */
})

analytics0.get('/', function (req, res) {
  res.send({
    google : {
      analytics : {
        tracking : {
          id : environment.GOOGLE_ANALYTICS_TRACKING_ID,
          domainName : environment.GOOGLE_ANALYTICS_TRACKING_DOMAIN_NAME
        }
      }
    }
  })
})

module.exports = Q.fcall(function () {
  return analytics0
})