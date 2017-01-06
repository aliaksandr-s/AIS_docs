'use strict';

const gulp = require('gulp');

module.exports = function (options) {
    return function () {
        //angular Framework
        gulp.src(options.src.angular)
            .pipe(gulp.dest(options.dest.angular));

        //angular-route
        gulp.src(options.src.angular_route)
            .pipe(gulp.dest(options.dest.angular_route));

        //jquey
        gulp.src(options.src.jquery)
            .pipe(gulp.dest(options.dest.jquery));

        //ng-file-upload
        gulp.src(options.src.ng_file_upload)
            .pipe(gulp.dest(options.dest.ng_file_upload));

        //bootstrap
        return gulp.src(options.src.bootstrap)
            .pipe(gulp.dest(options.dest.bootstrap));
    }
};