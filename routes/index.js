/*jshint node:true*/
'use strict'

var async = require('async'),
  util = require('util')

exports.index = function (req, res) {
  res.render('index')
}

exports.partials = function (req, res) {
  res.render('partials/' + req.params.name)
}

exports.mission = function (req, res) {
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

//var getMember = function (facebook, name, callback) {
//  var template = 'SELECT title, content FROM note WHERE uid="175224842526528" and title="%s"'
//  var query = util.format(template, name)
//  facebook.api('/fql', {q : query}, callback)
//}

exports.teams = function (req, res) {

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
        var note = results[5].notes.data.filter(function (note) {
          return name == note.subject
        }) [0]

        return note || {}
      }

      res.json(
        {
          title : results[0].subject,
          summary : results[0].message,
          teams : [
            {
              title : results[1].name,
              summary : results[1].description,
              members : results[2].data.map(function (image) {
                return {
                  name : image.name,
                  source : image.source,
                  biography : getBiography(image.name).message.replace(/\<p\>\s*\<\/p\>/g, '')
                }
              })
            },
            {
              title : results[3].name,
              summary : results[3].description,
              members : results[4].data.map(function (image) {
                return {
                  name : image.name,
                  source : image.source,
                  biography : getBiography(image.name).message.replace(/\<p\>\s*\<\/p\>/g, '')
                }
              })
            }
          ]
        }
      )

    }

  )
}

exports.sponsors = function (req, res) {

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
        title : results[0].subject,
        summary : results[0].message,
        sponsors : results[1].data.map(function (sponsor) {
            return {
              id : sponsor.id,
              title : sponsor.name.split('\n')[0],
              location : sponsor.name.split('\n')[1],
              source : sponsor.images.filter(function (image) {
                return 480 == image.width
              })[0].source
            }
          }
        )
      }
    )

  })
}

exports.contact = function (req, res) {

  async.parallel([

    function (callback) {
      req.facebook.api('/452955478086795', function (err, result) {
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
        title : results[0].subject,
        summary : results[0].message
      }
    )

  })
}