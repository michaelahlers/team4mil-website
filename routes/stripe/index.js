/*jshint node:true*/
'use strict'

/* Visit https://github.com/abh/node-stripe for the Node Stripe API documentation.
 * Also see https://stripe.com/docs/api for the Stripe REST API guide. */

var environment = require('../../environment')
  , stripe = require('stripe')(environment.STRIPE_SECRET_KEY)
  , charges = require('./charges')(stripe)

exports.status = function (req, res) {
  res.json({
    keys : {
      publishable : environment.STRIPE_PUBLISHABLE_KEY
    }
  })
}

exports.charges = charges