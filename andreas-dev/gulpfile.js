var gulp = require("gulp");
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var beautify = require('gulp-beautify');

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('static/sass/*.scss', ['sass']);
    gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src('static/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('static/css'))
        .pipe(browserSync.stream());
});


gulp.task('beautify-css', function() {
  gulp.src('static/css/*.css')
    .pipe(beautify({indent_size: 2}))
    .pipe(gulp.dest('./public/css'))
});

gulp.task('beautify-js', function() {
  gulp.src('static/js/*.js')
    .pipe(beautify({indent_size: 2}))
    .pipe(gulp.dest('./public/js'))
});

gulp.task('default', ['serve']);
