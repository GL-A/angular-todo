var gulp = require('gulp')
, sourcemaps = require('gulp-sourcemaps')
, sass = require('gulp-sass')
, concat = require('gulp-concat')
, CacheBuster = require('gulp-cachebust')
, print = require('gulp-print')
, babel = require('gulp-babel')
, uglify = require('gulp-uglify')
, browserSync = require('browser-sync')
, nodemon = require('gulp-nodemon');

var cachebust = new CacheBuster();

gulp.task('build-css', function(){
  return gulp.src('./styles/*')
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(cachebust.resources())
  .pipe(concat('styles.css'))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('./dist'));
});

gulp.task('build-js', function() {
   return gulp.src(['public/**/*.js', '!public/dist/**/*'])
      .pipe(sourcemaps.init())
      .pipe(print())
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(concat('bundle.js'))
      //.pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./public/dist/js'));
});

gulp.task('browserSync', ['nodemon'], function() {
	browserSync.init(null, {
        files: ["./public/**/*.*"],
        proxy: 'http://localhost:5000'
	});
  gulp.watch(['./public/**/*'], ['build-js', 'build-css']).on('change', browserSync.reload);
});

gulp.task('nodemon', function (cb) {
	var started = false;

	return nodemon({
		script: 'server/server.js'
	}).on('start', function () {
		if (!started) {
			cb();
			started = true;
		}
	});
});

gulp.task('default', ['build-css', 'build-js', 'browserSync'], function() {
    return gulp.src('index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('public/dist'));
});
