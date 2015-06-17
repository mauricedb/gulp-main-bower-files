/**
 * Created by Maurice on 6/17/2015.
 */

'use strict';

var gulp = require('gulp');
var mainBowerFiles = require('../index');
var streamAssert = require('stream-assert');
var assert = require("assert");

describe('gulp-main-bower-files', function () {
    it('is a function', function () {
        assert.equal(typeof mainBowerFiles, 'function');
    });

    describe('without a bower file', function () {
        it('does not fail', function (done) {
            gulp.src(__dirname + '/not-there.json')
                .pipe(mainBowerFiles())
                .pipe(streamAssert.length(0))
                .pipe(streamAssert.end(done));
        });
    });

    describe('with a bower file', function () {

        it('can process a single dependency', function (done) {
            gulp.src(__dirname + '/no-bowerrc/bower-simple.json')
                .pipe(mainBowerFiles())
                .pipe(streamAssert.length(1))
                .pipe(streamAssert.end(done));
        });

        it('can process multiple dependencies', function (done) {
            gulp.src(__dirname + '/no-bowerrc/bower-simple-multi.json')
                .pipe(mainBowerFiles())
                .pipe(streamAssert.length(3))
                .pipe(streamAssert.end(done));
        });
    });
});
