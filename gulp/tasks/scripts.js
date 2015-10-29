var gulp   = require('gulp'),
    config = require('../config').scripts,
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    size   = require('gulp-filesize'),
    uglify = require('gulp-uglify');;

gulp.task('scripts', function() {
  return gulp.src([
      config.src+'/britannia.js'
    ])
    .pipe(concat('britannia.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(size())
    .pipe(uglify())
    .pipe(size())
    .pipe(gulp.dest(config.dist));
});