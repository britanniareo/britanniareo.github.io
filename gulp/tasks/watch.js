var gulp      = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('watch', ['build'], function() {
  browserSync.init({
        server: "./"
    });

    gulp.watch("./src/scss/**/*.scss", ['sass']);
    gulp.watch("./index.html").on('change', browserSync.reload);
    gulp.watch("./dist/*/**").on('change', browserSync.reload);
});