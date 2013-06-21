# Synopsis

**shimify** is a [browserify](https://github.com/substack/node-browserify) transform for shimming globals-polluting libraries.

[![Build Status](https://travis-ci.org/pluma/shimify.png?branch=master)](https://travis-ci.org/pluma/shimify) [![NPM version](https://badge.fury.io/js/shimify.png)](http://badge.fury.io/js/shimify) [![Dependencies](https://david-dm.org/pluma/shimify.png)](https://david-dm.org/pluma/shimify)

# Install

## Node.js

### With NPM

```sh
npm install shimify
```

### From source

```sh
git clone https://github.com/pluma/shimify.git
cd shimify
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
    shimify = require('shimify'),
    b = browserify();

b.transform(shimify({
    "vendor/angular.js": "angular"
}));
b.bundle().pipe(require('fs').createWriteStream('bundle.js'));
```

# API

## shimify(rules):transform

Creates a browserify transform that will append `module.exports` statements
to all matching files.

If `rules` is an object, each filename will be checked against its keys.
If one of the keys is contained in the filename, the global with the name
matching the value the key is mapped to will be exported.

```javscript
shimify({
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
shimify([
    ["vendor/angular", "angular"],
    [/vendor\/jquery(-\d+(\.\d+)+)?\.js$/, "$"]
]);
```

# License

The MIT/Expat license.
