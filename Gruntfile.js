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
                mountPoint: "../JAWS",
                path: "//jaws.otcorp.opentable.com/dev_builds/web/RestProfile",
                fileSystem: "smbfs",
                createMountPoint: true,
                username: "build",
                password: "0tengdeploy"
            }
        }
    },
    unmount: {
      jaws: {
          options: {
              mountPoint: "../JAWS"
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
