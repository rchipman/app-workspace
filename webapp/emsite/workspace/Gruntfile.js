module.exports = function(grunt) {
  ({
    pkg: grunt.file.readJSON('package.json')
  });
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-include-source');
  grunt.initConfig({
    watch: {
      coffee: {
        files: '**/*.coffee',
        tasks: ['coffee']
      },
      less: {
        files: '**/*.less',
        tasks: ['less']
      }
    },
    options: {
      livereload: true,
      spawn: false
    },
    coffee: {
      options: {
        sourceMap: false,
        bare: true,
        force: true
      },
      dev: {
        expand: true,
        cwd: './coffee/',
        src: '**/*.coffee',
        dest: './compiled/js/',
        ext: '.js'
      }
    },
    less: {
      dev: {
        expand: true,
        cwd: './less/',
        src: '**/*.less',
        dest: './compiled/css/',
        ext: '.css'
      }
    },
    includeSource: {
      options: {
        templates: {
          html: {
            js: '<script src="{filePath}?v=<%= grunt.template.today("yyyymmddhhmmss") %>"></script>',
            js_nocachebusting: '<script src="{filePath}"></script>',
            css: '<link rel="stylesheet" type="text/css" href="{filePath}?v=<%= grunt.template.today("yyyymmddhhmmss") %>" />'
          }
        }
      },
      dev: {
        files: {
          'Index.html': 'Index_template.html'
        }
      }
    }
  });
  grunt.registerTask('default', ['coffee', 'less', 'watch']);
  return true;
};
