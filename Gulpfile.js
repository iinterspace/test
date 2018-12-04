'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var smartgrid = require('smart-grid');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');

var settings = {
    outputStyle: 'scss',
    breakPoints: {
        lg: {
            width: '1185px',
        },
        md1040: {
            width: '1040px'
        },
        md: {
            width: '850px'
        },
        sm: {
            width: '768px'
        },
        xs: {
            width: '560px'
        }
    }
};
smartgrid('./src/styles/', settings);

gulp.task('sass', function () {
    return gulp.src('./src/styles/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('pug', function() {
    return gulp.src("./src/*.pug")
        .pipe(pug())
        .pipe(gulp.dest("./dist/"));
});

var scripts = ['./src/scripts/jquery/dist/jquery.min.js', './src/scripts/*.js', "./src/blocks/**/*.js"];

gulp.task('scripts', function() {
    return gulp.src(scripts)
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('images', () =>
    gulp.src(['./src/images/*.*', './src/images/**/*.*'])
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);

gulp.task('watch', function () {
  gulp.watch(['./src/blocks/**/*.scss',
      './src/styles/**.scss',
      './src/styles/**/*.scss'], ['sass']);
  gulp.watch('./src/**/*.pug', ['pug']);
  gulp.watch(['./src/images/*.*', './src/images/**/*.*'], ['images']);
  gulp.watch(scripts, ['scripts']);
});

gulp.task('build', [
    'sass', 'pug', 'scripts', 'images'
]);

