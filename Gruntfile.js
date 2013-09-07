module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg    : grunt.file.readJSON('package.json'),
    concat : {
      js : {
        src : [
          'app/assets/js/vendor/angular.js',
          'app/assets/js/vendor/*.js',
          'app/assets/js/app/weddinv.js',
          'app/assets/js/app/**/*.js'
        ],
        dest : 'public/js/application.js'
      },
      css : {
        src : [
          'app/assets/css/vendor/bootstrap.css',
          'app/assets/css/vendor/flatui.css',
          'app/assets/css/*.css'
        ],
        dest : 'public/css/application.css'
      }
    },
    jshint : {
      gruntfile        : ['Gruntfile.js'],
      application      : ['app/assets/js/app/**/*.js']
    },
    watch : {
      gruntfile : {
        files : 'Gruntfile.js',
        tasks : ['jshint:gruntfile']
      },
      js : {
        files : 'app/assets/js/app/**/*.js',
        tasks : ['jshint:application', 'concat:js']
      },
      css : {
        files : 'app/assets/css/**/*.css',
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
