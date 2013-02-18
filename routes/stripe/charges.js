/*jshint node:true*/
'use strict'

module.exports = function (stripe) {
  return {
    create : function (req, res) {
      var charge = {
        card : req.body.token,
        currency : req.body.currency,
        amount : req.body.amount
      }

      stripe.charges.create(charge, function (err, result) {
        if (err) {
          res.json(500, err)
          return
        }

        res.json(result)
      })
    }
  }
}