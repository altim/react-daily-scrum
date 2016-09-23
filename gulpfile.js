var gulp = require('gulp'),
	connect = require('gulp-connect'),
	open = require('gulp-open'),
	browserify = require('gulp-browserify'),
	concat = require('gulp-concat'),
	sass = require('gulp-sass'),
	port = process.env.port || 3031;

	gulp.task('browserify', function(){
		gulp.src('./app/src/js/main.js')
			.pipe(browserify({ transform : 'reactify' }))
			.pipe(gulp.dest('./app/dist/js'));
	});

//launch browser in a port
gulp.task('open',function(){
	var options = {
		uri : 'http://localhost:'+port
	};
	gulp.src('./app/index.html')
	.pipe(open(options));
});

//live reload server
gulp.task('connect',function(){
	connect.server({
		root : 'app',
		port : port,
		livereload : true
	});
});

//live reload js
gulp.task('js',function(){
	gulp.src('./app/dist/**/*.js')
	.pipe(connect.reload());
});

//live reload html
gulp.task('html', function(){
	gulp.src('./app/*.html')
	.pipe(connect.reload());
});

//live reload css
gulp.task('css', function(){
	gulp.src('./app/dist/css/*.css')
	.pipe(connect.reload());
});


//sass
gulp.task('sass', function () {
  return gulp.src('./app/src/css/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./app/src/css'));
});

gulp.task('concat', ['sass'], function() {
  return gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.min.css', './node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css', './app/src/css/main.css'])
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./app/dist/css'));
});


//watch files for live reload
gulp.task('watch',function(){
	gulp.watch('app/dist/js/*.js', ['js']);
	gulp.watch('app/index.html', ['html']);
	
	gulp.watch('app/src/js/**/*.js',['browserify']);

	gulp.watch('app/src/css/**/*.scss',['sass','concat']);
	gulp.watch('app/dist/css/**/*.css',['css']);
});




gulp.task('default',['browserify']);
gulp.task('serve', ['browserify', 'sass', 'concat', 'connect','open','watch']);





