


module.exports.mount = function(options){

    var command = {
        darwin:[
            "mount",
            "-t " + options.fileSystem,
            options.path,
            options.mountPoint
        ],
        freebsd: [],
        linux: [
            "mount",
            "-t " + options.fileSystem,
            options.path,
            options.mountPoint,
            "-o user=" + options.username + ",pass=" + options.password
        ],
        sunos: [
            "mount",
            "-F" + options.fileSystem,
            options.path,
            options.mountPoint
        ],
        win32: [
            "net use",
            options.mountPoint,
            options.path,
            options.password,
            "/user:" + options.username
        ]
    };

    return command[process.platform];
};

module.exports.unmount = function(options){
    var command = {
        darwin:[
            "umount",
            options.mountPoint
        ],
        freebsd: [],
        linux: [
            "umount",
            options.mountPoint
        ],
        sunos: [
            "umount",
            options.mountPoint
        ],
        win32: [
            "net use",
            options.mountPoint,
            "/delete"
        ]
    };

    return command[process.platform];
};