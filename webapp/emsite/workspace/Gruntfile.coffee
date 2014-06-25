module.exports = (grunt) ->
  pkg: grunt.file.readJSON('package.json')

  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-watch')


  grunt.initConfig
    watch:
      coffee:
        files: './*.coffee'
        tasks: ['coffee:compile']
    options: 
      livereload: true,
      spawn: false


    coffee:
      compile:
        expand: true,
        flatten: true,
        cwd: "#{__dirname}/js/",
        src: ['*.coffee'],
        dest: 'js/',
        ext: '.js'

  grunt.registerTask 'default', ['coffee', 'watch']