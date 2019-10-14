//const { src, dest, parallel } = require('gulp')
var gulp = require('gulp'), // Main Gulp module
    open1 = require('gulp-open'), // Gulp browser opening plugin
    connect = require('gulp-connect'), // Gulp Web server runner plugin
    stylus = require('gulp-stylus')
    //concat = require('gulp-concat'), // Gulp File concatenation plugin


async function csty() {
	return gulp.src('./src/main.styl')
		.pipe(stylus())
    .pipe(gulp.dest('./static/'))
    .pipe(connect.reload())
}
async function copyHtml() {
  return gulp.src('./src/*.html')
      .pipe(gulp.dest('./static/'))
      .pipe(connect.reload())
}
function watch() {
  gulp.watch('./src/main.styl', csty)
  gulp.watch('./src/index.html', copyHtml)
  gulp.watch('./src/assets/img/*', imgs)
  gulp.watch('./src/assets/fonts/*', fnts)
}
function con(done) {
  connect.server({
      root: 'static',
      port: 8001,
      livereload: true
  }, function () {this.server.on('close', done)});
  //return done()
  //return print(function() { return 'HTTP Server Started'; })
}
function open(done){
  gulp.src('./static/index.html').pipe(open1({uri: 'http://localhost:8001/', app: 'chrome'}))
  done()
}
gulp.task('open', function(){
  gulp.src('./static/index.html')
  .pipe(open1({uri: 'localhost:3000', app: 'chrome'}))
})

async function imgs(){
  return gulp.src('./src/assets/img/*')
  .pipe(gulp.dest('./static/assets/img/'))
  .pipe(connect.reload())
}
async function fnts(){
  return gulp.src('./src/assets/fonts/*')
  .pipe(gulp.dest('./static/assets/fonts/'))
  .pipe(connect.reload())
}
exports.csty = csty
exports.copyHtml = copyHtml
exports.watch = watch
exports.con = con
exports.open = open
exports.imgs = imgs
exports.default = gulp.parallel(con, open, watch)