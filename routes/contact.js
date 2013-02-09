/*jshint node:true*/
'use strict'

var Mailgun = require('mailgun').Mailgun
  , util = require('util')

var transport = new Mailgun('key-4vqyrivdws3fvkaj2d391ict3kbsinb5')

var authorizedRecipients = [
  'contact@team4il.org',
  'wayne.dowd@team4mil.org',
  'mason.poe@team4mil.org',
  'bethany.kelsey@team4mil.org',
  'joe.arnone@team4mil.org'
]

exports.send = function (req, res) {

  var message = req.body.message

  /* Unpack the message. */
  var recipient = message.recipient.mail || 'contact@team4il.org'
  var sender = message.sender.mail
  var subject = message.subject || '(No subject.)'
  var body = message.body || '(No body.)'

  if (authorizedRecipients.indexOf(recipient) < 0) {
    res.json(500, {
      error : util.format('Unauthorized recipient: %s.', recipient)
    })
    return
  }

  if (!sender) {
    res.json(500, {
      error : util.format('Missing sender.')
    })
    return
  }

  transport.sendText(
    sender,
    [ recipient, 'michael@ahlers.co' ],
    subject,
    body,
    function (err) {
      if (err) {
        res.json(500, {error : err})
      }

      res.json({success : message})
    })
}