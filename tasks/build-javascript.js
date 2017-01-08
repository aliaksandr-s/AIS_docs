'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const combiner = require('stream-combiner2').obj;
var sourcemaps = require('gulp-sourcemaps');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function (options) {
    return function () {
        return combiner(
            gulp.src(options.src),
            $.if(isDevelopment, $.sourcemaps.init()), //if development build - inits sourcemaps
            $.uglify(), //minifies js
            $.if(isDevelopment, $.sourcemaps.write()), //if development build - writies sourcemaps
            gulp.dest(options.dest)
        ).on('error', $.notify.onError());

    }
}