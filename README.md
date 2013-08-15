# grunt-mount [![Build Status](https://travis-ci.org/andyroyle/grunt-mount.png?branch=master)](https://travis-ci.org/andyroyle/grunt-mount) [![NPM version](https://badge.fury.io/js/grunt-mount.png)](http://badge.fury.io/js/grunt-mount) ![Dependencies](https://david-dm.org/andyroyle/grunt-mount.png)

Grunt task to mount/unmount a network share

Provides two tasks: mount and unmount:

# Basic config

```js
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
      options: {
        windows: {                      // windows specific options
          driveLetter: "X"
        },
        '*nix': {                       // *nix specific options
          mountPoint: "/mnt/share",     // can be relative or absolute
          fileSystem: "smbfs",          // equivalent to 'mount -t [smbfs|cifs|nfs]'
          createMountPoint: true        // create the mount-point directory if it doesn't exist
        },
        share: {
          host: "my.server.com",
          folder: "/path/to/folder"     // paths can be windows or *nix style (will be normalised)
        },
        username: "someuser",
        password: "password"
      }
    }
  },
  unmount: {
    share: {
        options: {
            windows:{                    // windows specific options
              driveLetter: "X"
            },
            '*nix':{                     // unix specific options
              mountPoint: "/mnt/share",
              removeMountPoint: true     // deletes the folder after unmounting
            }
        }
    }
  }
});

  grunt.loadNpmTasks('grunt-mount');
```

Limitations:

- only works for Linux, MacOS and Windows (FreeBSD and SunOS coming)
- Must specify a drive letter for Windows
