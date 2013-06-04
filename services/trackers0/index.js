/*jshint node:true*/
'use strict'

var express = require('express')
  , environment = require('../../environment')
  , request = require('request')
  , Q = require('q')

var trackers = {
  '2013-warrior-team' : {
    name : '2013 Warrior Team',
    location : 'http://share.findmespot.com/shared/faces/viewspots.jsp?glId=0UsXxonLsY1eNYu07minJ9UzXhb8WmDn5'
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
  req.pipe(request({
    method : 'get',
    url : trackers[req.params.id].location,
    body : JSON.stringify(req.body)
  })).pipe(res)
})

module.exports = Q.fcall(function () {
  return trackers0
})
