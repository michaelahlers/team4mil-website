/*jshint node:true*/
'use strict'

var stripe = require('stripe')('sk_test_fxNypkThUlkUzMcEMR9Jj1cB')
  , charges = require('./charges')(stripe)

exports.charges = charges