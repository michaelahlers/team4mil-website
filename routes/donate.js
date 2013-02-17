/*jshint node:true*/
'use strict'

var stripe = require('stripe')('pk_test_bAwWmtD5CZPctFHF5mzK2ZUx')

exports.charge = function (req, res) {
  var charge = {
    card : req.body.id,
    currency : req.body.currency,
    amount : req.body.amount
  }

  stripe.charges.create(charge, function (err) {
    if (err) {
      res.json(500, err)
      return
    }

    res.ok()
  })
}