# grunt-mount [![Build Status](https://travis-ci.org/andyroyle/grunt-mount.png?branch=master)](https://travis-ci.org/andyroyle/grunt-mount) [![NPM version](https://badge.fury.io/js/grunt-mount.png)](http://badge.fury.io/js/grunt-mount) ![Dependencies](https://david-dm.org/andyroyle/grunt-mount.png)

Grunt task to mount/unmount a network share

Provides two tasks: mount and unmount.

# Installation

```js
npm install --save-dev grunt-mount
```

# Configuration

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
          fileSystem: "smbfs",          // equivalent to 'mount -t [smbfs|cifs|nfs]'
        },
        share: {
          host: "my.server.com",
          folder: "/path/to/folder"     // paths can be windows or *nix style (will be normalised)
        },
        mountPoint: "../share",         // relative path to mount the share (can be windows or unix style)
        username: "someuser",
        password: "password",
        createMountPoint: true          // create the mount-point directory (existing folder will be overwritten)
      }
    }
  },
  unmount: {
    share: {
        options: {
            windows:{                    // windows specific options
              driveLetter: "X"
            },
            mountPoint: "../share",
            removeMountPoint: true       // deletes the folder after unmounting
        }
    }
  }
});

grunt.loadNpmTasks('grunt-mount');
```

# Limitations:

- Only works for Linux, MacOS and Windows (FreeBSD and SunOS coming)
- Must specify a drive letter for Windows
- MountPoint must be relative path in order for Windows compatibility
