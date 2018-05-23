"use-strict"

var gulp = require('gulp');
var connect = require('gulp-connect');	//used to run the local dev server
var open = require('gulp-open');	// used to open the browser
var browserify = require('browserify');	// bundles JS
var reactify = require('reactify');	// use to transform JSX into JS
var source = require('vinyl-source-stream');	// use conventional streams with gulp
var concat = require('gulp-concat');	// concatenation of files
var lint = require('gulp-eslint');	// does all the linting work

var config = {
	port: 3000,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		js: './src/**/*.js',
		images: './src/images/*',
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
			'node_modules/toastr/toastr.css'
		],
		dist: './dist',
		mainJs: './src/main.js'
	}
};

// Task to connect to the local dev server
gulp.task('connect', function() {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

// Task to open the browser to run the file
gulp.task('open', ['connect'], function() {
	gulp.src('dist/index.html')
		.pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}))
});

// Task to build the html files from src to dist folder 
gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

// Task to bundle the JS files with browserify and then sent it to the destination folder
gulp.task('js', function() {
	browserify(config.paths.mainJs)
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload())
});

// Task to concat the css files and bundle them to the dist folder
gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'))
});

// Task for migrating the images from src to dist folder 
// Note that we could even optimize our images here
gulp.task('images', function() {
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist + '/images'))
		.pipe(connect.reload());

	// Publish the favicon 
	gulp.src('./src/favicon.ico')
		.pipe(gulp.dest(config.paths.dist));
});

// Task for the linting 
gulp.task('lint', function() {
	return gulp.src(config.paths.js)
		.pipe(lint({ config: 'eslint.config.json' }))
		.pipe(lint.format())
});

// task to watch for any new changes in the html file to automatically reload the app in browser 
gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js', 'lint']);
});

// Task to make the gulp easier to call from the cmd
gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'open', 'watch']);