var browserSync = require('browser-sync');
var gulp        = require('gulp');

gulp.task('browserSync', function() {
  browserSync({
    server: {
      // Serve up our build folder
      baseDir: './_site/'
    },
    open: true //Turn off auto launching the browser
  });
});