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
 * @param {固定参数} playMain 播放函数
 * @param {*} list 歌曲列表
 */
async function addDblClickEventListener(ul) {
    // 双击li播放歌曲
    ul.addEventListener("dblclick", async (event) => {
        localStorage.setItem('playTime', '0');

        let li = event.target.closest("li");
        if (!li) return;
        if (!ul.contains(li)) return;
        if (event.target) {
            audio.currentTime = 0;
        }
        let playList = JSON.parse(localStorage.getItem('playList'));
        localStorage.setItem('playingList', JSON.stringify(playList));

        const { songOrder,songId } = li.dataset;
        localStorage.setItem('currentPlaySongOrder', songOrder);
        playMain();
    });
}

/**
 * 设置正在看的歌曲
 * @param {*} list 歌曲数组
 */
async function settingUpViewing(list){
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
 * 单击歌单，进入歌单
 * @param {*} ul 点击的区域
 */
function clickOnPlaylist(ul) {
    ul.addEventListener("click", (event) => {
        let li = event.target.closest("li");
        if (!li) return;
        if (!ul.contains(li)) return;
        const { songId } = li.dataset;
        window.location.href = "list.html?id=" + songId;
    });
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
function creatList(list,ul) {
    if(list){
        for (let i = 0; i < list.length; i++) {
            const li = document.createElement("li");
            const div1 = document.createElement("div");
            const picDiv = document.createElement("div");
            const nameDiv = document.createElement("div");
            const img = document.createElement("img");
            const zj = document.createElement("div");
            const playTime = document.createElement("div");
            const xx = document.createElement("div");
            const singer = document.createElement("div");
    
            div1.id = "information";
            picDiv.classList = "pic";
            nameDiv.id = "information-name";
            nameDiv.classList = "f-thide";
            // f-thide
            zj.id = "information-zj";
            zj.classList = "f-thide";
            playTime.id = "information-count";
            xx.classList = "xx";
            singer.classList = "ar-name f-thide";
    
            nameDiv.innerText = list[i].name;
            img.src = list[i].al.picUrl;
            zj.innerText = list[i].al.name;
    
            let singerNames = '';
            for (let j = 0; j < list[i].ar.length; j++) {
                singerNames += list[i].ar[j].name;
                if (j < list[i].ar.length - 1) {
                    singerNames += ' / ';
                }
            }
            singer.innerHTML = singerNames;
    
            const { h, m, s } = duration(list[i].dt);
            playTime.innerText = h ? `${h}:${m}:${s}` : `${m}:${s}`
    
            li.dataset.songId = list[i].id
            li.dataset.songOrder = i
    
            li.appendChild(div1);
            div1.appendChild(picDiv);
            picDiv.appendChild(img);
            xx.appendChild(nameDiv);
            xx.appendChild(singer);
            div1.appendChild(xx);
            li.appendChild(zj);
            li.appendChild(playTime);
            ul.appendChild(li);
        }
    }else{
        console.log('未发现歌曲')
    }
}

/**
 * DOM生成歌单列表
 * @param {*} arr 遍历的歌单信息
 * @param {*} ul 生成至该元素
 */
function generatePlaylists(arr, ul) {
    for (let i = 0; i < arr.length; i++) {
        const newLi = document.createElement("li");
        const newA = document.createElement("a");
        const newDivImg = document.createElement("div");
        const newImg = document.createElement("img");
        const newDivText = document.createElement("div");

        newDivImg.classList.add("pic")
        newImg.classList.add("pic-img")
        newDivText.classList.add("text-list")

        let songListId = arr[i].id;
        newLi.setAttribute("data-song-id", songListId);

        newImg.src = arr[i].picUrl;
        newDivText.textContent = arr[i].name;

        newLi.appendChild(newA);
        newA.appendChild(newDivImg);
        newDivImg.appendChild(newImg);
        newA.appendChild(newDivText);
        ul.appendChild(newLi);
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

        let singerNames = '';
        for (let i = 0; i < song.songs[0].ar.length; i++) {
            singerNames += song.songs[0].ar[i].name;
            if (i < song.songs[0].ar.length - 1) {
                singerNames += ' / ';
            }
        }
        singer.innerHTML = singerNames;
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

    let playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            // Automatic playback started!
            // Show playing UI.
            // We can now safely pause video...
            video.pause();
        })
            .catch(error => {
                // Auto-play was prevented
                // Show paused UI.
            });
    }
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

/**
 * 生成搜索记录
 * @param {*} arr 遍历的数组
 * @param {*} hotHistoryWrap 遍历完添加至该元素
 */
function generateSearcHistory(arr, hotHistoryWrap) {
    for (let i = 0; i < arr.length; i++) {
        let li = document.createElement("li");
        li.innerText = arr[i].searchWord;
        hotHistoryWrap.appendChild(li);
    }
}