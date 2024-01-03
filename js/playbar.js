const control = document.querySelector(".playerbtn");
const PreviousSong = document.querySelector("#PreviousSong");
const play = document.querySelector("#play");
const suspend = document.querySelector("#suspend");
const nextSongs = document.querySelector("#nextSongs");
const audio = document.querySelector("#audio");

audio.addEventListener("timeupdate",() =>{
    localStorage.setItem('playTime',audio.currentTime);
})

async function playMain() {
    const order = localStorage.getItem('currentPlaySongOrder');
    const playList = JSON.parse(localStorage.getItem('playingList'));
    const { songId } = audio.dataset;
    // 0表示暂停，1表示正在播放
    let playTime = localStorage.getItem('playTime');
    audio.currentTime = playTime;

    localStorage.setItem('play', '1')

    if (playList[order].id !== Number(songId)) {
        await setSongInfo(playList[order].id);
    }
    audio.play();
}

async function setSongInfo(songId) {
    const songName = document.querySelector("#songName");
    const singer = document.querySelector("#singerName");
    const pic = document.getElementById("pic");

    getSongDetails(songId).then(song => {
        pic.src = song.songs[0].al.picUrl;
        songName.innerText = song.songs[0].name;
        singer.innerText = song.songs[0].ar[0].name;
    });

    await getSongUrl(songId).then(resp => {
        audio.src = resp.data[0].url;
        audio.dataset.songId = songId
    });
}

function updateButton() {
    if (audio.paused) {
        play.style.display = "block";
        suspend.style.display = "none";
    } else {
        play.style.display = "none";
        suspend.style.display = "block";
    }
}

updateButton();

control.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    let currentPlaySongOrder = Number(localStorage.getItem('currentPlaySongOrder'));
    const playListLen = JSON.parse(localStorage.getItem('playList') || []).length

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
        if (currentPlaySongOrder > 0) {
            localStorage.setItem('currentPlaySongOrder', currentPlaySongOrder - 1);
            playMain();
        }

    } else if (button == nextSongs) {
        if (currentPlaySongOrder < playListLen - 1) {
            localStorage.setItem('currentPlaySongOrder', currentPlaySongOrder + 1);
            playMain();
        }
    }
});

audio.addEventListener("play", updateButton);
audio.addEventListener("pause", updateButton);