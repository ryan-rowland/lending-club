'use strict';

const eslint = require('gulp-eslint');
const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc-to-markdown');
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

gulp.task('docs', () => {
  return gulp.src(['lib/**/*.js'])
  .pipe(jsdoc())
  .pipe(rename(function (path) { path.extname = '.md' }))
  .pipe(gulp.dest('./docs'));
});
