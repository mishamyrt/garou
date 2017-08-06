var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var concat = require('gulp-concat');
var header = require('gulp-header');
var fs = require('fs');
var license = "/*"+fs.readFileSync('LICENSE.txt', 'utf8')+"*/";
/*
  Базовые
*/
gulp.task('default', function () {
    gulp.start('lib', 'honeymate-polygone', 'addlicense');
});

gulp.task('honeymate-polygone', function() {
  return gulp.src('./vanilla/*.js')
    .pipe(concat('honeymate.vanilla.js'))
    .pipe(gulp.dest('./polygone/js'));
});

gulp.task('lib', function() {
  gulp.src('./src/*.js')
    .pipe(uglify('garou.js', {
      mangle: {
        toplevel: true
      }
    }))
    .pipe(gulp.dest('./build'))
});

gulp.task('addlicense', function(){
  gulp.src('./build/garou.js')
    .pipe(header(license))
    .pipe(gulp.dest('./lib'))
});
