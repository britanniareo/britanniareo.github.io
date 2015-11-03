var gulp   = require('gulp'),
    minify = require('gulp-minify-html'),
    config = require('../config').html;

gulp.task('html', function () {
  return gulp.src(config.src)
    .pipe(minify(config.opts))
    .pipe(gulp.dest(config.dist));
});