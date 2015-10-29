var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    handleErrors = require('../util/handleErrors'),
    config       = require('../config').sass,
    autoprefixer = require('gulp-autoprefixer'),
    cssImport    = require('gulp-cssimport'),
    plumber      = require('gulp-plumber'),
    notify       = require('gulp-notify')
    minify       = require('gulp-minify-css'),
    size         = require('gulp-filesize'),
    rename       = require('gulp-rename');

gulp.task('sass', function () {
  return gulp.src(config.src)

    .pipe(plumber({
        errorHandler: notify.onError("<%= error.message %>")
    }))
    .pipe(sass(config.settings))
    .pipe(cssImport())
        .on('error', handleErrors)
    .pipe(autoprefixer({ browsers: ['last 2 version'] }))
    .pipe(size())
    .pipe(minify({keepBreaks:true}))
    .pipe(size())
    .pipe(gulp.dest(config.dist));
});
