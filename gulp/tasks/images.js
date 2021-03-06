var changed    = require('gulp-changed'),
    gulp       = require('gulp'),
    imagemin   = require('gulp-imagemin'),
    config     = require('../config').images;

gulp.task('images', function() {
  return gulp.src(config.src)
    .pipe(changed(config.dist))
    .pipe(imagemin())
    .pipe(gulp.dest(config.dist));;
});