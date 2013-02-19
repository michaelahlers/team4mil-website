/*jshint node:true*/
'use strict'

/* Visit https://github.com/abh/node-stripe for the Node Stripe API documentation.
 * Also see https://stripe.com/docs/api for the Stripe REST API guide. */

var environment = require('../../environment')
  , stripe = require('stripe')(environment.STRIPE_SECRET_KEY)

var version0 = require('./version0')(stripe)
  , latest = version0

module.exports = function (connect) {

  connect.get('/stripe', latest.status)
  connect.post('/stripe/charges', latest.charges.create)

  connect.get('/stripe/0', version0.status)
  connect.post('/stripe/0/charges', version0.charges.create)

}
