'use strict';

const gulp = require('gulp');
const rename = require('gulp-rename');
const del = require('del');

const postHtml = require('gulp-posthtml');
const include = require('posthtml-include');
const htmlmin = require('gulp-htmlmin');

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const minifyCss = require('gulp-csso');

const babel = require('gulp-babel');

const imagemin = require('gulp-imagemin');
// const tinymin = require('gulp-tinypng');
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');

const typeOfCompression = 4;

gulp.task('html', function () {
    return gulp.src('source/*.html')
      .pipe(postHtml([include({ encoding: 'utf8', root: './source/' })]))
      // .pipe(htmlMin({collapseWhitespace: true}))
      .pipe(gulp.dest('build'))
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(rename('index.min.html'))
      .pipe(gulp.dest('build'));
  });

gulp.task('style', function() {
    return gulp.src('./source/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
    autoprefixer()
    ]))
    .pipe(gulp.dest('./build/css'))
    .pipe(minifyCss())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('buildjs', function () {
    return gulp.src('./source/js/main.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('./build/js'))
      });
 
gulp.task('images', function () {
    return gulp.src('./source/img/**/*.{png,jpg}')
      .pipe(imagemin([
        imagemin.optipng({optimizationLevel: typeOfCompression}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.svgo({
          plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
              ]
          })
      ]))
      .pipe(gulp.dest('./build/img'));
  });

  gulp.task('webp', function () {
    return gulp.src('build/img/*.{png,jpg}')
      .pipe(webp({quality: 95,
                  lossless: false}))
      .pipe(gulp.dest('build/img/webp'));
  });

  gulp.task('sprite', function () {
    return gulp.src('source/img/*.svg')
      .pipe(svgstore({
        inlineSvg: true
      }))
      .pipe(rename('sprite.svg'))
      .pipe(gulp.dest('build/img'));
  });


gulp.task('watch', function () {
    gulp.watch('./scss/style.scss', ['sass']);
});

gulp.task("clean", () => del("build"));

gulp.task('build', gulp.parallel('html', 'style'));
gulp.task('buildimage', gulp.parallel('images', 'webp', 'sprite'));