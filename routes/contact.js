/*jshint node:true*/
'use strict'

var nodemailer = require('nodemailer')

exports.send = function(req, res) {
  console.log(req.body)

  res.json()
}