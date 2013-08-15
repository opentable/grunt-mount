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
        '*nix': {
            options: {
                mountPoint: "/mnt/share",
                path: "//server/share",
                fileSystem: "smbfs",
                createMountPoint: true,
                username: "someuser",
                password: "password"
            }
        },
        macos: {
            options: {
                mountPoint: "/mnt/share",
                path: "//someuser:password@server/share",
                fileSystem: "smbfs",
                createMountPoint: true
            }
        },
        windows: {
            options: {
                mountPoint: "X:",
                path: "\\\\server\\share",
                username: "someuser",
                password: "password"
            }
        }
    },
    unmount: {
      '*nix': {
          options: {
              mountPoint: "/mnt/share",
              removeMountPoint: true
          }
      },
      macos: {
          options: {
              mountPoint: "/mnt/share",
              removeMountPoint: true
          }
      },
      windows: {
          options: {
              mountPoint: "X:"
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
