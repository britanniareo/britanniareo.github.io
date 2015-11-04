var gulp      = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('watch', ['build'], function() {
  /*browserSync.init({
    server: "./"
  });*/

  gulp.watch("./static/src/scss/**/*.scss", ['sass']);
  gulp.watch("./static//src/js/**/*.js", ['scripts']);
  gulp.watch("./static//src/img/**/*", ['images']);
  gulp.watch("./static//src/html/**/*", ['html']);
  //gulp.watch("./index.html").on('change', browserSync.reload);
  //gulp.watch("./dist/*/**").on('change', browserSync.reload);
});