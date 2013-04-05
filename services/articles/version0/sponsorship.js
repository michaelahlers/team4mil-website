/*jshint node:true*/
'use strict'

var async = require('async')
  , util = require('util')

/* TODO: Replace async with promises (Q library)! */

exports.get = function (req, res) {

  async.parallel([

    function (callback) {
      req.facebook.api('/452941154754894', function (err, result) {
        callback(err, result)
      })
    },

    function (callback) {
      req.facebook.api('/452606691455007/photos', function (err, result) {
        callback(err, result)
      })
    }

  ], function (err, results) {

    if (err) {
      res.json(500, err)
      return
    }

    res.json(
      {
        _version : 0,
        title : results[0].subject,
        summary : results[0].message,
        sponsors : results[1].data.map(function (sponsor) {
            sponsor.name = sponsor.name.replace(/\n+/g, '\n')
            return {
              id : sponsor.id,
              name : sponsor.name.split('\n')[0],
              location : sponsor.name.split('\n')[1],
              description : sponsor.name.split('\n')[2],
              source : sponsor.images[1].source
            }
          }
        )
      }
    )
  })

}
