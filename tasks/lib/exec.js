module.exports = function(command, grunt, done){
    var cp = require('child_process'),
        f = require('util').format;

    grunt.verbose.subhead(command);

    var childProcess = cp.exec(command, {}, function(){});

    childProcess.stdout.on('data', function (d) { grunt.log.write(d); });
    childProcess.stderr.on('data', function (d) { grunt.log.error(d); });

    childProcess.on('exit', function(code) {
        if (code !== 0) {
            grunt.log.error(f('Exited with code: %d.', code));
            return done(false);
        }

        grunt.verbose.ok(f('Exited with code: %d.', code));
        done();
    });
};
