var gulp = require('gulp'),
    exec = require('child_process').exec,
  config = require('../config.js').env;

gulp.task('deploy:dev', function(cb){
  exec('appcfg.py --no_cookies -A '+config.dev+' update .', function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
});
