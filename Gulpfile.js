/* File: Gulpfile.js */

var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    jshint      = require('gulp-jshint'),
    sass        = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    livereload  = require('gulp-livereload'),
    connect     = require('gulp-connect');

// Default task ($> gulp)
gulp.task('default', function() {
    // Start demo server
    connect.server({
      root: '.',
      port: 8080,
      livereload: true
    });

    gulp.start('watch');
});

// Configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('source/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Sass compilation to css
gulp.task('build-css', function() {
  return gulp.src('source/scss/**/*.scss')
    .pipe(sourcemaps.init()) // Process the original sources
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write()) // Add the map to modified source.
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});

gulp.task('build-js', function() {
  return gulp.src('source/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    //only uglify if gulp is ran with '--type production'
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('js'))
    .pipe(livereload());
});

// HTML
gulp.task('reload', function() {
  return gulp.src('index.html')
    .pipe(connect.reload());
});

// Configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('source/js/**/*.js', ['jshint', 'build-js']);
  gulp.watch('source/scss/**/*.scss', ['build-css']);
  gulp.watch(['index.html',
              'css/main.css',
              'js/bundle.js'], ['reload']);
  // Watch Gulpconfig
  gulp.watch('Gulpfile.js', ['jshint', 'build-js', 'build-css', 'reload']);
});
