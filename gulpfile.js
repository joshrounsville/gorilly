// call the plugins and set variables

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload'),
    connect = require ('connect'),
    http = require('http'),
    path = require('path'),
    lr = require('tiny-lr'),
    server = lr(),
    cp  = require ('child_process'),
    port = 3000,
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    rimraf = require('gulp-rimraf');




// set basic tasks

gulp.task('css', function() {
  return gulp.src('./scss/styles.scss')
    .pipe(sass({ style: 'expanded', lineNumbers: true }))
    .on('error', gutil.log)
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minifycss())
    .pipe(gulp.dest('css'))
    .pipe(livereload(server));
});

gulp.task('clear', function() {
  return gulp.src('./css/*.scss', { read: false })
    .pipe(rimraf({ force: true }));
});

gulp.task('lint', function() {
  return gulp.src('./js/main.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('minify', function(){
  gulp.src(['./js/plugins.js', './js/main.js', '!./js/vendor/*.js', '!./js/*.min.js'])
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./js/'))
    .pipe(livereload(server));
});

gulp.task('images', function () {
  return gulp.src('./img/**')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(livereload(server));
});

gulp.task('webserver', function() {
  var hostname = null,
      base = path.resolve('.'),
      directory = path.resolve('.');

  var app = connect()
    .use(connect.static(base))
    .use(connect.directory(directory))

  http.createServer(app).listen(port, hostname);
});



// set working tasks

gulp.task('default', [ 'css', 'lint', 'minify' ]);

gulp.task('dev', [ 'default', 'webserver', 'images' ], function() {

  setTimeout(function() {
    cp.exec('open http://localhost:' + port);
  }, 1000);

  server.listen(35729, function (err) {
    if (err) {
      return console.log(err)
    };

    gulp.watch('./scss/**/*.scss', [ 'css', 'clear' ]);

    gulp.watch('./js/main.js', [ 'lint' ] );

    gulp.watch('./js/*.js', [ 'minify' ]);

  });

});