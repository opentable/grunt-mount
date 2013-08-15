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

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadTasks('tasks');
  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('default', ['jshint']);
};
