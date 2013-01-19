/*jshint node:true*/
'use strict'

exports.index = function (req, res) {
  res.render('index')
}

exports.partials = function (req, res) {
  res.render('partials/' + req.params.name)
}

exports.about = function (req, res) {
  req.facebook.api('/452343718147971', function (err, result) {
    if (err) {
      res.json(500, err)
      return
    }

    res.json(result)
  })
}

exports.sponsors = function (req, res) {
  req.facebook.api('/452606691455007/photos', function (err, result) {
    if (err) {
      res.json(500, err)
      return
    }

    res.json(result.data.map(function (sponsor) {
      return {
        id : sponsor.id,
        source : sponsor.images.filter(function (image) {
          return 480 == image.width
        })[0].source
      }
    }))
  })
}