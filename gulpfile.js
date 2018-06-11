const gulp = require('gulp');
const gulpConcat = require('gulp-concat');
const gulpStripComments = require('gulp-strip-comments');
const gulpUglify = require('gulp-uglify');
const gulpAutoprefixer = require('gulp-autoprefixer');
const del = require('del');
const gulpDebug = require('gulp-debug');
const gulpBabel = require('gulp-babel');
const server = require('./server');
const appDir = 'index';
const publicDir = 'index';
const port = 8888;

gulp.task('clean', () => del([`${publicDir}/script.min.js`]));

gulp.task('serve', () => {
  server(port);
});

gulp.task('build-js', () => {
  return gulp.src(['bower_components/angular/angular.min.js', 'bower_components/angular-route/angular-route.min.js',
  'bower_components/angular-animate/angular-animate.min.js', 'bower_components/angular-cookies/angular-cookies.min.js',
    `${appDir}/app-config.js`, `${appDir}/acc-menu/acc-menu.component.js`,
  `${appDir}/cur-data/cur-data.service.js`, `${appDir}/right-menu/right-menu.component.js`,
  `${appDir}/to-archieve/to-archieve.component.js`, `${appDir}/to-home/to-home.component.js`,
  `${appDir}/to-login/to-login.component.js`, `${appDir}/top-menu/top-menu.component.js`,
  `${appDir}/to-registration/to-registration.component.js`, `${appDir}/to-results/to-results.component.js`,
  `${appDir}/to-task/to-task.component.js`, `${appDir}/to-task-info/to-task-info.component.js`,
  `${appDir}/to-user/to-user.component.js`, `${appDir}/script.js`])
  .pipe(gulpDebug({ title: 'build-js' }))
  .pipe(gulpBabel())
  .pipe(gulpStripComments())
  .pipe(gulpConcat('script.min.js'))
  .pipe(gulpUglify())
  .pipe(gulp.dest(publicDir));
});

gulp.task('default', gulp.series('clean', 'build-js', 'serve'));