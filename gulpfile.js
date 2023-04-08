const { src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const htmlmin = require('gulp-htmlmin');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const connect = require('gulp-connect');

const paths = {
    html: {
        all: "src/templates/**/*.html",
        index: "src/templates/index.html"
    },
    image: {
        all: "src/asset/**"
    },
    styles: {
        all: "src/styles/**/*.scss",
        main: "src/styles/main.scss"
    },
    scripts: {
        all: "src/scripts/**/*.js",
        app: "src/scripts/app.js"
    },

    output: '../Agenda-dist/dist'

}


function server() {
    connect.server({
        root: paths.output,
        livereload: true,
        port: 3000,
    });
}

function sentinel() {
    watch(paths.html.all, { ignoreInitial: false }, html);
    watch(paths.image.all, { ignoreInitial: false }, image)
    watch(paths.styles.all, { ignoreInitial: false }, styles);
    watch(paths.scripts.all, { ignoreInitial: false }, scripts);
}

function html() {
    return src(paths.html.all).pipe(htmlmin({ collapseWhitespace: true })).pipe(dest(paths.output)).pipe(connect.reload());
}

function image() {
    return src(paths.image.all).pipe(dest(paths.output)).pipe(connect.reload());
}

function styles() {
    return src(paths.styles.main).pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError)).pipe(dest(paths.output)).pipe(connect.reload());
}

function scripts() {
    return browserify(paths.scripts.app).transform(babelify.configure({
        presets: ["@babel/preset-env"],
    })).bundle().pipe(source('bundle.js')).pipe(buffer()).pipe(uglify()).pipe(dest(paths.output)).pipe(connect.reload());


}

exports.default = parallel(server, sentinel);
