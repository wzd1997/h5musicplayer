var gulp = require("gulp");
var connect = require("gulp-connect");
var less = require("gulp-less");



// 注册一个任务 html   转移html文件
gulp.task("html", function () {
    //.src() 获取路径下的文件 并变成 '流文件'
    //.pipe() 将'流文件'进行传输 
    //.dist() 将'流文件'转换成 原文件格式  并放到目标路径下
    gulp.src("src/index.html")
        .pipe(connect.reload()) //自动刷新
        .pipe(gulp.dest('dist'))

})

//监听任务 gulp.watch()若第一个参数发生变化 执行第二个参数的函数
gulp.task("watch", function () {
    gulp.watch("./src/index.html", ["html"]);
    gulp.watch("./src/css/*.less", ["less"]);
    gulp.watch("./src/js/*.js", ["js"]);
})

//开服务器
gulp.task("server", function () {
    connect.server({
        port: 8090,
        livereload: true, //允许自动刷新
    });
})

//转换less到css
gulp.task("less", function () {
    gulp.src("./src/css/*.less")
        .pipe(less())
        .pipe(connect.reload())
        .pipe(gulp.dest("./dist/css"))
})

//转移js文件 
gulp.task("js",function () {
    gulp.src("./src/js/*.js")
        .pipe(connect.reload())
        .pipe(gulp.dest("./dist/js"))
})


gulp.task("default", ["html", "less", "js", "watch", "server"]);