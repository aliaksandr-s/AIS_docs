const app = {
    baseSrc: 'front-end/src/',
    baseDist: 'front-end/dist/'
};

const vendorsPath = {
    baseSrc: 'node_modules/', //base path for node_modules by default
    baseDist: app.baseDist + 'vendors/' //base path for node_modules in web directory
};

module.exports = {
    src: { //path for files for build
        html: app.baseSrc + '**/*.html',
        js: app.baseSrc + '**/*.js',
        scss: app.baseSrc + '**/main.scss'
    },
    build: { //path for files after build
        html: app.baseDist,
        js: app.baseDist,
        css: app.baseDist
        //img: app.baseDist
    },
    watch: {
        scss: app.baseSrc + '**/*.scss'
    },
    vendors: {
        src: { //path of module in node_modules by default
            angular: vendorsPath.baseSrc + 'angular/**',
            angular_route: vendorsPath.baseSrc + 'angular-ui-router/**',
            jquery: vendorsPath.baseSrc + 'jquery/**',
            bootstrap: vendorsPath.baseSrc + 'bootstrap/**',
            ng_file_upload: vendorsPath.baseSrc + 'ng-file-upload/**',
        },
        dest: { //path of module in node_modules in root directory
            angular: vendorsPath.baseDist + 'angular',
            angular_route: vendorsPath.baseDist + 'angular-ui-router',
            jquery: vendorsPath.baseDist + 'jquery',
            bootstrap: vendorsPath.baseDist + 'bootstrap',
            ng_file_upload: vendorsPath.baseDist + 'ng-file-upload'
        }
    },
    server: {
        proxy: 'localhost:3000',
        watch: app.baseDist + 'app/**/*.*' //path for watching
    },
    clean: app.baseDist + 'app/' //path for task clean,
};