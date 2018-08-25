'use strict';

const gulp = require('gulp');
const minify = require('gulp-minify');

gulp.task('default', function() {
  let sheet = [
  	{src:'debug/js/*.js',out:'public/js'}, 
  	{src:'debug/node/*.js',out:'./'},
  	{src:'debug/mod/*.js',out:'modules'}
  ]
  // place code for your default task here
 sheet.map(function(file){
  gulp.src(file.src)
    .pipe(minify({
        ext:{
            src:'.js',
            min:'-min.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['*-min.js', '*-min.71.js', '*.min.js']
    }))
    .pipe(gulp.dest(file.out))
   })
});
/*gulp.task('compress', function() {
  
});*/