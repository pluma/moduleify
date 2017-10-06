**NOTE:** This package is no longer being maintained. If you are interested in taking over as maintainer or are interested in the npm package name, get in touch by creating an issue.

# Synopsis

**moduleify** is a [browserify](https://github.com/substack/node-browserify) transform for shimming globals-polluting libraries.

[![stability 3 - stable](http://b.repl.ca/v1/stability-3_--_stable-yellowgreen.png)
](http://nodejs.org/api/documentation.html#documentation_stability_index) [![license - Unlicense](http://b.repl.ca/v1/license-Unlicense-lightgrey.png)](http://unlicense.org/) [![Flattr this](https://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=pluma&url=https://github.com/pluma/moduleify)

[![Build Status](https://travis-ci.org/pluma/moduleify.png?branch=master)](https://travis-ci.org/pluma/moduleify) [![Coverage Status](https://coveralls.io/repos/pluma/moduleify/badge.png?branch=master)](https://coveralls.io/r/pluma/moduleify?branch=master) [![Dependencies](https://david-dm.org/pluma/moduleify.png?theme=shields.io)](https://david-dm.org/pluma/moduleify)

[![NPM status](https://nodei.co/npm/moduleify.png?compact=true)](https://npmjs.org/package/moduleify)

# Install

## Node.js

### With NPM

```sh
npm install moduleify
```

### From source

```sh
git clone https://github.com/pluma/moduleify.git
cd moduleify
npm install
make test
```

# Basic usage example

## example/vendor/angular.js

```javascript
angular = {awesome: true};
// No CommonJS export, just a global
```

## example/app.js

```javascript
var ng = require('./vendor/angular');
console.log(ng); // {awesome: true}
```

## Usage

```javascript
var browserify = require('browserify'),
    moduleify = require('moduleify'),
    b = browserify();

b.transform(moduleify({
    "vendor/angular.js": "angular"
}));
b.add('./app.js');
b.bundle().pipe(require('fs').createWriteStream('bundle.js'));
```

# API

## moduleify(rules):transform

Creates a browserify transform that will append `module.exports` statements
to all matching files.

If `rules` is an object, each filename will be checked against its keys.
If one of the keys is contained in the filename, the global with the name
matching the value the key is mapped to will be exported.

```javscript
moduleify({
    "vendor/angular.js": "angular",
    "jquery": "$"
});
```

Alternatively `rules` can be an array containing tuples of paths and names.
Each filename will be checked against each path. The path can either be
a string to be found in the filename or a regular expression to test against.

In either case path separators in the filename will be converted to slashes
before testing for matches.

```javascript
moduleify([
    ["vendor/angular", "angular"],
    [/vendor\/jquery(-\d+(\.\d+)+)?\.js$/, "$"]
]);
```

# Unlicense

This is free and unencumbered public domain software. For more information, see http://unlicense.org/ or the accompanying [UNLICENSE](https://github.com/pluma/moduleify/blob/master/UNLICENSE) file.
