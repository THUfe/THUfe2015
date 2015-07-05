var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    useref = require('gulp-useref'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-minify-css'),
    del = require('del');

gulp.task('html', function() {
  var assets = useref.assets({searchPath:['bower_components','.']});

  return gulp.src('layouts/partials/head_includes_master.html')
    .pipe(rename('head_includes.html'))
    .pipe(assets)
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('layouts/partials/'));
});

gulp.task('css', ['html'] , function() {
  return gulp.src('layouts/partials/css/lib/3rd.css')
    .pipe(gulp.dest('static/css/lib/'));
});

gulp.task('clean-css', ['css'], function(cb) {
  del(['layouts/partials/css/lib/3rd.css'], cb);
});

gulp.task('fonts', function() {
  return gulp.src('bower_components/bootstrap/fonts/*')
    .pipe(gulp.dest('static/css/fonts/'));
});

gulp.task('default', ['html', 'css', 'clean-css', 'fonts']);
