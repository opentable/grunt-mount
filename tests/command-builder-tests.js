var commandBuilder = require('../tasks/lib/command-builder'),
    should = require('should'),
    util = require('util');


describe('command builder tests', function(){
    describe('mount', function(){

        var standardOptions = {
            windows: {
                driveLetter: "X"
            },
            '*nix':{
                fileSystem: "smbfs",
                mountPoint: "/mnt/share"
            },
            share:{
                host: "server.com",
                folder: "/path/to/share"
            },
            username: "someuser",
            password: "password"
        };

        describe('building the windows command', function(){
            it('should return the correct command', function(){
                var options = util._extend({}, standardOptions);
                var result = commandBuilder.mount(options, 'win32', '\\');
                result.should.eql('net use X: \\\\server.com\\path\\to\\share password /user:someuser');
            });

            it('should return the correct command when the path is unix-style', function(){
                var options = util._extend({}, standardOptions);
                options.share.folder = "/path/to/share";

                var result = commandBuilder.mount(options, 'win32', '\\');
                result.should.eql('net use X: \\\\server.com\\path\\to\\share password /user:someuser');
            });

            it('should return the correct command when the credentials aren\'t specified', function(){
                var options = util._extend({}, standardOptions);
                delete options.username;
                delete options.password;

                var result = commandBuilder.mount(options, 'win32', '\\');
                result.should.eql('net use X: \\\\server.com\\path\\to\\share');
            });
        });

        describe('building the mac os command', function(){
            it('should return the correct command', function(){
                var options = util._extend({}, standardOptions);
                var result = commandBuilder.mount(options, 'darwin', '/');
                result.should.eql('mount -t smbfs //someuser:password@server.com/path/to/share /mnt/share');
            });

            it('should return the correct command when the credentials aren\'t specified', function(){
                var options = util._extend({}, standardOptions);
                delete options.username;
                delete options.password;

                var result = commandBuilder.mount(options, 'darwin', '/');
                result.should.eql('mount -t smbfs //server.com/path/to/share /mnt/share');
            });
        });

        describe('building the linux command', function(){
            it('should return the correct command', function(){
                var options = util._extend({}, standardOptions);
                var result = commandBuilder.mount(options, 'linux', '/');
                result.should.eql('mount -t smbfs //server.com/path/to/share /mnt/share -o user=someuser,pass=password');
            });

            it('should return the correct command when the path is windows-style', function(){
                var options = util._extend({}, standardOptions);
                options.share.folder = "\\path\\to\\share";

                var result = commandBuilder.mount(options, 'linux', '/');
                result.should.eql('mount -t smbfs //server.com/path/to/share /mnt/share -o user=someuser,pass=password');
            });

            it('should return the correct command when the credentials aren\'t specified', function(){
                var options = util._extend({}, standardOptions);
                delete options.username;
                delete options.password;

                var result = commandBuilder.mount(options, 'linux', '/');
                result.should.eql('mount -t smbfs //server.com/path/to/share /mnt/share');
            });
        });
    });

    describe('unmount', function(){

        var standardOptions = {
            '*nix':{
                mountPoint: "/mnt/share"
            },
            windows: {
                driveLetter: "X"
            }
        }

        describe('building the windows command', function(){
            it('should return the correct command', function(){
                var result = commandBuilder.unmount(standardOptions, 'win32');

                result.should.eql('net use X: /delete');
            });
        });

        describe('building the mac os command', function(){
            it('should return the correct command', function(){
                var result = commandBuilder.unmount(standardOptions, 'darwin');

                result.should.eql('umount /mnt/share');
            });
        });

        describe('building the linux command', function(){
            it('should return the correct command', function(){
                var result = commandBuilder.unmount(standardOptions, 'linux');
                result.should.eql('umount /mnt/share');
            });
        });
    });
});