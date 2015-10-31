# gulp-main-bower-files
================

[![npm version](https://img.shields.io/npm/v/gulp-main-bower-files.svg?style=flat-square)](https://www.npmjs.org/package/gulp-main-bower-files)
[![npm downloads](https://img.shields.io/npm/dm/gulp-main-bower-files.svg?style=flat-square)](http://npm-stat.com/charts.html?package=gulp-main-bower-files&from=2015-09-01)
[![Dependency Status](https://david-dm.org/mauricedb/gulp-main-bower-files.svg)](https://david-dm.org/mauricedb/gulp-main-bower-files)
[![Build Status](https://travis-ci.org/mauricedb/gulp-main-bower-files.svg?branch=master)](https://travis-ci.org/mauricedb/gulp-main-bower-files)
[![codecov.io](http://codecov.io/github/mauricedb/gulp-main-bower-files/coverage.svg?branch=master)](http://codecov.io/github/mauricedb/gulp-main-bower-files?branch=master)

Use [main-bower-files](https://www.npmjs.com/package/main-bower-files) in a more gulp like way. 

Use the bower.json file as the source and it will create a vinyl stream for each of the files main-bower-files return when parsing the bower.json.


## Installation

```bash
$ npm install gulp-main-bower-files --save-dev
```
## Usage

```javascript
var gulp = require('gulp');
var mainBowerFiles = require('gulp-main-bower-files');

gulp.task('main-bower-files', function() {
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles([[filter, ]options][, callback]))
        .pipe(gulp.dest('./wwwroot/libs'));
});
```

The parameters are passed on to [main-bower-files](https://www.npmjs.com/package/main-bower-files#usage). 


### Using the Gulp pipeline to minify the resulting JavaScript

The following example produces minified output using [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)

```bash
$ npm install --save-dev gulp-uglify
```

```javascript
var gulp = require('gulp');
var mainBowerFiles = require('gulp-main-bower-files');
var uglify = require('gulp-uglify');

gulp.task('uglify', function(){
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles( ))
        .pipe(uglify())
        .pipe(gulp.dest('wwwroot/libs'));
});
```

### Using the Gulp pipeline to use Bootstrap with jQuery and minify the resulting JavaScript

```javascript
var gulp = require('gulp');
var mainBowerFiles = require('gulp-main-bower-files');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gulpFilter = require('gulp-filter');

gulp.task('main-bower-files', function() {
    var filterJS = gulpFilter('**/*.js', { restore: true });
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles({
            overrides: {
                bootstrap: {
                    main: [
                        './dist/js/bootstrap.js',
                        './dist/css/*.min.*',
                        './dist/fonts/*.*'
                    ]
                }
            }
        }))
        .pipe(filterJS)
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(filterJS.restore)
        .pipe(gulp.dest('./wwwroot/libs'));
});
```
