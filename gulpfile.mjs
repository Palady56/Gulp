import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';

const sass = gulpSass(dartSass);

gulp.task('styles', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 5 versions'],
            cascade: true
        }))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

// reload
gulp.task('serve', function() {
    browserSync.init({
        server: './dist'
    });

    gulp.watch('src/scss/**/*.scss', gulp.series('styles'));
    gulp.watch('./*.html').on('change', gulp.series('copy-html', browserSync.reload));
});

// html
gulp.task('copy-html', function() {
    return gulp.src('./*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('copy-html', 'styles', 'serve'));


