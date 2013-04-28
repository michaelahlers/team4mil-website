/*jshint node:true*/
'use strict'

var async = require('async')
  , util = require('util')

/* TODO: Replace async with promises (Q library)! */

exports.get = function (req, res) {

  var toId = function (name) {
    return (name || '')
      .replace(/[“”]/g, '')
      .replace(/[\s]/g, '-')
      .toLowerCase()
  }

  /* Facebook may eventually hate us, but that would be a good problem to have. */
  var calls = [
    '/452954424753567',
    '/455292724519737',
    '/455292724519737/photos',
    '/455292931186383',
    '/455292931186383/photos',
    '/175224842526528?fields=notes'
  ]

  async.map(
    calls,

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

      /* This is not the worst thing I have ever done. */
      var getBiography = function (name) {
        name = (name || '').trim()

        var note = results[5].notes.data.filter(function (note) {
          return name == note.subject
        })[0]

        return note || {}
      }

      res.json({
        _version : 0,
        title : results[0].subject,
        summary : results[0].message,
        teams : [
          {
            id : toId(results[1].name),
            title : results[1].name,
            summary : results[1].description,
            members : results[2].data.map(function (image) {
              return {
                id : toId(image.name),
                name : image.name,
                picture : { location : image.source},
                biography : (getBiography(image.name).message || '').replace(/\<p\>\s*\<\/p\>/g, '')
              }
            })
          },
          {
            id : toId(results[3].name),
            title : results[3].name,
            summary : results[3].description,
            members : results[4].data.map(function (image) {
              return {
                id : toId(image.name),
                name : image.name,
                picture : { location : image.source},
                biography : (getBiography(image.name).message || '').replace(/\<p\>\s*\<\/p\>/g, '')
              }
            })
          }
        ]
      })

    }
  )

}
