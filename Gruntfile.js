'use strict'

var bower = require('bower')
  , path = require('path')

module.exports = function (grunt) {
  grunt.initConfig({
  })

  grunt.registerTask('bower', '', function () {

    var applications = [
      path.join(__dirname, 'applications', 'desktop', 'public')
    ]

    var done = this.async()

    while (applications.length > 0) {
      var application = applications.pop()
        , config = grunt.file.readJSON(path.join(application, '.bowerrc'))

      Object.keys(config).forEach(function (key) {
        bower.config[key] = config[key]
      })

      grunt.file.setBase(application)

      bower.commands
        .install()

        .on('data', function (message) {
          grunt.log.write(message)
        })

        .on('error', function (cause) {
          grunt.log.error(cause)
          throw new Error(cause)
        })

        .on('end', function () {
          if (0 == applications.length) {
            done()
          }
        })
    }
  })
}
