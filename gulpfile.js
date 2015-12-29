var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    uglyfly = require('gulp-uglyfly'),
    path = require('path'),
    connect = require('gulp-connect');


gulp.task('js',function(){
  gulp.src('./public/js/bundle.min.js')
  .pipe( connect.reload() )
})
gulp.task('html',function(){
  gulp.src('./index.html')
  .pipe( connect.reload() )
});

gulp.task('connect',function(){
  connect.server({
    port: 5000,
    livereload: true
  });
});

gulp.task('browserify', function() {
  browserify('./app/js/main.js')
    .transform("babelify", {
      presets: ["es2015"]
    })
    .bundle()
    .pipe(source('bundle.min.js'))
    .pipe(gulp.dest('./public/js/'))
    .pipe(uglyfly())
    .pipe(gulp.dest('./public/js/'))
    .pipe( connect.reload() )
});

gulp.task('watch', function() {
  gulp.watch('./app/js/*.js',['browserify']);
  gulp.watch('./public/js/bundle.min.js',['js']);
  gulp.watch('./index.html',['html']);
});

gulp.task('serve',['browserify','connect','watch']);

gulp.task('default', ['browserify']);
