# grunt file for em9-annotations
module.exports = (grunt) ->
  # grunt inintialize configuration
  grunt.initConfig
    # where your package manager lives
    pkg: grunt.file.readJSON('package.json')

    # configuration for compiling coffeescript files
    # grunt coffee
    coffee:
      options:
        sourceMap: false
        bare: true
        force: true # needs to be added to the plugin
      site:
        expand: true
        cwd: 'webapp/emsite/workspace/cs'
        src: '**/*.coffee'
        dest: 'webapp/emsite/workspace/js/compiled'
        ext: '.js'

    # configuration for coffeelint
    # grunt coffeelint
    coffeelint:
      options:
        force: true
      all:
        expand: true
        cwd: 'webapp/emsite/workspace/cs'
        src: '**/*.coffee'

    # configuration for minifying javascript
    # grunt uglify
    uglify:
        options:
            banner: '/*! oms <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            compress:
                drop_console: true
        buildVendor:
            src: 'webapp/emsite/workspace/js/compiled/app.vendor.js'
            dest: 'webapp/emsite/workspace/js/compiled/app.vendor.min.js'
            options:
                mangle: false
        build:
            src: 'webapp/emsite/workspace/js/compiled/app.js'
            dest: 'webapp/emsite/workspace/js/compiled/app.min.js'

    # configuration for combining files togther
    # grunt concat
    concat:
        distJsVendor:
            src: ["webapp/emsite/workspace/js/vendor/jquery/jquery.js", "webapp/emsite/workspace/js/angular/angular.js"]
            dest: 'webapp/emsite/workspace/js/compiled/app.vendor.js'
        distJs:
            src: ['webapp/emsite/workspace/js/compiled/app.js', 'webapp/emsite/workspace/js/compiled/**/*.js']
            dest: 'webapp/emsite/workspace/js/compiled/app.js'
        distCss:
            src: ['webapp/emsite/workspace/css/**/*.css']
            dest: 'webapp/emsite/workspace/css/app.css'

    # configuration for compiling less files
    # app =>   grunt less:app
    less:
        app:
            expand: true
            cwd: 'webapp/emsite/workspace/less'
            src: '**/*.less'
            dest: 'webapp/emsite/workspace/css'
            ext: '.css'

    # configuration for minifying css files
    # flat =>   grunt cssmin:app
    cssmin:
        app:
            src: 'webapp/emsite/workspace/css/app.css'
            dest: 'webapp/emsite/workspace/css/app.min.css'

    # configuration for compiling index.html based off of production or dev environments
    # dev =>    grunt includeSource:dev
    # prod =>   grunt includeSource:prod
    includeSource:
        options:
            templates:
                html:
                    js: '<script src="{filePath}?v=<%= grunt.template.today("yyyymmddhhmmss") %>"></script>'
                    js_nocachebusting: '<script src="{filePath}"></script>'
                    css: '<link rel="stylesheet" type="text/css" href="{filePath}?v=<%= grunt.template.today("yyyymmddhhmmss") %>" />'
                    test: '<script src="{filePath}?v=<%= grunt.template.today("yyyymmddhhmmss") %>"></script>'
        dev:
            files:
                'Index.html': 'Index_template.html'
        prod:
            files:
                'Index.html': 'Index_template_prod.html'

    # configuration for re-compiling coffeescript files after they have been modified
    # grunt watch
    # the above command should be used after running the solution ('pressing play'). If we add watch to
    # the default taks, the build hangs and refused to start the server
    watch:
        scripts:
            files: '**/*.coffee',
            tasks: ['coffee'],
            options:
                spawn: false
        styles:
            files: '**/*.less'
            tasks: ['less'],
            options:
                spawn: false

  # load node package manager tasks
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-coffeelint'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-include-source'

  # register tasks
  # default => grunt
  # prod => grunt prod
  grunt.registerTask 'default', ['coffeelint', 'coffee', 'less', 'includeSource:dev']
  grunt.registerTask 'prod', ['coffee', 'less', 'concat', 'uglify', 'cssmin', 'includeSource:prod']
