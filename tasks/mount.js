module.exports = function(grunt){
    var path = require('path'),
        fs = require('fs'),

        deleteMountPoint = function(folder){

        // need to fs.unlink directly on windows because
        // the grunt.file.delete method doesn't recognise symlinks!
        if(process.platform === 'win32'){
            fs.unlinkSync(folder);
        } else {
            grunt.file.delete(folder, {force: true});
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
        folder: "/path/on/server"  // can be /path/to/share or \path\to\share, will be normalised
      },
      mountPoint: "./share",       // path to the folder, can be path/to/folder or path\to\folder
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
            command = commandBuilder(options, process.platform, path.sep),
            done = this.async();

        grunt.verbose.writeflags(options, 'Options');

        if(grunt.file.exists(options.mountPoint)){
            grunt.log.warn('mount point already exists, deleting');
            deleteMountPoint(options.mountPoint);
        }

        if(process.platform !== 'win32'){
            grunt.file.mkdir(options.mountPoint, {force: true});
        }

        exec(command, grunt, done);
    });
};