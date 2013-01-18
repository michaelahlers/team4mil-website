/*jshint node:true*/
'use strict'

exports.index = function (req, res) {
  res.render('index')
}

exports.partials = function (req, res) {
  res.render('partials/' + req.params.name)
}

exports.resources = function (req, res) {
  var id

  switch (req.params.name) {
    case 'about':
      id = '452343718147971'
      break
    case 'sponsors':
      id = '411911065524570/photos'
  }

  req.facebook.api('/' + id, function (err, result) {
    if (err) {
      res.json(err)
      return
    }

    res.json(result)
  })
}