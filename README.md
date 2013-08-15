# grunt-mount [![Build Status](https://travis-ci.org/andyroyle/grunt-mount.png?branch=master)](https://travis-ci.org/andyroyle/grunt-mount) ![Dependencies](https://david-dm.org/andyroyle/grunt-mount.png)

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
        mountPoint: "/mnt/share", // on *nix systems this is a folder, on windows this should be a drive letter
        path: "//server/share", // the share you want to mount
        fileSystem: "smbfs", // equivalent to -t [smbfs|cifs|nfs] etc
        createMountPoint: true, // on *nix create the mount-point directory
        username: "someuser",
        password: "password"
      }
    }
  },
  unmount: {
    share: {
        options: {
            mountPoint: "/mnt/share",
            removeMountPoint: true  // on *nix, deletes the folder after unmounting
        }
    }
  }
});

  grunt.loadNpmTasks('grunt-mount');
```

# Mount task

Platform-specific examples:

___Linux___

```js
mount: {
  share: {
    options: {
      mountPoint: "/mnt/share",
      path: "//server/share",
      fileSystem: "smbfs",
      createMountPoint: true,
      username: "someuser",
      password: "password"
    }
  }
}
```

You can omit the username and password fields, and include the credentials in the path like so
`path: //user:password@server/share`


___Mac OS___

```js
mount: {
  share: {
    options: {
      mountPoint: "/mnt/share",
      path: "//user:password@server/share",
      fileSystem: "smbfs",
      createMountPoint: true
    }
  }
}
```

_Limitation:_ credentials *must* be specified in the path

___Windows___

```js

mount:{
  share: {
    options: {
      mountPoint: "X:",
      path: "\\\\server\\share",
      username: "someuser",
      password: "password"
    }
  }
}
```

_Limitation:_ Windows doesn't allow specifying credentials in the path, must use username and password

# Unmount task

Platform-specific examples

___Linux___

```js
mount: {
  share: {
    mountPoint: "/mnt/share",
    removeMountPoint: true
  }
}
```

___Mac OS___

```js
mount: {
  share: {
    mountPoint: "/mnt/share",
    removeMountPoint: true
  }
}
```

___Windows___

```js
mount: {
  share: {
    options: {
      mountPoint: "X:"
    }
  }
}
```