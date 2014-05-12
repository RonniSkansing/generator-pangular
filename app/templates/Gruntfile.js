'use strict';

module.exports = function (grunt) {
  // autoload npm modules
  require('load-grunt-tasks')(grunt);

  // shows task times
  require('time-grunt')(grunt);

  grunt.initConfig({
    // config
    myApp: {
      modulesPath: 'frontend/src',
      app: 'frontend',
      dist: 'dist'
    },

    // watch for changes and do tasks
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['bowerInstall'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['<%= myApp.app %>/scripts/app.js',
                '<%= myApp.modulesPath %>/*/{,*/}*.js'],
        tasks: ['newer:jshint'],
        options: {
          event: ['changed'],
          livereload: true
        }
      },
      jsAddOrRemove: {
        files: ['<%= myApp.modulesPath %>/*/{,*/}*.js'],
        tasks: ['newer:jshint', 'includeSource:dev', 'bowerInstall', 'phpreload'],
        options: {
          event: ['added', 'deleted'],
          livereload: true
        }
      },
      less: {
        files: ['<%= myApp.modulesPath %>/*/{,*/}*.less'],
        tasks: ['less:dev','autoprefixer:dev'],
        options: {
          event: ['changed'],
          livereload: true
        }
      },
      lessAddOrRemove: {
        files: ['<%= myApp.modulesPath %>/*/{,*/}*.less'],
        tasks: ['includeSource:dev', 'bowerInstall', 'phpreload'],
        options: {
          event: ['added', 'deleted'],
          livereload: true
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      htmlIndex: {
        files: ['<%= myApp.app %>/index.tpl.html'],
        tasks: ['includeSource:dev', 'bowerInstall'],
        options: {
          livereload: true
        }
      }
    },

    // grunt-php server
    php: {
      dev: {
        options: {
          hostname: '127.0.0.1',
          base: 'frontend/',
          port: 8080
        }
      }
    },

    phpreload: {
      options: {
        script: '<script src="http://localhost:35729/livereload.js"></script>',
        filepath: '<%= myApp.app %>/index.html'
      }
    },
    phprmreload: {
      options: {
        script: '<script src="http://localhost:35729/livereload.js"></script>',
        filepath: '<%= myApp.app %>/index.html'
      }
    },

    // inject bower into index.html
    // this should be done after includeSource
    bowerInstall: {
      dev: {
        src: ['<%= myApp.app %>/index.html'],
        ignorePath: '<%= myApp.app %>/'
      }
    },

    // inject module js into index.html
    // and copy to real index.html file
    includeSource: {
      options: {
        basePath: '<%= myApp.app %>',
      },
      dev: {
        files: {
          '<%= myApp.app %>/index.html': '<%= myApp.app %>/index.tpl.html'
        }
      }
    },

    less: {
      dev: {
        files: {
          '<%= myApp.app %>/styles/components.css': '<%= myApp.modulesPath %>/*/{,*/}*.less'
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Add vendor prefixed style on less compiled files.
    autoprefixer: {
      options: {
        browsers: ['last 5 version']
      },
      dev: {
        files: [ {
          expand: true,
          cwd: '<%= myApp.app %>/styles/',
          src: '*.css',
          dest: '<%= myApp.app %>/styles/'
        }]
      }
    }
  });

  grunt.registerTask('serve', function (target) {
    // development
    grunt.task.run([
      'less:dev',
      'includeSource:dev',
      'bowerInstall:dev',
      'autoprefixer:dev',
      'phpreload',
      'php:dev',
      'watch'
    ]);
  });

  grunt.registerTask('default', [
    'serve'
  ]);
};