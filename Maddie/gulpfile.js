const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

gulp.task('test_task', () => {
  return gulp.src('./test/test.js')
    .pipe(mocha());
});

gulp.task('default', ['lint', 'test_task']);

gulp.task('lint', () => {
  gulp.src('/server.js')
    .pipe(eslint())
    .pipe(eslint.format());
});
