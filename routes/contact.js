/*jshint node:true*/
'use strict'

var Mailgun = require('mailgun').Mailgun
  , util = require('util')

var transport = new Mailgun(process.env.MAILGUN_API_KEY || 'key-4vqyrivdws3fvkaj2d391ict3kbsinb5')

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
  var subject = message.subject
  var body = message.body

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

  if (!sender.mail) {
    res.json(500, {
      error : util.format('Missing sender e-mail address.')
    })
    return
  }

  transport.sendText(
    util.format('"%s" <%s>', sender.name || '', sender.mail),
    [ util.format('"%s" <%s>', recipient.name, recipient.mail), '"Michael Ahlers" <michael.ahlers@patternconsulting.com>'],
    subject || '(No subject provided.)',
    body || '(No body provided.)',
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