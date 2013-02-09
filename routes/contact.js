/*jshint node:true*/
'use strict'

var Mailgun = require('mailgun').Mailgun
  , util = require('util')

var transport = new Mailgun('key-4vqyrivdws3fvkaj2d391ict3kbsinb5')

var authorizedRecipients = [
  'contact@team4mil.org',
  'wayne.dowd@team4mil.org',
  'mason.poe@team4mil.org',
  'bethany.kelsey@team4mil.org',
  'joe.arnone@team4mil.org'
]

exports.send = function (req, res) {

  var message = req.body.message

  /* Unpack the message. */
  var recipient = message.recipient || { mail : authorizedRecipients[0] }
  var sender = message.sender
  var subject = message.subject || '(No subject.)'
  var body = message.body || '(No body.)'

  if (!recipient.mail) {
    res.json(500, {
      error : util.format('Missing recipient e-mail address.')
    })
    return
  }

  if (authorizedRecipients.indexOf(recipient.mail) < 0) {
    res.json(500, {
      error : util.format('Unauthorized recipient: %s.', recipient.mail)
    })
    return
  }

  if (!sender.name) {
    res.json(500, {
      error : util.format('Missing sender name.')
    })
    return
  }

  if (!sender.mail) {
    res.json(500, {
      error : util.format('Missing sender e-mail address.')
    })
    return
  }

  transport.sendText(
    util.format('"%s" <%s>', sender.name, sender.mail),
    [ util.format('"%s" <%s>', recipient.name, recipient.mail), '"Michael Ahlers" <michael.ahlers@patternconsulting.com>'],
    subject,
    body,
    function (err) {
      if (err) {
        res.json(500, {error : err})
      }

      res.json({
        recipient : recipient,
        sender : sender
      })

    })
}