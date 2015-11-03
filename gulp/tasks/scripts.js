var gulp   = require('gulp'),
    config = require('../config').scripts,
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    size   = require('gulp-filesize'),
    uglify = require('gulp-uglify');
    vendor = config.src + '/vendor';

gulp.task('scripts', function() {
  gulp.src([
    config.src+'/britannia.js'
  ])
    .pipe(concat('britannia.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(size())
    .pipe(uglify())
    .pipe(size())
    .pipe(gulp.dest(config.dist));

  gulp.src([
    vendor + '/angular-1.4.7.min.js',
    vendor + '/angular-animate-1.4.7.min.js',
    vendor + '/angular-aria-1.4.7.min.js',
    vendor + '/angular-material-1.0.0-rc1.min.js',
    vendor + '/angular-ui-router-0.2.15.min.js'
  ])
    .pipe(concat('vendor.js'))
    .pipe(size())
    .pipe(gulp.dest(config.dist));
});