var gulp    = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    config  = require('../config.js').html;

gulp.task('html', function(cb) {
  return gulp.src(config.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(config.dist));
});