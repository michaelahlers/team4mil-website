/*jshint node:true*/
'use strict'

/* Visit https://github.com/abh/node-stripe for the Node Stripe API documentation.
 * Also see https://stripe.com/docs/api for the Stripe REST API guide. */

var environment = require('../../../environment')
  , stripe = require('stripe')(environment.STRIPE_SECRET_KEY)
  , mailer = require('../../../mailer.js')
  , util = require('util')

exports.create = function (req, res) {

  var charge = {
    card : req.body.token,
    currency : req.body.currency,
    amount : req.body.amount
  }
  if (charge.amount > (1000 * 100)) {
    /* Restrict to sane amounts. */
    res.json(500, {
      reason : 'Charge amount greater than $1,000.00'
    })
  }

  var payer = {
    name : req.body.payer.name,
    mail : req.body.payer.mail
  }

  stripe.charges.create(charge, function (err, result) {
    if (err) {
      res.json(500, err)
      return
    }

    var message = {
      sender : {
        name : 'Team 4Mil Donations',
        mail : 'donations@team4mil.org'
      },

      recipient : [{
        name : payer.name,
        mail : payer.mail
      },
      {
        name : 'Wayne Dowd',
        mail : 'wayne.dowd@team4mil.org'
      }],

      subject : 'Thank you, from Team 4Mil, for your donation!',
      body : util.format("We've processed your donation of $%s.00 to account ending %s.", Math.floor(charge.amount / 100), result.card.last4)
    }

    mailer.send(message)

    res.json(result)
  })

}
