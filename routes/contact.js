/*jshint node:true*/
'use strict'

var nodemailer = require('nodemailer')

var transport = nodemailer.createTransport('SMTP', {
  service : 'Mailgun',
  auth : {
    user : 'api',
    pass : 'key-4vqyrivdws3fvkaj2d391ict3kbsinb5'
  }
})

exports.send = function (req, res) {

  var options = {
    from : 'michael.ahlers@team4mil.org',
    to : 'michael@ahlers.co',
    subject : 'Hello!',
    text : 'You suck.'
  }

  console.log('Sending mail.', options)

  transport.sendMail(options, function (error, response) {
    console.log(error || response)
  })

  res.json()

}