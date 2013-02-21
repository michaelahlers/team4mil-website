/*jshint node:true*/
'use strict'

var mailer = require('../../mailer')
  , util = require('util')

var transport = mailer.transport

var authorizedRecipients = [
  'contact@team4mil.org',
  'wayne.dowd@team4mil.org',
  'mason.poe@team4mil.org',
  'bethany.kelsey@team4mil.org',
  'joe.arnone@team4mil.org',
  'michael.ahlers@team4mil.org'
]

exports.send = function (req, res) {

  var message = req.body.message

  /* Unpack the message. */
  var recipient = message.recipient || { mail : authorizedRecipients[0] }
  var sender = message.sender
  var subject = message.subject
  var body = message.body

  if (authorizedRecipients.indexOf(recipient.mail) < 0) {
    res.json(500, {
      error : util.format('Unauthorized recipient: %s.', recipient.mail)
    })
    return
  }

  mailer.send(
    {
      sender : sender,
      recipient : recipient,
      subject : subject,
      body : body
    },

    function (err) {
      if (err) {
        res.json(500, err)
      }

      res.json({
        recipient : recipient,
        sender : sender
      })
    }
  )

}