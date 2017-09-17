var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssImport    = require('gulp-cssimport'),
    minify       = require('gulp-minify-css'),
    rename       = require('gulp-rename'),
    handleErrors = require('../util/handleErrors'),
    config       = require('../config').styles;

gulp.task('styles', function () {
  return gulp.src(config.src)
    .pipe(sass(config.settings))
        .on('error', handleErrors)
    .pipe(cssImport())
        .on('error', handleErrors)
    .pipe(autoprefixer({ browsers: ['last 2 version'] }))
    .pipe(minify({keepBreaks:true}))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(config.dist));
});
