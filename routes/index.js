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
      id = 452343718147971
      break
  }

  req.facebook.api('/' + id, function (err, user) {
    res.json(user)
  })
}