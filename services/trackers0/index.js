/*jshint node:true*/
'use strict'

var csv = require('csv')
  , express = require('express')
  , environment = require('../../environment')
  , fs = require('fs')
  , LatLon = require('./LatLon')
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

var toDistance = function (point0, point1) {
  if ('undefined' === typeof point0 || 'undefined' === typeof point1) {
    throw {
      message : 'Both arguments are required to compute distance.'
    }
  }
  return parseFloat(new LatLon(point0.latitude, point0.longitude).distanceTo(new LatLon(point1.latitude, point1.longitude)))
}

var route = Q.fcall(function () {
  var deferred = Q.defer()
    , points = []
    , distance = 0

  csv()
    .from.stream(fs.createReadStream(path.join(__dirname, '2013-raam-route.csv')))
    .on('record', function (row, index) {
      /* If the mode is not defined, then default it to the environment
       * setting so that the condition will pass. */
      points.push({
        latitude : parseFloat(row.shift()),
        longitude : parseFloat(row.shift()),
        name : row.shift()
      })

      if (1 < points.length) {
        distance += toDistance(points[points.length - 1], points[points.length - 2])
      }
    })
    .on('end', function () {
      deferred.resolve({
        distance : {
          kilometers : distance,
          miles : distance * 0.621371
        },
        points : points
      })
    })

  return deferred.promise
})

trackers0.get('/2013-raam-route', function (req, res) {
  route.then(function (route) {
    res.send(route)
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
  request(trackers[req.params.id].location, function (err, status, body) {
    var message = JSON.parse(body).response.feedMessageResponse.messages.message[0]
      , referencePoint = {
        latitude : message.latitude,
        longitude : message.longitude
      }

    route.then(function (route) {
      var points = route.points
        , shortestDistance = toDistance(referencePoint, points[0])
        , closestIndex = 0

      for (var index = 1; index < points.length; index++) {
        var distance = toDistance(referencePoint, points[index])

        if (distance < shortestDistance) {
          closestIndex = index
          shortestDistance = distance
        }
      }

      var distance = 0
        , behindPoints = points.slice(0, closestIndex).concat([referencePoint])

      if (1 < behindPoints.length) {
        for (var index = 1; index < behindPoints.length; index++) {
          distance += toDistance(behindPoints[index], behindPoints[index - 1])
        }
      }

      var times = {
        started : new Date('06/15/2013 15:32 EST'),
        updated : new Date(message.dateTime)
      }

      var delta = times.updated.getTime() - times.started.getTime()
      var speed = {
        kph : distance / (delta / 1000 / 60 / 60)
      }
      speed.mph = speed.kph * 0.621371

      times.arrival = new Date(times.started.getTime() + (route.distance.kilometers / (speed.kph / 60 / 60 / 1000)))

      res.send({
        times : times,
        percent : distance / route.distance.kilometers,
        traveled : {
          kilometers : distance,
          miles : distance * 0.621371
        },
        remaining : {
          kilometers : route.distance.kilometers - distance,
          miles : (route.distance.kilometers - distance) * 0.621371
        },
        speed : speed,
        nearest : {
          index : closestIndex,
          point : points[closestIndex]
        },
        reference : {
          point : referencePoint
        }
      })
    })
  })
})

module.exports = Q.fcall(function () {
  return trackers0
})
