'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const prefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-minify-css');
const combiner = require('stream-combiner2').obj;

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function (options) {
    return function () {
        return combiner(
            gulp.src(options.src),
            $.if(isDevelopment, $.sourcemaps.init()), //if development build - inits sourcemaps
            $.sass(), //compilies less to css
            prefixer(), //writes vendor's prefixes
            cssmin(), //minifies css
            $.if(isDevelopment, $.sourcemaps.write()), //if development build - writies sourcemaps
            gulp.dest(options.dest)
        ).on('error', $.notify.onError());
    }
};