var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var imgmin = require('gulp-imagemin')

gulp.task('mergeCss',function(){
    gulp.src('./css/*.css')
        .pipe(concat('merge-css.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('./dist/css/'))
})
gulp.task('imgmin',function(){
    gulp.src('./img/*')
        .pipe(imgmin())
        .pipe(gulp.dest('./dist/img/'))
})
gulp.task('default',['mergeCss'])