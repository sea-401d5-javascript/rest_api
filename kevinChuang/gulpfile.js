/*jshint esversion:6*/
/*eslint-env es6*/

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

gulp.task('default',['lint','Mochai','watch'], () => {

});

gulp.task('lint', () => {
  gulp.src([
    './*.js',
    './gulpfile.js',
    './test/*.js',
    './routes/*.js',
    './schema/*.js'
  ])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.results(function(results) {
    console.log('Total results: ' + results.length);
    console.log('Total warnings: ' + results.warningCount);
    console.log('Total errors: ' + results.errorCount);
  }));
});

gulp.task('Mochai', () => {
  gulp.src('./test/*.js')
  .pipe(mocha());
});

gulp.task('watch', () => {
  gulp.watch(['./*.js','./test*.js'],['lint','Mochai']);
});
