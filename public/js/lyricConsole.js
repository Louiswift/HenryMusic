const lyricprogressBar = document.querySelector('.console .progress-bar');
const lyricprogress = document.querySelector('.console #progress');
const lyriccurrentTimeSpan = document.querySelector('.console #currentTime');
let lyricdurationSpan = document.querySelector('.console #duration');
let lyricisDragging = false;
const lyricprogressBall = document.querySelector('.console #progressBall');

lyricprogressBar.addEventListener('click', (event) => {
    setProgress(event);
});

lyricprogressBar.addEventListener('mousedown', () => {
    lyricisDragging = true;
});

lyricprogressBar.addEventListener('mouseup', () => {
    lyricisDragging = false;
});

const lyricControl = document.querySelector('.console .playerbtn')
const lyricPreviousSong = document.querySelector(".console #PreviousSong");
const lyricplay = document.querySelector(".console #play");
const lyricsuspend = document.querySelector(".console #suspend");
const lyricnextSongs = document.querySelector(".console #nextSongs");

audio.addEventListener("play", updateButton);
audio.addEventListener("pause", updateButton);
updateButton();

// 控制台操作
songConsole(lyricControl, lyricplay, lyricsuspend, lyricPreviousSong, lyricnextSongs)

// 播放模式设置
const playMode = document.querySelector('#playMode');
const lyricsequentialPlayback = document.querySelector('#sequentialPlayback');
const lyricshuffle = document.querySelector('#shuffle');
const lyricsingleLoop = document.querySelector('#singleLoop');
const lyriclistLoop = document.querySelector('#listLoop');

playMode.addEventListener('click', (event) => {
    const button = event.target.closest("button");
    let { mode } = event.target.dataset;
    // console.log(mode)
    if (!button) return;
    if (!playMode.contains(button)) return;

    if (button == lyricsequentialPlayback) {
        localStorage.setItem('playmode', 1);
        lyricsequentialPlayback.style.display = "none";
        lyricshuffle.style.display = "block";
        lyricsingleLoop.style.display = "none";
        lyriclistLoop.style.display = "none";
    } else if (button == lyricshuffle) {
        localStorage.setItem('playmode', 2);
        lyricsequentialPlayback.style.display = "none";
        lyricshuffle.style.display = "none";
        lyricsingleLoop.style.display = "block";
        lyriclistLoop.style.display = "none";
    } else if (button == lyricsingleLoop) {
        localStorage.setItem('playmode', 3);
        lyricsequentialPlayback.style.display = "none";
        lyricshuffle.style.display = "none";
        lyricsingleLoop.style.display = "none";
        lyriclistLoop.style.display = "block";
    } else if (button == lyriclistLoop) {
        localStorage.setItem('playmode', 4);
        lyricsequentialPlayback.style.display = "block";
        lyricshuffle.style.display = "none";
        lyricsingleLoop.style.display = "none";
        lyriclistLoop.style.display = "none";
    }

})

let mode = localStorage.getItem('playmode');
if (mode == 1) {
    // 随机播放
    lyricsequentialPlayback.style.display = "none";
    lyricshuffle.style.display = "block";
    lyricsingleLoop.style.display = "none";
    lyriclistLoop.style.display = "none";
} else if (mode == 2) {
    // 单曲循环
    lyricsequentialPlayback.style.display = "none";
    lyricshuffle.style.display = "none";
    lyricsingleLoop.style.display = "block";
    lyriclistLoop.style.display = "none";
} else if (mode == 3) {
    // 列表循环
    lyricsequentialPlayback.style.display = "none";
    lyricshuffle.style.display = "none";
    lyricsingleLoop.style.display = "none";
    lyriclistLoop.style.display = "block";
} else if (mode == 4) {
    // 顺序播放
    lyricsequentialPlayback.style.display = "block";
    lyricshuffle.style.display = "none";
    lyricsingleLoop.style.display = "none";
    lyriclistLoop.style.display = "none";
}