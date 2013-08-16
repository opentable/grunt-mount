module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    mochaTest:{
      options: {
        reporter: 'spec'
      },
      unitTests:{
        src: ['tests/**/*.js']
      }
    },
    mount: {
      share: {
        options:{
          windows: {
            driveLetter: "X"
          },
          '*nix': {
            fileSystem: "smbfs"
          },
          share: {
            host: "my.server.com",
            folder: "/path/to/share"
          },
          mountPoint: "../share",
          username: "someuser",
          password: "password",
          createMountPoint: true
        }
      }
    },
    unmount: {
      share: {
        options: {
          windows: {
              driveLetter: "X"
          },
          mountPoint: "../share",
          removeMountPoint: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadTasks('tasks');
  grunt.registerTask('test', ['jshint', 'mochaTest']);
  grunt.registerTask('default', ['jshint', 'mochaTest']);
};
