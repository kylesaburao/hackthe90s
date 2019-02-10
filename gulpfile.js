var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var paths = {
    pages: ['src/*.html', 'src/*.css'],
    page_images: ['src/images/**/*'],
    images: ['res/**/*'],
    music: ['res/music/*.mp3']
};

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

gulp.task("copy-music", function () {
    return gulp.src(paths.music)
        .pipe(gulp.dest("dist/res"));
});

gulp.task("copy-html-images", function () {
    return gulp.src(paths.page_images).pipe(gulp.dest("dist/images"));
});

gulp.task("copy-res", function () {
    return gulp.src(paths.images).pipe(gulp.dest("dist/res"));
});

gulp.task("default", gulp.series(["copy-html", "copy-html-images", "copy-res", "copy-music"], function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("dist"));
}));