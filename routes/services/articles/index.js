/*jshint node:true*/
'use strict'

var util = require('util')

var version0 = require('./version0')

var versions = [ version0 ]
  , latest = version0

var getService = function (version) {
  if (version) {
    return versions[version]
  }

  return latest
}

var getMethod = function (article, method) {
  return function (req, res) {
    var version = req.query.version
      , service = getService(version)

    if (!service) {
      throw new Error(util.format('No "articles" service found for version "%s".', version))
    }

    return service[article][method](req, res)
  }
}

exports.mission = {
  get : getMethod('mission', 'get')
}

exports.teams = {
  get : getMethod('teams', 'get')
}

exports.sponsorship = {
  get : getMethod('sponsorship', 'get')
}

exports.contact = {
  get : getMethod('contact', 'get')
}

exports.versions = versions
exports.latest = latest
