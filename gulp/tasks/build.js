var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();


gulp.task('previewDist', function() {
        browserSync.init({
        notify: false,
        server: {
            baseDir: "docs"
        }
    });
});

gulp.task('deleteDistFolder', function() {
    return del("./docs");
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
    var pathsToCopy = [
        './**/*',
        '!./index.html',
        '!./images/**',
        '!./css/**',
        '!./js/**',
        '!./gulp/**',
        '!./gulp',
        '!./package.json',
        '!./README.md',
        '!./node_modules/**',
        '!./node_modules',
        '!./gulpfile.js'
    ]

    return gulp.src(pathsToCopy)
        .pipe(gulp.dest("./docs"));
});

gulp.task('optimizeImages', ['deleteDistFolder'], function() {

/* '!': will exclude particular folders from being in the build */

    return gulp.src(['./images/**/*'])
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            multipass: true,
        }))
        .pipe(gulp.dest("./docs/images"));
});

gulp.task('usemin', ['deleteDistFolder'], function() {
    return gulp.src("./index.html")
        .pipe(usemin({
            css: [function() {return rev()}, function() {return cssnano()}], js: [function() {return rev()}, function() {return uglify()}]
        }))
        .pipe(gulp.dest("./docs"));
});

/* IF YOU ARE ARE UPLOADING TO GITHUB, GET RID OF FORWARD SLASHES*/

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'usemin']);

