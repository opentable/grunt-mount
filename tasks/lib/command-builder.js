var pathNormaliser = require('./path-normaliser'),

buildPath = function(options, platform, sep){
    var share = options.share,
        credentials = (platform === 'darwin' && options.username ? options.username + ":" + options.password + "@" : ""),
        folder = pathNormaliser(share.folder, sep);

    if(folder.charAt(0) === sep){
        folder = folder.substring(1);
    }

    return [
            sep,
            credentials + share.host,
            folder
        ].join(sep);
},

mklink = function(driveLetter, mountPoint){
    var command = [
        "mklink",
        "/d",
        mountPoint,
        driveLetter + ":\\"
    ];

    return command.join(" ").trim();
};

module.exports.mount = function(options, platform, sep){
    var path = buildPath(options, platform, sep),
        mountPoint = pathNormaliser(options.mountPoint, sep);

    var command = {
        darwin:[
            "mount",
            "-t " + options['*nix'].fileSystem,
            path,
            mountPoint
        ],
        linux: [
            "mount",
            "-t " + options['*nix'].fileSystem,
            path,
            mountPoint,
            options.username ? "-o user=" + options.username + ",pass=" + options.password : ""
        ],
        win32: [
            "net use",
            options.windows.driveLetter + ":",
            path,
            options.password ? options.password : "",
            options.username ? "/user:" + options.username : "",
            "&&",
            mklink(options.windows.driveLetter, mountPoint)
        ],
        // Todo:
        sunos: [],
        freebsd: []
    };

    return command[platform].filter(function(v){ return v !== '';}).join(" ").trim();
};

module.exports.unmount = function(options, platform, sep){
    var mountPoint = pathNormaliser(options.mountPoint, sep);

    var command = {
        darwin:[
            "umount",
            mountPoint
        ],
        linux: [
            "umount",
            mountPoint
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