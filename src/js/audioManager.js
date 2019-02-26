//管理 歌曲模块
(function ($, root) {
    function audioManager() {
        this.audio = new Audio();
        this.status = "pause";
    }
    audioManager.prototype = {
        //歌曲播放功能
        play() {
            this.audio.play();
            this.status = "play";
        },
        // 歌曲暂停功能
        pause() {
            this.audio.pause();
            this.status = "pause";
        },
        //切换歌曲音频路径
        setAudioSource(src) {
            this.audio.src = src;
            this.audio.load();
        },
        //在从指定时间开始播放
        jumptoPlay(duration) {
            this.audio.currentTime = duration;
            this.play();
        }
    }

    root.audioManager = audioManager;
}(window.Zepto, window.player || (window.player = {})))