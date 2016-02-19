'use strict';

const gulp = require('gulp');
//const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');

gulp.task('test', () => gulp.src('./test').pipe(mocha({ reporter: 'spec' })));
