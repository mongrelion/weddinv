module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg    : grunt.file.readJSON('package.json'),
    concat : {
      js : {
        src : [
          'assets/js/vendor/lodash.js',
          'assets/js/vendor/angular.js',
          'assets/js/vendor/*.js',
          'assets/js/app/weddinv.js',
          'assets/js/app/**/*.js'
        ],
        dest : 'public/js/application.js'
      },
      css : {
        src : [
          'assets/css/vendor/bootstrap.css',
          'assets/css/vendor/flatui.css',
          'assets/css/*.css'
        ],
        dest : 'public/css/application.css'
      }
    },
    jshint : {
      gruntfile        : ['Gruntfile.js'],
      application      : ['assets/js/app/**/*.js']
    },
    watch : {
      gruntfile : {
        files : 'Gruntfile.js',
        tasks : ['jshint:gruntfile']
      },
      js : {
        files : 'assets/js/app/**/*.js',
        tasks : ['jshint:application', 'concat:js']
      },
      css : {
        files : 'assets/css/**/*.css',
        tasks : ['concat:css']
      }
    }
  });

  /* Load Plugins */
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  /* Default Tasks */
  grunt.registerTask('default', ['concat', 'watch']);
};
