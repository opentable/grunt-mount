module.exports = function(grunt){

    /*
    var optionsSample = {
      windows: {
        driveLetter: "X"
      },
      '*nix': {
        // options common to linux, mac os
        mountPoint: "/mnt/share",
        fileSystem: "smbfs",
        createMountPoint: true // create the mount point folder
      },
      share: {
        host: "my.server.com",
        folder: "/path/to/share"  // can be /path/to/share or \path\to\share, will be normalised
      },
      username: "username",
      password: "password"
    };
     */

    grunt.registerMultiTask('mount', 'mount a network share', function(){
        var commandBuilder = require('./lib/command-builder').mount,
            exec = require('./lib/exec'),
            options = this.options({
                createMountPoint: false
            }),
            command = commandBuilder(options),
            done = this.async();

        grunt.verbose.writeflags(options, 'Options');

        if(options['*nix'].createMountPoint && process.platform !== 'win32'){
            grunt.verbose.writeln('creating directory: ' + options['*nix'].mountPoint);
            grunt.file.mkdir(options['*nix'].mountPoint);
        }

        exec(command.join(" "), grunt, done);
    });

    /*
    var optionsSample = {
      windows: {
        driveLetter: "X"
      },
      '*nux': {
        mountPoint: "/mnt/share",
        removeMountPoint: [true|false] // if *nix, delete the mount-point folder after unmounting
      }
    };
     */

    grunt.registerMultiTask('unmount', 'unmount a network share', function(){
        var commandBuilder = require('./lib/command-builder').unmount,
            exec = require('./lib/exec'),
            options = this.options({
                removeMountPoint: false
            }),
            command = commandBuilder(options),
            done = this.async();

        grunt.verbose.writeflags(options, 'Options');

        exec(command.join(" "), grunt, function(){

            if(options['*nix'].removeMountPoint && process.platform !== 'win32'){
                grunt.file.delete(options['*nix'].mountPoint, { force: true });
            }

            done();
        });
    });
};