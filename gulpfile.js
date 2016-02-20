'use strict';

const eslint = require('gulp-eslint');
const gulp = require('gulp');
//const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const rename = require('gulp-rename');

gulp.task('test', () => {
  return gulp.src('./test')
    .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('lint', () => {
  return gulp.src(['./lib/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

