/*jshint node:true*/
'use strict'

var async = require('async')
  , util = require('util')

/* TODO: Replace async with promises (Q library)! */

exports.get = function (req, res) {

  req.facebook.api('/452343718147971', function (err, result) {
    if (err) {
      res.json(500, err)
      return
    }

    res.json({
      id : result.id,
      title : result.subject,
      summary : result.message
    })
  })

}