/*global describe, it */
var expect = require('expect.js'),
    moduleify = require('../'),
    outputRe = /\s*module\.exports\s*=\s*([^;]+);?\s*/;

describe('moduleify({"angular.js": "angular"})', function() {
    var transform = moduleify({"angular.js": "angular"});
    it('ignores non-matching filenames', function() {
        var input = 'var foo = "blah";',
            output = null,
            stream = transform('bleh.js'),
            timesCalled = 0;
        stream.on('data', function(data) {
            output = data;
            timesCalled++;
        });
        stream.write(input);
        stream.end();
        expect(output).to.contain(input);
        expect(output).to.equal(input);
        expect(timesCalled).to.be(1);
    });
    it('converts matching files', function() {
        var input = 'var foo = "blah";',
            output = null,
            stream = transform('angular.js'),
            timesCalled = 0;
        stream.on('data', function(data) {
            output = data;
            timesCalled++;
        });
        stream.write(input);
        stream.end();
        expect(output).to.match(outputRe);
        expect(outputRe.exec(output)[1]).to.be('angular')
        expect(timesCalled).to.be(1);
    });
    it('converts matching files on Windows', function() {
        var input = 'var foo = "blah";',
            output = null,
            stream = transform('User\\foo\\angular.js'),
            timesCalled = 0;
        stream.on('data', function(data) {
            output = data;
            timesCalled++;
        });
        stream.write(input);
        stream.end();
        expect(output).to.match(outputRe);
        expect(outputRe.exec(output)[1]).to.be('angular')
        expect(timesCalled).to.be(1);
    });
});

describe('moduleify([["foo/angular.js", "angular"]])', function() {
    var transform = moduleify([["foo/angular.js", "angular"]]);
    it('ignores non-matching filenames', function() {
        var input = 'var foo = "blah";',
            output = null,
            stream = transform('bleh.js'),
            timesCalled = 0;
        stream.on('data', function(data) {
            output = data;
            timesCalled++;
        });
        stream.write(input);
        stream.end();
        expect(output).to.contain(input);
        expect(output).to.equal(input);
        expect(timesCalled).to.be(1);
    });
    it('converts matching files', function() {
        var input = 'var foo = "blah";',
            output = null,
            stream = transform('/home/foo/angular.js'),
            timesCalled = 0;
        stream.on('data', function(data) {
            output = data;
            timesCalled++;
        });
        stream.write(input);
        stream.end();
        expect(output).to.match(outputRe);
        expect(outputRe.exec(output)[1]).to.be('angular')
        expect(timesCalled).to.be(1);
    });
    it('converts matching files on Windows', function() {
        var input = 'var foo = "blah";',
            output = null,
            stream = transform('User\\foo\\angular.js'),
            timesCalled = 0;
        stream.on('data', function(data) {
            output = data;
            timesCalled++;
        });
        stream.write(input);
        stream.end();
        expect(output).to.match(outputRe);
        expect(outputRe.exec(output)[1]).to.be('angular')
        expect(timesCalled).to.be(1);
    });
});

describe('moduleify([[/foo\\/angular\\.js/, "angular"]])', function() {
    var transform = moduleify([[/foo\/angular\.js/, "angular"]]);
    it('ignores non-matching filenames', function() {
        var input = 'var foo = "blah";',
            output = null,
            stream = transform('bleh.js'),
            timesCalled = 0;
        stream.on('data', function(data) {
            output = data;
            timesCalled++;
        });
        stream.write(input);
        stream.end();
        expect(output).to.contain(input);
        expect(output).to.equal(input);
        expect(timesCalled).to.be(1);
    });
    it('converts matching files', function() {
        var input = 'var foo = "blah";',
            output = null,
            stream = transform('/home/foo/angular.js'),
            timesCalled = 0;
        stream.on('data', function(data) {
            output = data;
            timesCalled++;
        });
        stream.write(input);
        stream.end();
        expect(output).to.match(outputRe);
        expect(outputRe.exec(output)[1]).to.be('angular')
        expect(timesCalled).to.be(1);
    });
    it('converts matching files on Windows', function() {
        var input = 'var foo = "blah";',
            output = null,
            stream = transform('User\\foo\\angular.js'),
            timesCalled = 0;
        stream.on('data', function(data) {
            output = data;
            timesCalled++;
        });
        stream.write(input);
        stream.end();
        expect(output).to.match(outputRe);
        expect(outputRe.exec(output)[1]).to.be('angular')
        expect(timesCalled).to.be(1);
    });
});