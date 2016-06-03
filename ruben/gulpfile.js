'use strict';
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const express = require('express');

gulp.task('lint', () => {
  gulp.src(['./server.js', './test/test.js', './route/routes.js','./route/player-routes.js', './model/user.js', './lib/basic-http.js', './lib/jwt.js'])
    .pipe(eslint({
      "ecmaVersion": 6
    }))
    .pipe(eslint.format());
});

gulp.task('default', function () {
  gulp.src('test/test.js')
		.pipe(mocha());
});

gulp.task('watch', () => {
  gulp.watch(['./server.js', './test/test.js', './route/routes.js', './route/player-routes.js', './model/user.js', './lib/basic-http.js', './lib/jwt.js']);
});

gulp.task('default', ['linter', 'tests', 'watch'], () => {
});
