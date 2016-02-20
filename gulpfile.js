'use strict';

const eslint = require('gulp-eslint');
const gulp = require('gulp');
//const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');

gulp.task('test', () => {
  gulp.src('./test')
    .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('lint', () => {
  gulp.src(['./lib/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
