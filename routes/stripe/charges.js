/*jshint node:true*/
'use strict'

var stripe = require('stripe')('sk_test_fxNypkThUlkUzMcEMR9Jj1cB')

exports.create = function (req, res) {
  var charge = {
    card : req.body.token,
    currency : req.body.currency,
    amount : req.body.amount
  }

  console.log(charge)

  stripe.charges.create(charge, function (err, result) {
    if (err) {
      res.json(500, err)
      return
    }

    res.json(result)
  })
}