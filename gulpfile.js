var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minifyCss = require("gulp-minify-css"),
    minifyHtml = require("gulp-minify-html"),
    concat = require("gulp-concat"),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    runSequence = require('run-sequence'),
    replace = require('gulp-replace'),
    minimist = require('minimist');

// minify css and MD5
gulp.task('minify-css', function () {
    return gulp.src('css/*.css')
        .pipe(concat('main.css'))
        .pipe(minifyCss())
        .pipe(rev())
        .pipe(gulp.dest('build/assets'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
});

// minify js and MD5
gulp.task('minify-js', function () {
    return gulp.src('js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('build/assets'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'));
});

// rename js and css in html from manifest file and minify html
gulp.task('minify-html', function () {
    return gulp.src(['rev/**/*.json', 'html/*.html'])
        .pipe(revCollector())
        .pipe(replace('xxx', url))
        .pipe(minifyHtml())
        .pipe(gulp.dest('build/'));
});

// copy other files
gulp.task('copy', function () {
    return gulp.src('others/*.*')
        .pipe(gulp.dest('build/assets'));
});

// run sequence
gulp.task('dev', function (done) {
    condition = false;
    runSequence(
        ['copy'], ['minify-js'], ['minify-css'], ['minify-html'],
        done);
});

// input parameter
var knownOptions = {
    string: 'env',
    default: {
        env: process.env.NODE_ENV || 0
    }
};

var url = 'https://www.baidu.com';
var options = minimist(process.argv.slice(2), knownOptions);
switch (options.env) {
    case '0':
        url = 'https://www.baidu.com';
        break;
    case '1':
        url = 'https://www.mi.com';
        break;
}

// start
console.log("The request url will be configured as " + url);
gulp.task('default', ['dev'], function () {

});