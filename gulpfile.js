
// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del');
    entityconvert = require('gulp-entity-convert');
    plumber = require('gulp-plumber');
    browserSync = require('browser-sync');

 
// Unicode

gulp.task('unicode', function(){
	return gulp.src('*.html')
	.pipe(plumber())
	.pipe(entityconvert())
	.pipe(gulp.dest(''));
});

// Styles
gulp.task('styles', function() {
  return sass('sass/main.sass', { style: 'expanded' })
  	.pipe(plumber())
  	.pipe(autoprefixer({browsers: ['last 2 version']}))
    .pipe(gulp.dest('css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('css'))
    .pipe(notify({ message: 'Styles task complete' }));
});
 
 
// Images
gulp.task('images', function() {
  return gulp.src('img/*')
  	.pipe(plumber())
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('img'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init(["css/*.css", "js/*.js", '*.html'], {
        server: {
            baseDir: "./"
        }
    });
});
 
// Clean
gulp.task('clean', function(cb) {
    del(['css', 'img'], cb)
});
 
// Default task
gulp.task('default', ['clean', 'browser-sync'], function() {
    gulp.start('styles', 'images', 'unicode');
});
 
// Watch
gulp.task('watch', ['browser-sync'], function() {
 
  // Watch .sass files
  gulp.watch('sass/*.sass', ['styles']);
 
  // Watch image files
  gulp.watch('img/*', ['images']);

  gulp.watch('*.html', ['unicode']);
 
});