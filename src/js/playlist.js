// 渲染播放列表
(function ($, root) {
    var controlmanager;
    var $scope = $(document.body);
    var $playlist = $(`
    <div class='playlist'>
        <div class='line-head'>播放列表</div>
        <ul class='play-list-wrap'></ul>
        <div class='close-btn'>关闭</div>
    </div>`)
    // 歌曲名 和 歌手
    function render(data) {
        var html = '';
        var len = data.length;
        for (let i = 0; i < len; i++) {
            html += "<li><h3>" + data[i].song + "-<span>" + data[i].singer + "</span></h3></li>";
        }
        $playlist.find('ul').html(html);
        $scope.append($playlist);
    }
    // 点击歌曲自动播放
    function bindEvent() {
        $playlist.on('click', '.close-btn', function () {
            $playlist.removeClass('show');
        });
        $playlist.on('click', 'li', function (index) {
            var index = $(this).index();
            console.log(index);
            $scope.trigger("play:change", [index,true]);
            singsong(index);
        })
    }
    // 显示
    function show(control) {
        controlmanager = control;
        var index = controlmanager.index;
        $playlist.addClass('show');
        singsong(index);
        bindEvent();
    }
    // 播放按钮样式
    function singsong(index) {
        $playlist.find(".playing").removeClass("playing");
        $playlist.find("ul li").eq(index).addClass("playing");
    }
    root.playlist = {
        render,
        show,
        singsong,
        bindEvent
    }
}(window.Zepto, window.player || (window.player = {})))