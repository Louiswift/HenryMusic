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

async function playMain() {
    const order = localStorage.getItem('currentPlaySongOrder');
    const playList = JSON.parse(localStorage.getItem('playingList'));
    const { songId } = audio.dataset;
    // 0表示暂停，1表示正在播放
    let playTime = localStorage.getItem('playTime');
    audio.currentTime = playTime;

    localStorage.setItem('play', '1');

    let playingSongId = playList[order].id;
    await getsongLyric(playingSongId).then(resp => {
        lyric.innerText = '';
        let lrc = resp.lrc.lyric;
        lrcData = lrc
            .split('\n')
            .filter((s) => s)
            .map((s) => {
                const parts = s.split(']');
                const timeParts = parts[0].replace('[', '').split(':');
                return {
                    time: +timeParts[0] * 60 + +timeParts[1],
                    words: parts[1],
                };
            });
        lyric.innerHTML = lrcData.map((lrc) => `<li>${lrc.words}</li>`).join('');
        audio.addEventListener("timeupdate", () => {
            setStatus(audio.currentTime);
        });
        function setStatus(time) {
            time += 0.5;

            const activeLi = document.querySelector('.active');
            activeLi && activeLi.classList.remove('active');

            const index = lrcData.findIndex((lrc) => lrc.time > time) - 1;
            if (index < 0) {
                return;
            }
            lyric.children[index].classList.add('active');

            // 滚动
            const size = {
                liHeight: activeLi.offsetHeight,
                containerHeight: lyric.offsetHeight/activeLi.offsetHeight*17
            };
            let top = size.liHeight * index + size.liHeight / 2 - size.containerHeight / 2;
            top = -top;
            if(top > 0){
                top = 0;
            }
            lyric.style.transform = `translate3d(0, ${top}px, 0)`;
            lyric.style.transition = `2s`;
        }
    });
    if (playingSongId !== Number(songId)) {
        await setSongInfo(playList[order].id);
    }
    audio.play();
}

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


async function setSongInfo(songId) {
    const songName = document.querySelector("#songName");
    const singer = document.querySelector("#singerName");
    const pic = document.getElementById("pic");

    getSongDetails(songId).then(song => {
        pic.src = song.songs[0].al.picUrl;
        songName.innerText = song.songs[0].name;
        title.innerText = song.songs[0].name;
        for(let i = 0; i < song.songs[0].ar.length; i++){
            singer.innerText = song.songs[0].ar[i].name;
        }
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

audio.addEventListener("play", updateButton);
audio.addEventListener("pause", updateButton);