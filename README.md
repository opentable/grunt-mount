# grunt-mount [![Build Status](https://travis-ci.org/opentable/grunt-mount.png?branch=master)](https://travis-ci.org/opentable/grunt-mount) [![NPM version](https://badge.fury.io/js/grunt-mount.png)](http://badge.fury.io/js/grunt-mount) ![Dependencies](https://david-dm.org/opentable/grunt-mount.png)

Grunt task to mount/unmount a network share

Provides two tasks: mount and unmount.

# Installation

```js
npm install --save-dev grunt-mount
```

# Configuration

```js
grunt.initConfig({
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
          folder: "/path/on/server"     // paths can be windows or *nix style (will be normalised)
        },
        mountPoint: "./share",          // path to mount the share (can be windows or unix style)
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
        mountPoint: "./share"
      }
    }
  }
});

grunt.loadNpmTasks('grunt-mount');
```

On *nix systems, the share will be mounted at the specified mount-point. On Windows, the share will be mounted on the specified drive letter, and a symlink will be created at the mount-point.

# Limitations:

- Only works for Linux, MacOS and Windows (FreeBSD and SunOS coming)
- Must specify a drive letter for Windows
- MountPoint must be relative path in order for Windows compatibility
