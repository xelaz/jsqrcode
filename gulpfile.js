
var gulp = require('gulp');
var include = require('gulp-include');
var plumber = require('gulp-plumber');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var optimizejs = require('gulp-optimize-js');
var size = require('gulp-filesize');
var concat = require('gulp-concat');
var prettify = require('gulp-jsbeautifier');

gulp.task('scripts', function() {
  return gulp.src('src/qrcode.js')
    .pipe(include())
    .pipe(prettify())
    .on('error', console.log)
    .pipe(gulp.dest('build/'))
    .pipe(size());
});

gulp.task('uglify', [
  'scripts'
], function() {
  return gulp.src('build/qrcode.js')
    .pipe(plumber())
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(optimizejs())
    .pipe(concat('qrcode.min.js'))
    .pipe(gulp.dest('build/'))
    .pipe(size());
});

gulp.task('default', ['scripts', 'uglify']);
