const control = document.querySelector(".playerbtn");
const PreviousSong = document.querySelector("#PreviousSong");
const play = document.querySelector("#play");
const suspend = document.querySelector("#suspend");
const nextSongs = document.querySelector("#nextSongs");
const audio = document.querySelector("#audio");
const lyric = document.querySelector(".lyric");
const title = document.querySelector('title');

audio.addEventListener("timeupdate", () => {
    localStorage.setItem('playTime', audio.currentTime);
});

// 点击进入歌手主页
const playbarsinger = document.querySelector('#playbarsinger');
clickArname(playbarsinger);

// 自动播放下一首歌曲
audio.addEventListener('ended', async () => {
    audio.currentTime = 0;
    const playList = JSON.parse(localStorage.getItem('playingList'));
    let currentPlaySongOrder = Number(localStorage.getItem('currentPlaySongOrder'));
    localStorage.setItem('currentPlaySongOrder', currentPlaySongOrder + 1);
    if (currentPlaySongOrder + 1 < playList.length) {
        await setSongInfo(playList[currentPlaySongOrder + 1].id);
        playMain();
    } else {
        console.log('播放列表已经播放完毕');
    }
});
audio.addEventListener("play", updateButton);
audio.addEventListener("pause", updateButton);
updateButton();

control.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    let currentPlaySongOrder = Number(localStorage.getItem('currentPlaySongOrder'));
    const playListLen = JSON.parse(localStorage.getItem('playingList') || []).length

    if (!button) return;
    if (!control.contains(button)) return;

    if (button == play) {
        play.style.display = "none";
        suspend.style.display = "block";
        playMain();
    } else if (button == suspend) {
        suspend.style.display = "none";
        play.style.display = "block";
        localStorage.setItem('play', '0');
        let playTime = localStorage.getItem('playTime');
        audio.currentTime = playTime;
        audio.pause();
    } else if (button == PreviousSong) {
        if (currentPlaySongOrder >= 0) {
            localStorage.setItem('currentPlaySongOrder', currentPlaySongOrder - 1);

            let len = JSON.parse(localStorage.getItem('playingList')).length - 1;
            if (currentPlaySongOrder == 0) {
                localStorage.setItem('currentPlaySongOrder', len);
            }
            playMain();
        }
    } else if (button == nextSongs) {
        if (currentPlaySongOrder <= playListLen - 1) {
            localStorage.setItem('currentPlaySongOrder', currentPlaySongOrder + 1);

            let len = JSON.parse(localStorage.getItem('playingList')).length - 1;
            if (currentPlaySongOrder == len) {
                localStorage.setItem('currentPlaySongOrder', 0);
            }
            playMain();
        }
    }
});

const rightTop = document.querySelector(".rightTop");
const lyricWrap = document.querySelector("#lyric-wrap");
const MusicPlaylist = document.querySelector('.Music-playlist');
const openLyrics = document.querySelector('#openLyrics');
const closeLyrics = document.querySelector('#closeLyrics');
const openPlaylist = document.querySelector('#openPlaylist');
const closePlaylist = document.querySelector('#closePlaylist');
const userInfo = document.querySelector('.userInfo');
const playingListWrap = document.querySelector('.playingList');

MusicPlaylist.addEventListener('click', (event) => {
    let button = event.target.closest("button");
    if (!button) return;
    if (!MusicPlaylist.contains(button)) return;
    if (button == openLyrics) {
        console.log('打开歌词');
        rightTop.style.display = "none";
        lyricWrap.style.display = "block";
        openLyrics.style.display = 'none';
        closeLyrics.style.display = 'block';
    } else if (button == closeLyrics) {
        console.log('关闭歌词');
        rightTop.style.display = "block";
        lyricWrap.style.display = "none";
        closeLyrics.style.display = 'none';
        openLyrics.style.display = 'block';
    } else if (button == openPlaylist) {
        userInfoWrap.id = 'show';
        userInfo.style.display = 'none';
        openPlaylist.style.display = 'none';
        closePlaylist.style.display = 'block';
        playingListWrap.style.display = 'block';
        playingList();
    } else if (button == closePlaylist) {
        userInfoWrap.id = '';
        closePlaylist.style.display = 'none';
        userInfo.style.display = 'block';
        openPlaylist.style.display = 'block';
        playingListWrap.style.display = 'none';
    }
});

async function playingList() {
    let playingList = JSON.parse(localStorage.getItem('playingList'));
    let ul = document.querySelector('.playingList #list');
    let songsNumber = document.querySelector('#songsNumber');

    ul.innerHTML = '';
    let count = 0;
    if (playingList) {
        for (let i = 0; i < playingList.length; i++) {
            count++;
        }
        console.log('检测到有真正播放的歌曲，开始生成歌单');
        creatList(playingList,ul);
        songsNumber.innerText = `共${count}首歌曲`;
    }
    addDblClickEventListener(ul);
}

// 进度条
const progressBar = document.querySelector('.progress-bar');
const progress = document.getElementById('progress');
const currentTimeSpan = document.getElementById('currentTime');
const durationSpan = document.getElementById('duration');
let isDragging = false;

function updateProgressBar() {
    const progressPercentage = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercentage}%`;

    const currentTime = formatTime(audio.currentTime);
    currentTimeSpan.textContent = currentTime;

    const duration = formatTime(audio.duration);
    durationSpan.textContent = duration;
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(number) {
    return number.toString().padStart(2, '0');
}

function setProgress(event) {
    const progressBarWidth = progressBar.clientWidth;
    const clickX = event.offsetX;
    const progressPercentage = (clickX / progressBarWidth) * 100;
    progress.style.width = `${progressPercentage}%`;
    const newTime = (progressPercentage / 100) * audio.duration;
    audio.currentTime = newTime;
}

progressBar.addEventListener('click', (event) => {
    setProgress(event);
});


progressBar.addEventListener('mousedown', () => {
    isDragging = true;
});

progressBar.addEventListener('mouseup', () => {
    isDragging = false;
});

audio.addEventListener('timeupdate', () => {
    updateProgressBar();
});

const progressBall = document.getElementById('progressBall');

function updateProgressBall() {
    const progressPercentage = (audio.currentTime / audio.duration) * 100;
    const progressBallPosition = (progressPercentage / 100) * progressBar.clientWidth;
    progressBall.style.transform = `translateX(${progressBallPosition}px)`;
}

audio.addEventListener('timeupdate', () => {
    updateProgressBar();
    updateProgressBall();
});
