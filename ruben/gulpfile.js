const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const express = require('express');

gulp.task('lint', () => {
  gulp.src('./name.js')
    .pipe(eslint({
      "ecmaVersion": 6
    }))
    .pipe(eslint.format());
});

gulp.task('default', function () {
  gulp.src('test/test.js')
		.pipe(mocha());
});
