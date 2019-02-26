var root = window.player;
var $ = window.Zepto;
var $scope = $(document.body);
var songList;
var controlmanager;
var audiomanager = new root.audioManager();
var processor = root.processor;
var frameId;
var stop = true;
var flagAlbum = true;
var playlist = root.playlist;

//自定义事件 
$scope.on("play:change", function (e, index, flag) {
    var curdata = songList[index];
    audiomanager.setAudioSource(curdata.audio);
    root.render(curdata);
    processor.render(curdata.duration);
    if (audiomanager.status === "play" || flag) {
        $scope.find(".play-btn").addClass("pause-btn");
        audiomanager.play();
        processor.start();
        processor.startAlbum();
        flagAlbum = true;
    }

})
//添加为喜欢
// $scope.on('click', '.like-btn', function () {
//     $scope.find('.like-btn').toggleClass('liked');
//     var index = controlmanager.index;
//     likeSong("http://127.0.0.1/music/like.php",{ sid: index + 1 + ""})
// })

// 上一首
$scope.on("click", ".prev-btn", function () {
    var index = controlmanager.prev();
    $scope.trigger("play:change", [index]);
    // 切换歌曲自动播放
    if (audiomanager.status === "pause") {
        $scope.find(".play-btn").addClass("pause-btn");
    }
    audiomanager.play();
    processor.start();
    processor.startAlbum();
    flagAlbum = true;

})

// 下一首
var next = function () {
    var index = controlmanager.next();
    $scope.trigger("play:change", [index]);
    // 切换歌曲自动播放
    if (audiomanager.status === "pause") {
        $scope.find(".play-btn").addClass("pause-btn");
    }
    audiomanager.play();
    processor.start();
    processor.startAlbum();
    flagAlbum = true;
};
$scope.on("click", ".next-btn", next)

// 播放暂停
$scope.on('click', ".play-btn", function () {
    if (audiomanager.status === "pause") {
        audiomanager.play();
        processor.start();
        processor.startAlbum();
        flagAlbum = true;
    } else {
        audiomanager.pause();
        processor.stop();
        processor.stopAlbum();
        flagAlbum = false;
        stop = true;
    }
    // toggleClass() 有目标classname就删除 没有就添加
    $scope.find(".play-btn").toggleClass("pause-btn");

})
//播放列表 显隐
$scope.on("click", '.list-btn', function () {
    playlist.show(controlmanager);
})

//绑定拖拽事件 快进和快退
function bindTouch() {
    var $slidePoint = $scope.find(".slide-point");
    var offset = $scope.find(".pro-wrapper").offset();
    var left = offset.left;
    var width = offset.width;
    $slidePoint.on("touchstart", function (e) {
        processor.stop();
    }).on("touchmove", function (e) {
        stop = false;
        var x = e.changedTouches[0].clientX
        var percent = (x - left) / width;
        if (percent > 1) {
            percent = 0.9985;
        }
        if (percent < 0) {
            percent = 0;
        }
        processor.update(percent);
    }).on("touchend", function (e) {
        var x = e.changedTouches[0].clientX
        var percent = (x - left) / width;
        if (percent > 1) {
            percent = 0.9985;
        }
        if (percent < 0) {
            percent = 0;
        }
        $scope.find(".play-btn").addClass("pause-btn");
        processor.start(percent);
        if (!flagAlbum && !stop) {
            processor.startAlbum();
            stop = true;
            flagAlbum = true;
        }
        // 获取当前歌曲总时长 并跳转指定位置
        var curDuration = songList[controlmanager.index].duration;
        var duration = curDuration * percent;
        audiomanager.jumptoPlay(duration);
    })
}
//检测是否播放完毕 如果播放完毕自动播放下一首
function frame() {
    cancelAnimationFrame(frameId);
    // if (stop) {
    var offset = $scope.find(".slide-point").offset();
    var left = offset.left;
    if (left > 301.5) {
        var index = controlmanager.next();
        $scope.trigger("play:change", [index]);
        // 切换歌曲自动播放
        if (audiomanager.status === "pause") {
            $scope.find(".play-btn").addClass("pause-btn");
        }
        audiomanager.play();
        processor.start();
    }
    // }
    frameId = requestAnimationFrame(frame);
}
frame();


// 定义获取数据函数
function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "jsonp",
        jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        success: function (json) {
            console.log('success');
        },
        error: function () {
            console.log('fail');
        }
    });
}

//修改喜欢歌曲
// function likeSong(url,data) {
//     $.ajax({
//         type: "GET",
//         url: url,
//         data: data,
//         dataType: "jsonp",
//         jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
//         jsonpCallback: "success_jsonpCallback_like", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
//         success: function (json) {
//             console.log('success');
//         },
//         error: function () {
//             console.log('fail');
//         }
//     });
// }

//定义回调函数
function success_jsonpCallback(data) {
    bindTouch();
    songList = data;
    controlmanager = new root.controlManager(data.length);
    $scope.trigger("play:change", [0]);
    playlist.render(data);
}

// function success_jsonpCallback_like(data) {
//     console.log(data);
//     data.isLike = "1";
// }

// 获取数据（跨域）
getData("http://127.0.0.1/music/music.php");