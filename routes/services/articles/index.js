/*jshint node:true*/
'use strict'

var version0 = require('./version0')

var versions = [ version0 ]
var latest = version0


var getService = function (version) {
  return versions[version] || latest
}

var getHandler = function (article, method) {
  return function (req, res) {
    var service = getService(req.params.version)
    return service[article][method](req, res)
  }
}

exports.mission = {
  get : getHandler('mission', 'get')
}

exports.teams = {
  get : getHandler('teams', 'get')
}

exports.sponsorship = {
  get : getHandler('sponsorship', 'get')
}

exports.contact = {
  get : getHandler('contact', 'get')
}

exports.versions = versions
exports.latest = latest
