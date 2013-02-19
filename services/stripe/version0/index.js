/*jshint node:true*/
'use strict'

var status = require('./status')
  , charges = require('./charges')

module.exports = function (stripe) {
  return {
    status : status,
    charges : charges(stripe)
  }
}