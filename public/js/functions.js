/**
 * 取网页链接name后的值
 * @param {*} name 例如：name = 123123 该函数传参就是id
 * @returns 返回值为123123;
 */
function getParameterByName(name) {
    let url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**
 * 
 * @param {*} ul 点击的区域
 * @param {固定参数} audio 音频源
 * @param {固定参数} playMain 播放函数
 * @param {*} list 歌曲列表
 */
async function addDblClickEventListener(ul, audio, playMain, list) {
    // 双击li播放歌曲
    ul.addEventListener("dblclick", async (event) => {
        localStorage.setItem('playTime', '0');

        let li = event.target.closest("li");
        if (!li) return;
        if (!ul.contains(li)) return;
        if(event.target){
        audio.currentTime = 0;  
        }
        let playList = JSON.parse(localStorage.getItem('playList'));
        localStorage.setItem('playingList', JSON.stringify(playList));

        const { songOrder } = li.dataset;
        localStorage.setItem('currentPlaySongOrder', songOrder);
        playMain();
    });
    localStorage.setItem('playList', JSON.stringify(list));
    const playingList = (localStorage.getItem('playingList') || []);

    if (playingList.length === 0) {
        localStorage.setItem('playingList', JSON.stringify(list));
    }
    const playStatus = localStorage.getItem('play');
    if (playStatus === '1') {
        playMain();
    } else {
        const songId = playingList[localStorage.getItem('currentPlaySongOrder')].id;
        await setSongInfo(songId);
    }
}

/**
 * 将接口中获取的歌曲信息，转换为该歌曲的详细信息
 * @param {*} list 存放转换后的歌曲数组
 * @param {*} songs 需要转换的歌曲数组
 */
async function improveSongInformation(list, songs) {
    for (let i = 0; i < songs.length; i++) {
        let id = songs[i].id
        await getSongDetails(id).then(resp => {
            list.push(resp.songs[0]);
        });
    }
}

/**
 * Dom生成歌曲列表
 * @param {*} list 包含歌曲的数组
 */
function creatList(list) {
    let ul = document.querySelector('#list')
    for (let i = 0; i < list.length; i++) {
        const li = document.createElement("li");
        const div1 = document.createElement("div");
        const picDiv = document.createElement("div");
        const nameDiv = document.createElement("div");
        const img = document.createElement("img");
        const zj = document.createElement("div");
        const tjtime = document.createElement("div");
        const playTime = document.createElement("div");
        const xx = document.createElement("div");
        const arName = document.createElement("div");

        div1.id = "information";
        picDiv.classList = "pic";
        nameDiv.id = "information-name";
        zj.id = "information-zj";
        tjtime.id = "information-time";
        playTime.id = "information-count";
        xx.classList = "xx";
        arName.classList = "ar-name";

        nameDiv.innerText = list[i].name;
        img.src = list[i].al.picUrl;
        zj.innerText = list[i].al.name;
        arName.innerText = list[i].ar[0].name;

        const { h, m, s } = duration(list[i].dt);
        playTime.innerText = h ? `${h}:${m}:${s}` : `${m}:${s}`

        li.dataset.songId = list[i].id
        li.dataset.songOrder = i

        li.appendChild(div1);
        div1.appendChild(picDiv);
        picDiv.appendChild(img);
        xx.appendChild(nameDiv);
        xx.appendChild(arName);
        div1.appendChild(xx);
        li.appendChild(zj);
        li.appendChild(tjtime);
        li.appendChild(playTime);
        ul.appendChild(li);
    }
}

/**
 * 歌曲时长
 * @param {*} time 歌曲信息接口中的dt属性值
 * @returns 
 */
function duration(time) {
    const seconds = time / 1000
    let h = parseInt(seconds / (60 * 60) % 24);
    let m = parseInt(seconds / 60 % 60);
    let s = parseInt(seconds % 60);

    return { h, m: addZero(m), s: addZero(s) };
}

/**
 * 判断是否加0
 * @param {*} time 
 * @returns 
 */
function addZero(time) {
    return time < 10 ? '0' + time : time
}

/**
 * 设置歌曲信息
 * @param {*} songId 歌曲Id
 */
async function setSongInfo(songId) {
    const songName = document.querySelector("#songName");
    const singer = document.querySelector("#singerName");
    const pic = document.getElementById("pic");

    // 获取歌曲信息
    await getSongDetails(songId).then(song => {
        console.log(song)
        pic.src = song.songs[0].al.picUrl;
        songName.innerText = song.songs[0].name;
        title.innerText = song.songs[0].name;
        for (let i = 0; i < song.songs[0].ar.length; i++) {
            singer.innerText = song.songs[0].ar[i].name;
        }
    });

    // 获取歌曲URL
    await getSongUrl(songId).then(resp => {
        audio.src = resp.data[0].url;
        audio.dataset.songId = songId
    });
}

/**
 * 播放功能
 */
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

            if (lyricWrap.style.display == "block") {
                // 滚动
                const size = {
                    liHeight: activeLi.offsetHeight,
                    containerHeight: lyric.offsetHeight / activeLi.offsetHeight * 17
                };
                if (size.containerHeight !== Infinity) {
                    let top = size.liHeight * index + size.liHeight / 2 - size.containerHeight / 2;
                    top = -top;
                    if (top > 0) {
                        top = 0;
                    }
                    lyric.style.transform = `translate3d(0, ${top}px, 0)`;
                    lyric.style.transition = `2s`;
                }
            }
        }
    });
    if (playingSongId !== Number(songId)) {
        await setSongInfo(playList[order].id);
    }
    audio.play();
}

/**
 * 设置控制台播放按钮ico
 */
function updateButton() {
    if (audio.paused) {
        play.style.display = "block";
        suspend.style.display = "none";
    } else {
        play.style.display = "none";
        suspend.style.display = "block";
    }
}