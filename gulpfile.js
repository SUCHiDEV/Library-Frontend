var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    del = require('del'),
    rev = require('gulp-rev');

gulp.task('clean-styles', function () {
    return del(['public/css']);
});

gulp.task('clean-scripts', function () {
    return del(['public/js']);
});

gulp.task('scripts', ['clean-scripts'], function () {
    return gulp.src('media/js/**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/js'));
});

gulp.task('styles', ['clean-styles'], function () {
    return gulp.src('media/scss/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 8 version'))
        .pipe(gulp.dest('public/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/css'));
});

gulp.task('versionCss', ['styles'], function () {
    return gulp.src('public/css/*.css')
        .pipe(rev())
        .pipe(gulp.dest('public/css'))
        .pipe(rev.manifest({
            merge: true
        }))
        .pipe(gulp.dest('public/css'))
});

gulp.task('versionJs', ['scripts'], function () {
    return gulp.src('public/js/*.js')
        .pipe(rev())
        .pipe(gulp.dest('public/js'))
        .pipe(rev.manifest({
            merge: true
        }))
        .pipe(gulp.dest('public/js'))
});

gulp.task('watch', ['versionCss', 'versionJs'], function () {
    gulp.watch('media/scss/**/*.scss', ['versionCss']);
    gulp.watch('media/js/**/*.js', ['versionJs']);
});

gulp.task('default', function () {
    gulp.start('versionCss', 'versionJs');
});
