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
        jaws: {
            options: {
                mountPoint: "/mnt/share",
                path: "//user:pass@myserver/share",
                fileSystem: "smbfs",
                createMountPoint: true
            }
        }
    },
    unmount: {
      jaws: {
          options: {
              mountPoint: "/mnt/share",
              removeMountPoint: true
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
