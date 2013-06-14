/*jshint node:true*/
'use strict'

var environment = require('../../../environment')

module.exports = function (req, res) {
  res.json({
    keys : {
      publishable : environment.STRIPE_PUBLISHABLE_KEY
    }
  })
}