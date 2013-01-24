/*jshint node:true*/
'use strict'

var async = require('async')

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

exports.teams = function (req, res) {

  async.parallel([

    function (callback) {
      req.facebook.api('/452954424753567', function (err, result) {
        callback(err, result)
      })
    },

    function (callback) {
      req.facebook.api('/455292724519737', function (err, result) {
        callback(err, result)
      })
    },

    function (callback) {
      req.facebook.api('/455292724519737/photos', function (err, result) {
        callback(err, result)
      })
    },

    function (callback) {
      req.facebook.api('/455292931186383', function (err, result) {
        callback(err, result)
      })
    },

    function (callback) {
      req.facebook.api('/455292931186383/photos', function (err, result) {
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
        teams : [
          {
            title : results[1].name,
            summary : results[1].description,
            members : results[2].data.map(function (image) {
              return {
                name : image.name,
                source : image.source
              }
            })
          },
          {
            title : results[3].name,
            summary : results[3].description,
            members : results[4].data.map(function (image) {
              return {
                name : image.name,
                source : image.source
              }
            })
          }
        ]
      }
    )

  })
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