module.exports = function(grunt){

    /*
     var optionsSample = {
         mountPoint: "/mnt/share", // on windows systems, this is a drive letter, on *nix it will be the mount point
         path: "//user:password@server/share",
         fileSystem: "smbfs", // e.g. smbfs, cifs etc.
         createMountPoint: true|false // if *nix, create the mount-point folder
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

        if(options.createMountPoint && process.platform !== 'win32'){
            grunt.verbose.writeln('creating directory: ' + options.mountPoint);
            grunt.file.mkdir(options.mountPoint);
        }

        exec(command.join(" "), grunt, done);
    });

    /*
     var optionsSample = {
        mountPoint: "/mnt/share", // on windows systems, this is a drive letter, on *nix it will be the mount point
        removeMountPoint: true|false // if *nix, delete the mount-point folder after unmounting
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

            if(options.removeMountPoint && process.platform !== 'win32'){
                grunt.verbose.writeln('deleting directory: ' + options.mountPoint);
                grunt.file.delete(options.mountPoint, { force: true });
            }

            done();
        });
    });
};