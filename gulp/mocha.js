/* eslint-disable no-process-exit*/
'use strict';
var mocha = require('gulp-mocha');

module.exports = function(gulp, conf) {
  gulp.task('test', function() {
    return gulp.src(conf.build.test, {
        read: false
      })
      .pipe(mocha({
        reporter: 'spec'
      }))
      .on('error', function() {
        gulp.fail = true;
      })
      .once('end', function() {
        process.exit();
      });
  });
};
