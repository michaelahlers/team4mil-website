/*jshint node:true*/
'use strict'

var csv = require('csv')
  , express = require('express')
  , environment = require('../../environment')
  , fs = require('fs')
  , path = require('path')
  , request = require('request')
  , Q = require('q')

var trackers = {
  '2013-allied-forces-team' : {
    name : '2013 Allied Forces Team',
    location : 'https://api.findmespot.com/spot-main-web/consumer/rest-api/2.0/public/feed/0qnLoEtgyf0esT6DpOxqE3HsIVDJJp3HK/message'
  }
}

var trackers0 = express()

trackers0.configure(function () {
  /* Empty for now. */
})

trackers0.get('/2013-raam-route', function (req, res) {

  var coordinates = []

  csv()
    .from.stream(fs.createReadStream(path.join(__dirname, '2013-raam-route.csv')))
    .on('record', function (row, index) {
      /* If the mode is not defined, then default it to the environment
       * setting so that the condition will pass. */
      coordinates.push({
        lat : parseFloat(row.shift()),
        long : parseFloat(row.shift()),
        name : row.shift()
      })
    })
    .on('end', function () {
      res.send(coordinates)
    })

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
