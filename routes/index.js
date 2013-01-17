/*jshint node:true*/
'use strict'

exports.index = function (req, res) {
    res.render('index')
}

exports.partials = function (req, res) {
    res.render('partials/' + req.params.name)
}
