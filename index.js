/**
 * Created by Maurice on 6/13/2015.
 */

'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var mainBowerFiles = require('main-bower-files');

module.exports = function () {
    return through.obj(function (file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new PluginError('gulp-main-bower-files', 'Streams are not supported!'));
            return cb();
        }

        if (file.isBuffer()) {
            var fileNames = mainBowerFiles();

            fileNames.forEach(function (fileName) {
                var newFile = file.clone();
                newFile.path = fileName;
                this.push(newFile);
            }, this);
        }

        cb();
    });
};