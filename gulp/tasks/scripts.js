
var gulp   = require('gulp'),
    config = require('../config').scripts,
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');
    vendor = config.src + '/vendor';

gulp.task('scripts', function() {
  gulp.src([
    config.src+'/britannia.js'
  ])
    .pipe(concat('britannia.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(config.dist));

  gulp.src([
    vendor + '/angular-1.4.7.min.js',
    vendor + '/angular-animate-1.4.7.min.js',
    vendor + '/angular-aria-1.4.7.min.js',
    vendor + '/angular-material-1.0.4.min.js',
    vendor + '/angular-ui-router-0.2.15.min.js',
    vendor + '/analytics.js'
  ])
    .pipe(concat('vendor.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(config.dist));
});