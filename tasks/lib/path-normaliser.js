module.exports = function(path, sep){
    var bits,
        hasLeading;

    // allow the user to specify any kind of path: /path/to/share or \path\to\share
    if(path.indexOf('/') > -1){
        hasLeading = path.charAt(0) === '/';
        bits = path.split('/');
    }
    else {
        hasLeading = path.charAt(0) === '\\';
        bits = path.split('\\');
    }

    bits = bits.filter(function(v){ return v !== '';});

    return (hasLeading ? sep : '') + bits.join(sep);
};
