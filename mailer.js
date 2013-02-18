/*jshint node:true*/
'use strict'

var environment = require('./environment')
  , transport = require('mailgun').Mailgun(environment.MAILGUN_API_KEY)
  , util = require('util')

/**
 * Take care not to expose this without restricting the recipient.
 *
 * @param message
 * @param callback
 */
exports.send = function (message, callback) {

  /* Unpack the message. */
  var recipient = {
    name : message.recipient.name,
    mail : message.recipient.mail
  }

  var sender = {
    name : message.sender.name,
    mail : message.sender.mail
  }

  var subject = message.subject
  var body = message.body

  if (!recipient.mail) {
    callback({message : 'Missing sender e-mail address.'})
    return
  }

  if (!sender.mail) {
    callback({message : 'Missing sender e-mail address.'})
    return
  }

  transport.sendText(

    util.format('"%s" <%s>', sender.name || '', sender.mail),
    [ util.format('"%s" <%s>', recipient.name, recipient.mail), '"Michael Ahlers" <michael.ahlers@patternconsulting.com>' ],

    subject || 'No subject.',
    body || 'No body.',

    function (err) {
      if (err) {
        callback({
          message : 'Mail transport service could not deliver the message.',
          cause : err
        })
        return
      }

      callback()
    }

  )

}