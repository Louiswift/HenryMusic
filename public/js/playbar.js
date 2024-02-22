const control = document.querySelector(".playerbtn");
const PreviousSong = document.querySelector("#PreviousSong");
const play = document.querySelector("#play");
const suspend = document.querySelector("#suspend");
const nextSongs = document.querySelector("#nextSongs");
const audio = document.querySelector("#audio");
const lyric = document.querySelector(".lyric");

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

// 控制台操作
songConsole(control, play, suspend, PreviousSong, nextSongs)

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
    } else if (button == closePlaylist) {
        userInfoWrap.id = '';
        closePlaylist.style.display = 'none';
        openPlaylist.style.display = 'block';
        setTimeout(function () {
            userInfo.style.display = 'block';
            playingListWrap.style.display = 'none';
        }, 200);

    }
});

const container = document.querySelector('.container');
const lyricsPage = document.querySelector('.Lyrics-page');
const returnToPage = document.querySelector('#returnToPage');
const picWrap = document.querySelector('.pic');

picWrap.addEventListener('click', async () => {
    lyricsPage.id = 'lyricshow';
})
returnToPage.addEventListener('click', () => {
    lyricsPage.id = '';
})

let playiingList = JSON.parse(localStorage.getItem('playingList'));
if (playiingList) {
    playingList()
}
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
        creatList(playingList, ul);
        songsNumber.innerText = `共${count}首歌曲`;
    }
    addDblClickEventListener(ul);
    clickArnamelist(ul);
}

// 进度条
const progressBar = document.querySelector('.progress-bar');
const progress = document.querySelector('#progress');
const currentTimeSpan = document.querySelector('#currentTime');
const durationSpan = document.querySelector('#duration');
const progressBall = document.querySelector('#progressBall');
let isDragging = false;

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
    updateProgressBall();
});

const likeWrap = document.querySelector('.likeWrap');
const joinLikes = document.querySelector('#joinLikes');
const disLike = document.querySelector('#disLike');

likeWrap.addEventListener('click', (event) => {
    const playiiingList = JSON.parse(localStorage.getItem('playingList'));
    const currentPlaySongOrder = (localStorage.getItem('currentPlaySongOrder'));
    let button = event.target.closest('button');
    if (button.id === 'joinLikes') {
        likeMusic(playiiingList[currentPlaySongOrder].id, 640067993, 'add').then(resp => {
            console.log(resp)
        });
        joinLikes.style.display = 'none';
        disLike.style.display = 'block';
    } else if (button.id === 'disLike') {
        likeMusic(playiiingList[currentPlaySongOrder].id, 640067993, 'del').then(resp => {
            console.log(resp)
        });
        disLike.style.display = 'none';
        joinLikes.style.display = 'block';
    }
});