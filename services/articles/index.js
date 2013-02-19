/*jshint node:true*/
'use strict'

var version0 = require('./version0')
  , latest = version0

module.exports = function (connect) {

  connect.get('/articles/mission', latest.mission.get)
  connect.get('/articles/teams', latest.teams.get)
  connect.get('/articles/sponsorship', latest.sponsorship.get)
  connect.get('/articles/contact', latest.contact.get)

  connect.get('/articles/0/mission', version0.mission.get)
  connect.get('/articles/0/teams', version0.teams.get)
  connect.get('/articles/0/sponsorship', version0.sponsorship.get)
  connect.get('/articles/0/contact', version0.contact.get)

}