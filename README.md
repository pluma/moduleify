# Synopsis

**moduleify** is a [browserify](https://github.com/substack/node-browserify) transform for shimming globals-polluting libraries.

[![Build Status](https://travis-ci.org/pluma/moduleify.png?branch=master)](https://travis-ci.org/pluma/moduleify) [![NPM version](https://badge.fury.io/js/moduleify.png)](http://badge.fury.io/js/moduleify) [![Dependencies](https://david-dm.org/pluma/moduleify.png)](https://david-dm.org/pluma/moduleify)

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