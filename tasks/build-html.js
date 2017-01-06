'use strict';

const gulp = require('gulp');
const notify = require('gulp-notify');
const combiner = require('stream-combiner2').obj;

module.exports = function (options) {
    return function () {
        return combiner(
            gulp.src(options.src, {
                since: gulp.lastRun('build:html')
            }),
            gulp.dest(options.dest)
        ).on('error', notify.onError());
    }
};