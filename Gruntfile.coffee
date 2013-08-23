# path = require('path')
# lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet
# folderMount = (connect, point) ->
#   return connect.static(path.resolve(point))

module.exports = (grunt) ->
  grunt.initConfig
    mocha_phantomjs:
      all:
        options:
          urls: [
            'http://localhost:8080/test/index.html'
          ]

    connect:
      server:
        options:
          port: 8080
          base: '.'

    watch:
      # options:
      #   nospawn: true
      #   livereload: true

      test:
        files: [
          'test/*.html'
          'test/*.js'
        ]
        tasks: [
          'mocha_phantomjs'
        ]

  # Load grunt tasks.
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  # Register tasks.
  grunt.registerTask 'test', [
    'connect'
    'watch'
  ]

  return;