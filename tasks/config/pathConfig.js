const app = {
    baseSrc: 'front-end/src/',
    baseDist: 'front-end/dist/'
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
        html: 'front-end/**/*.html',
        scss: app.baseSrc + '**/*.scss'
    },
    server: {
        proxy: 'localhost:3000',
        port: 3001,
        watch: app.baseDist + '**/*.*' //path for watching
    },
    clean: app.baseDist //path for task clean,
};