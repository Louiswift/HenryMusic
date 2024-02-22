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
