# gulp-main-bower-files
================

[![Dependency Status](https://david-dm.org/mauricedb/gulp-main-bower-files.svg)](https://david-dm.org/mauricedb/gulp-main-bower-files)
[![Build Status](https://travis-ci.org/mauricedb/gulp-main-bower-files.svg?branch=master)](https://travis-ci.org/mauricedb/gulp-main-bower-files)

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
        .pipe(gulp.dest('./wwwroot/libs');
});
```

The parameters are passed on to [main-bower-files](https://www.npmjs.com/package/main-bower-files#usage). 