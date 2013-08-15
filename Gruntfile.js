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
            mountPoint: "/mnt/share",
            fileSystem: "smbfs",
            createMountPoint: true
          },
          share: {
            host: "my.server.com",
            folder: "/path/to/share"
          },
          username: "someuser",
          password: "password"
        }
      }
    },
    unmount: {
      share: {
        options: {
          windows: {
              driveLetter: "X"
          },
          '*nix': {
              mountPoint: "/mnt/share",
              removeMountPoint: true
          }
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
