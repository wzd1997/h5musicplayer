//管理进度条功能
(function ($, root) {
    var $scope = $(document.body);
    var startTime;
    var startTimeAlbum;
    var frameId;
    var frameIdAlbum;
    var allduration;
    var lastpercent = 0;
    var lastpercentrotate = 0;
    var percentrotate;
    var audiomanager = new root.audioManager();

    // 转换时间 '秒'转换成'分秒'显示
    function formatTime(time) {
        time = Math.round(time);
        var minute = Math.floor(time / 60);
        var second = time - minute * 60;
        if (minute < 10) {
            minute = "0" + minute;
        }
        if (second < 10) {
            second = "0" + second;
        }
        return minute + ":" + second;
    }
    //渲染总时间
    function render(duration) {
        //从头播放
        allduration = duration;
        lastpercent = 0;
        lastpercentrotate = 0;
        update(0);
        var allTime = formatTime(duration);
        $scope.find(".all-time").text(allTime);
    }
    // 更新当前时间 和进度条
    function update(percentage) {
        var curTime = formatTime(percentage * allduration);
        $scope.find(".cur-time").text(curTime);

        // 进度条
        setProcess(percentage);
    }

    // 设置当前进度条
    function setProcess(percentage) {
        var percent = (percentage - 1) * 100 + '%';
        $scope.find(".pro-top").css("transform", "translateX(" + percent + ")");
    }
    // 图片旋转
    function rotateMy(percentRotate) {
        var percentRotate = Math.floor(percentRotate * 7200) + 'deg';
        $scope.find(".img-wrapper img").css("transform", "rotateZ(" + percentRotate + ")");
    }

    // 渲染当前时间和进度条
    function start(percent) {
        cancelAnimationFrame(frameId);
        if (percent === undefined) {
            lastpercent = lastpercent;
        } else {
            lastpercent = percent;
        }
        startTime = new Date().getTime();
        function frame() {
            var curTime = new Date().getTime();
            percentage = lastpercent + (curTime - startTime) / (allduration * 1000);
            if (percentage < 1) {
                update(percentage);
                // 一秒刷新60次 每次刷新前执行frame
                frameId = requestAnimationFrame(frame);
            } else {
                cancelAnimationFrame(frameId);
                // $scope.find(".play-btn").toggleClass("pause-btn");
            }
        }
        frame();
    }

    //渲染专辑转动
    function startAlbum() {
        cancelAnimationFrame(frameIdAlbum);
        startTimeAlbum = new Date().getTime();
        function frameAlbum() {
            var curTime = new Date().getTime();
            percentrotate = lastpercentrotate + (curTime - startTimeAlbum) / (allduration * 1000);
            if (percentage < 1) {
                rotateMy(percentrotate);
                // 一秒刷新60次 每次刷新前执行frame
                frameIdAlbum = requestAnimationFrame(frameAlbum);
            } else {
                cancelAnimationFrame(frameIdAlbum);
            }
        }
        frameAlbum();
    }

    //停止时间进度
    function stop() {
        var curTime = new Date().getTime();
        lastpercent = lastpercent + (curTime - startTime) / (allduration * 1000);
        cancelAnimationFrame(frameId);
    }
    //停止专辑转动
    function stopAlbum() {
        var curTime = new Date().getTime();
        if (startTime === undefined) {
            startTime = curTime;
        }
        lastpercentrotate = lastpercentrotate + (curTime - startTimeAlbum) / (allduration * 1000);
        cancelAnimationFrame(frameIdAlbum);
    }
    root.processor = {
        render,
        start,
        stop,
        update,
        stopAlbum,
        startAlbum
    };
}(window.Zepto, window.player || (window.player = {})))