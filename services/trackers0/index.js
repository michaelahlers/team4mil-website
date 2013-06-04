/*jshint node:true*/
'use strict'

var express = require('express')
  , environment = require('../../environment')
  , Q = require('q')

var trackers = {
  '2013-warrior-team' : {
    name : '2013 Warrior Team',
    location : 'http://share.findmespot.com/shared/faces/viewspots.jsp?glId=0qnLoEtgyf0esT6DpOxqE3HsIVDJJp3HK'
  },

  '2013-allied-forces-team' : {
    name : '2013 Allied Forces Team',
    location : 'http://share.findmespot.com/shared/faces/viewspots.jsp?glId=0qnLoEtgyf0esT6DpOxqE3HsIVDJJp3HK'
  }
}

var trackers0 = express()

trackers0.configure(function () {
  /* Empty for now. */
})

trackers0.get('/', function (req, res) {
  res.send(Object.keys(trackers).map(function (id) {
    return {
      id : id,
      name : trackers[id].name
    }
  }))
})

trackers0.get('/:id', function (req, res) {
  res.send(trackers[req.params.id])
})

module.exports = Q.fcall(function () {
  return trackers0
})
