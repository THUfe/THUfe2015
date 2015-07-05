var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    useref = require('gulp-useref'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-minify-css');

gulp.task('default', function() {
  var assets = useref.assets({searchPath:['bower_components','.']});

  return gulp.src('layouts/partials/head_includes_master.html')
    .pipe(rename('head_includes.html'))
    .pipe(assets)
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('layouts/partials/'));
});
