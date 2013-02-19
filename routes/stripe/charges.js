/*jshint node:true*/
'use strict'

var mailer = require('../../mailer.js')
  , util = require('util')

module.exports = function (stripe) {
  return {

    create : function (req, res) {

      var charge = {
        card : req.body.token,
        currency : req.body.currency,
        amount : req.body.amount
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

          recipient : {
            name : payer.name,
            mail : payer.mail
          },

          subject : 'Thank you, from Team 4Mil, for your donation!',
          body : util.format("We've processed your donation of $%s.00 to account ending %s.", Math.floor(charge.amount / 100), result.card.last4)
        }

        mailer.send(message)

        res.json(result)
      })

    }

  }
}