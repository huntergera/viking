"use strict";

var gulp = require('gulp'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect'),
	sass = require('gulp-sass'),
	less = require('gulp-less'),
	cleanCSS = require('gulp-clean-css');

//server connect
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

// scss
gulp.task('scss', function() {
  gulp.src('scss/main.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer('last 4 versions'))
  .pipe(cleanCSS(''))
  .pipe(rename('main.min.css'))
  .pipe(gulp.dest('app/css'))
  .pipe(connect.reload());
});

// html
gulp.task('html', function () {
	gulp.src('app/index.html')
	.pipe(connect.reload());
})

// less
gulp.task('less', function () {
	gulp.src('less/main.less')
	.pipe(less())
	.pipe(autoprefixer('last 4 versions'))
	.pipe(cleanCSS(''))
	.pipe(rename('main.min.css'))
	.pipe(gulp.dest('app/css'))
	.pipe(connect.reload());
})

// watch
gulp.task('watch', function () {
	gulp.watch('scss/*.scss', ['scss'])
	gulp.watch('less/*.less', ['less'])
	gulp.watch('app/index.html', ['html'])
})

// default
gulp.task('default', ['connect', 'html', 'scss', 'less', 'watch']);