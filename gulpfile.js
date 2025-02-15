'use strict';

const gulp = require('gulp');
const minify = require('gulp-minify');

gulp.task('default', function() {
  let sheet = [
  	{src:'public/js/*.js',out:'public/js'},
    {src:'poc/*.js',out:'poc'} 
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
        ignoreFiles: ['*-min.js', '*-min.71.js', '*.min.js', 'gulpfile.js']
    }))
    .pipe(gulp.dest(file.out))
   })
});
/*gulp.task('compress', function() {
  
});*/