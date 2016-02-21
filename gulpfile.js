'use strict';

const concat = require('gulp-concat');
const deleteLines = require('gulp-delete-lines');
const eslint = require('gulp-eslint');
const fs = require('fs');
const gulp = require('gulp');
const jsdox = require('jsdox');
//const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const rimraf = require('rimraf');
const run = require('run-sequence');

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

gulp.task('jsdox', function(done) {
  if (!fs.existsSync('./docs')) { fs.mkdirSync('./docs'); }
  if (!fs.existsSync('./docs/temp')) { fs.mkdirSync('./docs/temp'); }
  return jsdox.generateForDir('./lib/resource', './docs/temp', './node_modules/jsdox/templates', done);
});

gulp.task('compile-readme', ['jsdox'], function() {
  return gulp.src(['./docs/README.md', './docs/temp/loans.md', './docs/temp/accounts.md'])
    .pipe(concat('README.md'))
    .pipe(deleteLines({ filters: [/# Global/g] }))
    .pipe(replace('.#', '.'))
    .pipe(replace('&lt;', '<'))
    .pipe(replace('&gt;', '>'))
    .pipe(gulp.dest('./'));
});

gulp.task('validate-version', function() {
  if (require('./package.json').version.indexOf('-') !== -1) {
    throw new Error('Do not publish incomplete versions!');
  }
});

gulp.task('clean', function() {
  if (fs.existsSync('./docs/temp')) {
    return rimraf.sync('./docs/temp');
  }
});

gulp.task('prepublish', function(done) {
  return run('validate-version', ['lint', 'test'], 'compile-readme', 'clean', done);
});

