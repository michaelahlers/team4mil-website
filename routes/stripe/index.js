/*jshint node:true*/
'use strict'

var environment = require('../../environment')
  , stripe = require('stripe')(environment.STRIPE_SECRET_KEY)
  , charges = require('./charges')(stripe)

exports.status = function (req, res) {
  res.json(500, {
    keys : {
      publishable : environment.STRIPE_PUBLISHABLE_KEY
    }
  })
}

exports.charges = charges