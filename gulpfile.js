const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const image = require('gulp-image');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const replace = require('gulp-replace');
const browserSync = require('browser-sync').create();

function styleTask() {
  return gulp
    .src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

function scriptTask() {
  return gulp
    .src('src/scripts/**/*.js')
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
}

function imageTask() {
  return gulp
    .src('src/img/*')
    .pipe(image())
    .pipe(gulp.dest('dist/img'));
}
const cbString = new Date().getTime();
function cacheTask() {
  return gulp
    .src(['src/index.html'])
    .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
    .pipe(gulp.dest('dist'));
}
function watch() {
  browserSync.init({
    server: {
      baseDir: 'src'
    }
  });
  gulp.watch('src/img/*', imageTask);
  gulp.watch('src/scss/**/*.scss', styleTask);
  gulp.watch('src/*.html').on('change', browserSync.reload);
  gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
}

/*exports.style = style;
exports.script = script;
exports.watch = watch;*/
exports.default = gulp.series(
  imageTask,
  styleTask,
  scriptTask,
  cacheTask,
  watch
);
