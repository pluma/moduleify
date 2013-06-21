/*! moduleify 0.1.0 Copyright (c) 2013 Alan Plum. MIT licensed. */
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
        var data = '';
        function write(buf) {
            data += buf;
        }
        function end() {
            data += '\nmodule.exports = ' + globalname + ';';
            this.queue(data);
            this.queue(null);
        }
        return through(write, end);
    };
}

module.exports = moduleify;