'use strict';

var config = require('./gulp-settings.json');
var gulp = require('gulp');
var gutil = require('gulp-util');
var $ = require('gulp-load-plugins')();
var prefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var cssCodepoints = require('css-codepoints');
var fs = require('fs');
var vfs = require('vinyl-fs');
var converter = require('sass-convert');
var concat = require('gulp-concat');

var PROJECT_ROOT = __dirname;

var PROJECT_PATH = {
    'sass': PROJECT_ROOT + '/django_slick_admin_login/sass',
    'css': PROJECT_ROOT + '/django_slick_admin_login/static/django_slick_admin_login/css'
};

var PROJECT_SASS_SRC = [
    PROJECT_PATH.sass + '/django-slick-admin-login.sass'
]

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4'
];

gulp.task('proxy', ['styles'], function () {

    browserSync.init({
        notify: false,
        port: config.local_port,
        host: config.hostname,
        //open: "external",
        open: false,
        proxy: {
            target: "127.0.0.1:" + config.proxy_port
        },
        ui: {
            port: config.local_port + 1,
            weinre: {
                port: config.local_port + 2
            }
        }
    });

    gulp.watch(PROJECT_PATH.sass + '/**/*.sass', ['styles']);
});



gulp.task('styles', function () {
    return gulp.src(PROJECT_SASS_SRC)
    //return gulp.src(['django_slick_admin_login/sass/django-slick-admin-login.sass'])
        .pipe(gulp.dest(PROJECT_PATH.css))
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            //includePaths: './node_modules/django-slick-admin/django_slick_admin/sass/',
            outputStyle: 'expanded',
            precision: 10
        }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(PROJECT_PATH.css))
        .on('end', function(){ gutil.log(PROJECT_PATH.css); })
        .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
        .pipe(browserSync.stream({match: '**/*.css'}))
        .pipe($.size({title: 'styles'}));
});

gulp.task('login-styles', function () {
    return gulp.src([
            './sass/login/django-slick-admin-login.sass'
        ])
        .pipe(sass({
            includePaths: './node_modules/django-slick-admin/django_slick_admin/sass',
            outputStyle: 'expanded',
            precision: 10
        }))
        .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
        .pipe(gulp.dest('./django_slick_admin_login/static/django_slick_admin_login/css/django-slick-admin-login.css'))
        .pipe($.size({title: 'styles'}));
});


gulp.task('dist', function () {
    return gulp.src(PROJECT_SASS_SRC)
        .pipe($.sass({
            includePaths: './node_modules/django-slick-admin/django_slick_admin/sass',
            outputStyle: 'compact',
            sourceComments: false,
            precision: 10
        }))
        .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
        .pipe($.stripCssComments({}))
        .pipe(gulp.dest(PROJECT_PATH.css))
        .pipe($.size({title: 'styles'}));
});


gulp.task('default', ['proxy']);
gulp.task('watch', ['proxy']);
