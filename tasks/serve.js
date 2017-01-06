'use strict';

const browserSync = require('browser-sync').create();

module.exports = function (options) {
    return function () {
        browserSync.init({
            proxy: options.proxy
        });

        browserSync.watch(options.watch).on('change', browserSync.reload);
    }
};