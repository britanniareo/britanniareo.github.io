var gulp   = require('gulp'),
    del    = require('del'),
    config = require('../config.js');

gulp.task('clean', function(){
  return del([
    config.html.deit + '**/*',
    config.images.dist + '**/*',
    config.scripts.dist + '**/*',
    config.styles.dist + '**/*'
  ]);
});