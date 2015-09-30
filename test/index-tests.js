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

    describe('without a bowerrc file', function () {
        describe('without a bower file', function () {
            it('does not fail', function (done) {
                gulp.src(__dirname + '/no-bowerrc/not-there.json')
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

            it('can process multiple dependencies via a callback function', function (done) {
                gulp.src(__dirname + '/no-bowerrc/bower-simple-multi.json')
                    .pipe(mainBowerFiles(function (err, files) {
                        assert.equal(err, null);
                        assert.equal(files.length, 3);
                    }))
                    .pipe(streamAssert.length(3))
                    .pipe(streamAssert.end(done));
            });

            it('can process multiple dependencies with includeSelf', function (done) {
                gulp.src(__dirname + '/no-bowerrc/bower-simple-multi.json')
                    .pipe(mainBowerFiles({includeSelf: true}))
                    .pipe(streamAssert.length(4))
                    .pipe(streamAssert.end(done));
            });

            it('can override main files with filter with a callback', function (done) {
                gulp.src(__dirname + '/no-bowerrc/bower-simple-multi.json')
                    .pipe(mainBowerFiles('**/*.*', function (err, files) {
                        assert.equal(err, null);
                        assert.equal(files.length, 3);
                    }))
                    .pipe(streamAssert.length(3))
                    .pipe(streamAssert.end(done));
            });

            it('can override main files with filter', function (done) {
                gulp.src(__dirname + '/no-bowerrc/bower-simple-multi.json')
                    .pipe(mainBowerFiles('**/*.*', {
                        overrides: {
                            multi: {
                                main: ['*.js', '*.css']
                            }
                        }
                    }))
                    .pipe(streamAssert.length(4))
                    .pipe(streamAssert.end(done));
            });

            it('can load main files with callback function', function (done) {
                gulp.src(__dirname + '/no-bowerrc/bower-simple-multi.json')
                    .pipe(mainBowerFiles({
                        overrides: {
                            multi: {
                                main: ['*.js', '*.css']
                            }
                        }
                    }, function(err, files){
                        assert.equal(err, null);
                        assert.equal(files.length, 4);
                    }))
                    .pipe(streamAssert.length(4))
                    .pipe(streamAssert.end(done));
            });

            it('can override main files without filter', function (done) {
                gulp.src(__dirname + '/no-bowerrc/bower-simple-multi.json')
                    .pipe(mainBowerFiles({
                        overrides: {
                            multi: {
                                main: ['*.js', '*.css']
                            }
                        }
                    }))
                    .pipe(streamAssert.length(4))
                    .pipe(streamAssert.end(done));
            });
        });
    });


    describe('with a bowerrc file', function () {
        describe('without a bower file', function () {
            it('does not fail', function (done) {
                gulp.src(__dirname + '/with-bowerrc/not-there.json')
                    .pipe(mainBowerFiles())
                    .pipe(streamAssert.length(0))
                    .pipe(streamAssert.end(done));
            });
        });

        describe('with a bower file', function () {

            it('can process a single dependency', function (done) {
                gulp.src(__dirname + '/with-bowerrc/bower-simple.json')
                    .pipe(mainBowerFiles())
                    .pipe(streamAssert.length(1))
                    .pipe(streamAssert.end(done));
            });

            it('can process multiple dependencies', function (done) {
                gulp.src(__dirname + '/with-bowerrc/bower-simple-multi.json')
                    .pipe(mainBowerFiles())
                    .pipe(streamAssert.length(3))
                    .pipe(streamAssert.end(done));
            });

            it('can override main files with filter', function (done) {
                gulp.src(__dirname + '/with-bowerrc/bower-simple-multi.json')
                    .pipe(mainBowerFiles('**/*.*', {
                        overrides: {
                            multi: {
                                main: ['*.js', '*.css']
                            }
                        }
                    }))
                    .pipe(streamAssert.length(4))
                    .pipe(streamAssert.end(done));
            });

            it('can override main files without filter', function (done) {
                gulp.src(__dirname + '/with-bowerrc/bower-simple-multi.json')
                    .pipe(mainBowerFiles({
                        overrides: {
                            multi: {
                                main: ['*.js', '*.css']
                            }
                        }
                    }))
                    .pipe(streamAssert.length(4))
                    .pipe(streamAssert.end(done));
            });
        });
    });

});
