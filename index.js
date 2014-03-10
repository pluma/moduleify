/*! moduleify 0.2.2 Original author Alan Plum <me@pluma.io>. Released into the Public Domain under the UNLICENSE. @preserve */
var through = require('through');
var sep = /\\/g;

function moduleify(aliases) {
    var rules = Array.isArray(aliases) ? aliases : Object.keys(aliases).map(function(key) {
        return [key, aliases[key]];
    });
    return function(file) {
        var filename = file.replace(sep, '/'),
            rule, globalname;
        for (var i = 0; i < rules.length; i++) {
            rule = rules[i][0];
            if (
                (rule instanceof RegExp && rule.test(filename)) ||
                (typeof rule === 'string' && ~filename.indexOf(rule))
            ) {
                globalname = rules[i][1];
                break;
            }
        }
        if (!globalname) {
            return through();
        }
        var data = ';(function() {\n';
        function write(buf) {
            data += buf;
        }
        function end() {
            data += '\n}).call(window);';
            data += '\nmodule.exports = window["' + globalname + '"];';
            this.queue(data);
            this.queue(null);
        }
        return through(write, end);
    };
}

module.exports = moduleify;
