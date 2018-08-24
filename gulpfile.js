'use strict';

const gulp = require('gulp');
const minify = require('gulp-minify');

gulp.task('default', function() {
  // place code for your default task here
  gulp.src('public/js/*.js')
    .pipe(minify({
        ext:{
            src:'.js',
            min:'-min.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '*-min.js', '*-min.71.js', '*.min.js']
    }))
    .pipe(gulp.dest('debug'))
});
/*gulp.task('compress', function() {
  
});*/