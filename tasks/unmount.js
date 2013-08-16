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
     mountPoint: "./share"
     };
     */

    grunt.registerMultiTask('unmount', 'unmount a network share', function(){
        var commandBuilder = require('./lib/command-builder').unmount,
            exec = require('./lib/exec'),
            options = this.options({
                removeMountPoint: false
            }),
            command = commandBuilder(options, process.platform, path.sep),
            done = this.async();

        grunt.verbose.writeflags(options, 'Options');

        exec(command, grunt, function(){
            grunt.verbose.writeln('deleting folder: ' + options.mountPoint);
            deleteMountPoint(options.mountPoint);
            done();
        });
    });
};
