/**
 * Created by Maurice on 6/13/2015.
 */

'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var mainBowerFiles = require('main-bower-files');
var fs = require('fs');

module.exports = function (filter, opts, callback) {
    return through.obj(function (file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new PluginError('gulp-main-bower-files', 'Streams are not supported!'));
            return cb();
        }

        if (file.isBuffer()) {
            if (typeof filter === 'function') {
                callback = filter;
                opts = null;
                filter = null;
            } else if (typeof filter !== 'string' && Array.isArray(filter) === false) {
                if (typeof opts === 'function') {
                    callback = opts;
                }
                opts = filter;
                filter = null;
            } else if (typeof opts === 'function') {
                callback = opts;
                opts = null;
            }

            opts = opts || {};
            opts.filter = filter;
            opts.paths = opts.path || {};
            opts.paths.bowerJson = file.path;
            opts.paths.bowerDirectory = file.base += 'bower_components/';

            var fileNames = mainBowerFiles(opts, callback);

            fileNames.forEach(function (fileName) {
                var newFile = file.clone();
                newFile.path = fileName;
                newFile.contents = fs.readFileSync(newFile.path);
                this.push(newFile);
            }, this);
        }

        cb();
    });
};