'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var smartgrid = require('smart-grid');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

var settings = {
    outputStyle: 'scss',
    container: {
        maxWidth: '1170px',
        fields: '30px'
    },
    breakPoints: {
        lg: {
            width: '1230px',
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


gulp.task('init', function () {
    return smartgrid('./src/styles/', settings);
});

gulp.task('sass', function () {
    return gulp.src('./src/styles/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css/'))
        .pipe(reload({stream:true}));
});

gulp.task('pug', function() {
    return gulp.src("./src/*.pug")
        .pipe(pug())
        .pipe(gulp.dest("./dist/"))
        .pipe(reload({stream:true}));
});

var scripts = ['./src/scripts/jquery/dist/jquery.min.js', './src/scripts/*.js', "./src/blocks/**/*.js"];

gulp.task('scripts', function() {
    return gulp.src(scripts)
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(reload({stream:true}));
});

gulp.task('images', () =>
    gulp.src(['./src/images/*.*', './src/images/**/*.*'])
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);

gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

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

