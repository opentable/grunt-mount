var p = require('path'),


buildPath = function(options){
    var sep = p.sep,
        share = options.share,
        platform = process.platform,
        credentials = (platform === 'darwin' ? options.username + ":" + options.password + "@" : ""),
        bits;

    // allow the user to specify any kind of path: /path/to/share or \path\to\share
    if(share.folder.indexOf('/') > -1){
        bits = share.folder.split('/');
    }
    else {
        bits = share.folder.split('\\');
    }

    return sep + sep + p.normalize([
        credentials + share.host,
        bits.join(sep)
    ].join(sep));
};

module.exports.mount = function(options){

    var command = {
        darwin:[
            "mount",
            "-t " + options['*nix'].fileSystem,
            buildPath(options),
            options['*nix'].mountPoint
        ],
        linux: [
            "mount",
            "-t " + options['*nix'].fileSystem,
            buildPath(options),
            options['*nix'].mountPoint,
            options.username ? "-o user=" + options.username + ",pass=" + options.password : ""
        ],
        win32: [
            "net use",
            options.windows.driveLetter + ":",
            buildPath(options),
            options.password ? options.password : "",
            options.username ? "/user:" + options.username : ""
        ],
        // Todo:
        sunos: [],
        freebsd: []
    };

    return command[process.platform];
};

module.exports.unmount = function(options){
    var command = {
        darwin:[
            "umount",
            options['*nix'].mountPoint
        ],
        linux: [
            "umount",
            options['*nix'].mountPoint
        ],

        win32: [
            "net use",
            options.windows.driveLetter,
            "/delete"
        ],
        // Todo:
        sunos: [],
        freebsd: []
    };

    return command[process.platform];
};