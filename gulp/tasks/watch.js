var gulp = require('gulp'),
    config = require('../config.js');

gulp.task('watch', ['default'], function(cb) {
  gulp.watch(config.html.src, ['html']);
  gulp.watch(config.images.src, ['images']);
  gulp.watch(config.scripts.watchSrc, ['scripts']);
  gulp.watch(config.styles.src, ['styles']);
});