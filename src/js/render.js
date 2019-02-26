//封装渲染模块
(function ($, root) {

    //渲染歌曲信息
    function renderInfo(data) {
        var $scope = $(document.body);
        var html = `
        <h1 class='song-name'>` + data.song + `</h1>
        <h3 class="singer-name">` + data.singer + `</h3>
        <h3 class="album-name">` + data.album + `</h3>`;
        $scope.find(".song-info").html(html);

    }

    //渲染歌曲图片
    function renderImage(src) {
        //预加载
        var img = new Image();
        img.src = src;
        img.onload = function () {
            $scope.find(".img-wrapper img").attr('src', src);
            root.blurImg(img, $scope);
        }
    }

    //渲染喜欢歌曲 
    function renderLikeBtn(isLike) {
        //数据库中的true和false 解析成字符串 '1'和'0'
        isLike = +isLike;
        if (isLike) {
            $scope.find(".like-btn").addClass("liked");
        } else {
            $scope.find(".like-btn").removeClass("liked");
        }
    }
    root.render = function (data) {
        renderInfo(data);
        renderImage(data.image);
        renderLikeBtn(data.isLike);
    }
}(window.Zepto, window.player || (window.player = {})));