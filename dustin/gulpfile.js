const gulp = require('gulp');
const mocha = require('gulp-mocha');
const lint = require('gulp-eslint');

gulp.task('linter' , () => {
  return gulp.src(['./*.js', './test/*.js', './lib/*.js'])
    .pipe(lint())
    .pipe(lint.format());
});

gulp.task('tests', () => {
  return gulp.src(['./*.js', './test/*.js', './lib/*.js'], {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('watch', () => {
  gulp.watch(['./*.js', './test/*.js', './lib/*.js'], ['linter', 'tests']);
});

gulp.task('default', ['linter', 'tests', 'watch'], () => {

});
