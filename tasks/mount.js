module.exports = function(grunt){
    var path = require('path');

    var createMountPoint = function(mountPoint){
        if(process.platform === 'win32'){
            grunt.verbose.writeln('deleting directory: ' + mountPoint);
            grunt.file.delete(mountPoint, {force: true});
        }
        else{
            grunt.verbose.writeln('creating directory: ' + mountPoint);
            grunt.file.mkdir(mountPoint);
        }
    };


    /*
    var optionsSample = {
      windows: {
        driveLetter: "X"
      },
      '*nix': {
        // options common to linux, mac os
        fileSystem: "smbfs",
      },
      share: {
        host: "my.server.com",
        folder: "/path/to/share"  // can be /path/to/share or \path\to\share, will be normalised
      },
      mountPoint: "../share",     // relative path to the folder, can be ../path/to/folder or ..\path\to\folder
      username: "username",
      password: "password",
      createMountPoint: true      // create the mount point folder (existing folders will be overwritten)
    };
     */

    grunt.registerMultiTask('mount', 'mount a network share', function(){
        var commandBuilder = require('./lib/command-builder').mount,
            exec = require('./lib/exec'),
            options = this.options({
                createMountPoint: false
            }),
            command = commandBuilder(options, process.platform, path.sep),
            done = this.async();

        grunt.verbose.writeflags(options, 'Options');

        if(options.createMountPoint){
            createMountPoint(options.mountPoint);
        }

        exec(command, grunt, done);
    });

    /*
    var optionsSample = {
      windows: {
        driveLetter: "X"
      },
      mountPoint: "../share",
      removeMountPoint: [true|false]  // delete the mount-point folder after unmounting
    };
     */

    grunt.registerMultiTask('unmount', 'unmount a network share', function(){
        var commandBuilder = require('./lib/command-builder').unmount,
            exec = require('./lib/exec'),
            options = this.options({
                removeMountPoint: false
            }),
            command = commandBuilder(options, process.platform),
            done = this.async();

        grunt.verbose.writeflags(options, 'Options');

        exec(command, grunt, function(){

            if(options.removeMountPoint){
                grunt.file.delete(options.mountPoint, { force: true });
            }

            done();
        });
    });
};