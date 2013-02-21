/*jshint node:true*/
'use strict'

var async = require('async')

/* TODO: Replace async with promises (Q library)! */

exports.get = function (req, res) {

  var toId = function (name) {
    return name
      .trim()
      .replace(/[“”]/g, '')
      .replace(/[\s]/g, '-')
      .toLowerCase()
  }

  var toMailAddress = function (name) {
    return name
      .trim()
      .replace(/[“”]/g, '')
      .replace(/[\s]/g, '.')
      .toLowerCase() + '@team4mil.org'
  }

  var resources = [
    '/463970396985303/photos'
  ]

  async.map(
    resources,

    /* Iterator. */
    function (call, callback) {
      req.facebook.api(call, function (err, result) {
        callback(err, result)
      })
    },

    function (err, results) {

      if (err) {
        res.json(500, err)
        return
      }

      res.json(
        {
          _version : 0,
          board : {
            members : results[0].data.map(function (member) {
              return {
                id : toId(member.name.split('\n')[0]),
                mail : toMailAddress(member.name.split('\n')[0]),
                name : member.name.split('\n')[0],
                title : member.name.split('\n')[1],
                picture : {
                  location : member.source
                }
              }
            })
          }
        }

      )
    }
  )

}