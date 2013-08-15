var p = require('path'),

buildPath = function(options, platform, sep){
    var share = options.share,
        credentials = (platform === 'darwin' && options.username ? options.username + ":" + options.password + "@" : ""),
        bits;

    // allow the user to specify any kind of path: /path/to/share or \path\to\share
    if(share.folder.indexOf('/') > -1){
        bits = share.folder.split('/');
    }
    else {
        bits = share.folder.split('\\');
    }

    bits = bits.filter(function(v){ return v !== '';});

    return sep + sep + [
            credentials + share.host,
            bits.join(sep)
        ].join(sep);
};

module.exports.mount = function(options, platform, sep){
    var path = buildPath(options, platform, sep);

    var command = {
        darwin:[
            "mount",
            "-t " + options['*nix'].fileSystem,
            path,
            options['*nix'].mountPoint
        ],
        linux: [
            "mount",
            "-t " + options['*nix'].fileSystem,
            path,
            options['*nix'].mountPoint,
            options.username ? "-o user=" + options.username + ",pass=" + options.password : ""
        ],
        win32: [
            "net use",
            options.windows.driveLetter + ":",
            path,
            options.password ? options.password : "",
            options.username ? "/user:" + options.username : ""
        ],
        // Todo:
        sunos: [],
        freebsd: []
    };

    return command[platform].join(" ").trim();
};

module.exports.unmount = function(options, platform){
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
            options.windows.driveLetter + ":",
            "/delete"
        ],
        // Todo:
        sunos: [],
        freebsd: []
    };

    return command[platform].join(" ").trim();
};