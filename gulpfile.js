const gulp = require('gulp');

//Paths for files
const pathConfig = require('./tasks/config/pathConfig');

//Sets gulp tasks
function lazyRequireTask(taskName, path, options) {
    options = options || {};

    gulp.task(taskName, function (callback) {
        var task = require(path).call(this, options); //returns task with defined options

        return task(callback); //calls task
    });
}

//Copies html files
lazyRequireTask('build:html', './tasks/build-html.js', {
    src: pathConfig.src.html,
    dest: pathConfig.build.html
});

//Builds js files
lazyRequireTask('build:js', './tasks/build-javascript.js', {
    src: pathConfig.src.js,
    dest: pathConfig.build.js
});

//Builds scss to css
lazyRequireTask('build:css', './tasks/build-css.js', {
    src: pathConfig.src.scss,
    dest: pathConfig.build.css
});

//Deletes app directory
lazyRequireTask('clean', './tasks/clean.js', {
    dest: pathConfig.clean
});

//Starts browser-sync server
lazyRequireTask('serve', './tasks/serve.js', {
    proxy: pathConfig.server.proxy,
    watch: pathConfig.server.watch,
    port: pathConfig.server.port
});

//Observes of change in files
gulp.task('watch', function () {
    gulp.watch(pathConfig.watch.html, gulp.series('build:html'));
    gulp.watch(pathConfig.src.js, gulp.series('build:js'));
    gulp.watch(pathConfig.watch.scss, gulp.series('build:css'));
});

//Makes build of all tasks
gulp.task('build', gulp.parallel('build:html', 'build:js', 'build:css'));

gulp.task('devLnx', gulp.series('build', gulp.parallel('watch', 'serve')));
gulp.task('devWin', gulp.series('build', gulp.parallel('watch', 'serve')));

//Makes production build
gulp.task('prodLnx', gulp.series('clean', 'build'));
gulp.task('prodWin', gulp.series('clean', 'build'));

//Creates default task
//gulp.task('default', gulp.series('dev'));