var gulp = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('default', [], function(cb) {
  runSequence('clean', ['styles', 'images', 'scripts', 'html'], cb);
});
