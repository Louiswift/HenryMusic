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
 * 单击播放栏歌手名，进入歌手主页
 * @param {*} singer 传入歌手文本父元素
 */
function clickArname(singer) {
    singer.addEventListener('click', (event) => {
        let a = event.target.closest("a");
        if (!a) return;
        if (!singer.contains(a)) return;

        const { singerId } = event.target.dataset;
        window.location.href = "artist.html?id=" + singerId;
    })
}

/**
 * 单击列表歌手名，进入歌手主页
 * @param {*} songList 传入歌手文本父元素
 */
function clickArnamelist(songList) {
    songList.addEventListener("click", (event) => {
        const li = event.target.closest("#singerName");
        if (!li) return;
        if (!songList.contains(li)) return;

        let { singerId } = event.target.dataset;
        if (Object.keys(event.target.dataset).length === 0) {
            let { singerId } = li.dataset;
            window.location.href = "artist.html?id=" + singerId;
            return;
        }
        window.location.href = "artist.html?id=" + singerId;
    });
}

/**
 *双击播放歌曲
 * @param {*} ul 点击的区域
 */
async function addDblClickEventListener(ul) {
    ul.addEventListener("dblclick", async (event) => {
        localStorage.setItem('playTime', '0');
        const { firstId } = event.target.closest("ul").dataset;
        let li = event.target.closest("li");
        if (!li) return;
        if (!ul.contains(li)) return;
        if (event.target) {
            audio.currentTime = 0;
        }

        const playinglist = JSON.parse(localStorage.getItem('playingList'));

        if (Number(firstId) !== playinglist[0].id) {
            exchangePlaylists();
            playingList();
        }

        const { songOrder, songId } = li.dataset;
        localStorage.setItem('currentPlaySongOrder', songOrder);
        playMain();
    });
}

/**
 * 将正在看的歌单赋值给正在听的
 */
function exchangePlaylists() {
    let playList = JSON.parse(localStorage.getItem('playList'));
    localStorage.setItem('playingList', JSON.stringify(playList));
}

/**
 * 设置正在看的歌曲
 * @param {*} list 歌曲数组
 */
async function settingUpViewing(list) {
    localStorage.setItem('playList', JSON.stringify(list));
    const playingList = JSON.parse(localStorage.getItem('playingList')) || [];

    if (playingList.length === 0) {
        localStorage.setItem('playingList', JSON.stringify(list));
    }
    const playStatus = localStorage.getItem('play');
    if (playStatus === '1') {
        playMain();
    } else {
        if (playingList.length > 0) {
            // const songId = playingList[localStorage.getItem('currentPlaySongOrder')].id;
            // await setSongInfo(songId);
        } else {
            console.log('没有正在看的歌曲哦')
        }
    }
}

/**
 * 单击歌单，进入歌单
 * @param {*} ul 点击的区域
 */
function clickOnPlaylist(ul) {
    ul.addEventListener('click', handlePlaylistClick);
    function handlePlaylistClick(event) {
        const target = event.target;

        if (target.id == 'playAll' && target.tagName === 'BUTTON') {
            console.log('播放歌单所有歌曲');
            let li = event.target.closest("li");
            const { songId } = li.dataset;
            playAllSongs(songId);
        } else if (target.id == 'delPlaylistBtn' && target.tagName === 'BUTTON') {
            console.log('删除歌单')
        } else {
            let li = event.target.closest("li");
            const { songId, singerId } = li.dataset;
            window.location.href = "list.html?id=" + (songId || singerId);
        }
    }
}

/**
 * 播放歌单中所有歌曲
 * @param {*} id 歌单id
 */
function playAllSongs(id) {
    getAllsongsOnThePlaylist(id).then(resp => {
        const songs = resp.songs;
        localStorage.setItem('currentPlaySongOrder', 0);
        localStorage.setItem('playingList', JSON.stringify(songs));
        playMain();
    })
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
function creatList(list, ul) {
    ul.dataset.firstId = list[0].id
    if (list) {
        for (let i = 0; i < list.length; i++) {
            const li = document.createElement("li");
            const div1 = document.createElement("div");
            const picDiv = document.createElement("div");
            const nameDiv = document.createElement("div");
            const img = document.createElement("img");
            const zj = document.createElement("div");
            const playTime = document.createElement("div");
            const xx = document.createElement("div");
            const playbarsinger = document.createElement("div");
            const orderWrap = document.createElement("div");
            const order = document.createElement("div");

            orderWrap.id = 'orderWrap';
            order.id = 'order';
            div1.id = "information";
            picDiv.classList = "pic";
            nameDiv.id = "information-name";
            nameDiv.classList = "f-thide";
            zj.id = "information-zj";
            zj.classList = "f-thide";
            playTime.id = "information-count";
            xx.classList = "xx";
            playbarsinger.classList = "singer f-thide";
            playbarsinger.id = 'playlistSinger';

            nameDiv.innerText = list[i].name;
            img.src = list[i].al.picUrl;
            zj.innerText = list[i].al.name;
            order.textContent = i + 1;

            playbarsinger.innerHTML = '';
            for (let j = 0; j < list[i].ar.length; j++) {
                let a = document.createElement('a');
                a.id = 'singerName';
                playbarsinger.appendChild(a);
                a.textContent = list[i].ar[j].name;
                a.setAttribute('data-singer-id', list[i].ar[j].id);

                if (j < list[i].ar.length - 1) {
                    let span = document.createElement('span');
                    span.textContent = ' / ';
                    playbarsinger.appendChild(span)
                }
            }

            const { h, m, s } = duration(list[i].dt);
            playTime.innerText = h ? `${h}:${m}:${s}` : `${m}:${s}`

            li.dataset.songId = list[i].id
            li.dataset.songOrder = i

            li.appendChild(div1);
            div1.appendChild(orderWrap);
            orderWrap.appendChild(order);
            div1.appendChild(picDiv);
            picDiv.appendChild(img);
            xx.appendChild(nameDiv);
            xx.appendChild(playbarsinger);
            div1.appendChild(xx);
            li.appendChild(zj);
            li.appendChild(playTime);
            ul.appendChild(li);
        }
    } else {
        console.log('未发现歌曲')
    }
}

/**
 * DOM生成相似XX
 * @param {*} artist 歌手数组
 * @param {*} ul 生成至该元素
 */
function creatSimilarSingers(artist, ul) {
    for (let i = 0; i < artist.length; i++) {
        let li = document.createElement('li');
        let imgWrap = document.createElement('div');
        let img = document.createElement('img');
        let singerName = document.createElement('a');

        imgWrap.classList = 'imgWrap';
        singerName.id = 'singer';
        li.id = 'singerName';
        li.setAttribute('data-singer-id', artist[i].id);

        li.appendChild(imgWrap)
        li.appendChild(singerName)
        imgWrap.appendChild(img);
        ul.appendChild(li);

        if (artist[i].img1v1Url) {
            img.src = artist[i].img1v1Url;
        } else {
            img.src = artist[i].coverImgUrl;
        }
        singerName.textContent = artist[i].name;
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
        const button = document.createElement('button');

        newDivImg.classList.add("pic");
        newImg.classList.add("pic-img");
        newDivText.classList.add("text-list");
        button.id = 'playAll';

        let songListId = arr[i].id;
        newLi.setAttribute("data-song-id", songListId);

        newImg.src = arr[i].picUrl;
        newDivText.textContent = arr[i].name;
        button.innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
        class="Svg-sc-ytk21e-0 bneLcE"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
    </svg>`;

        newLi.appendChild(newA);
        newA.appendChild(newDivImg);
        newDivImg.appendChild(newImg);
        newDivImg.appendChild(button);
        newA.appendChild(newDivText);
        ul.appendChild(newLi);
    }
}

/**
 * 创建你的歌单
 * @param {*} playlist 需要生成的歌单数组
 * @param {*} ul 生成至该元素
 */
function createYourPlaylist(playlist, ul, ul2) {
    for (let i = 0; i < playlist.length; i++) {
        // 创建dom
        const li = document.createElement('li');
        const a = document.createElement('a');
        const img = document.createElement('img');
        const div = document.createElement('div');

        // 给dom赋值class & 值
        div.classList = 'txtplaylistName f-thide';
        img.src = playlist[i].coverImgUrl;
        div.textContent = playlist[i].name;
        li.setAttribute("data-song-id", playlist[i].id);

        // 将dom拼装
        a.appendChild(img);
        a.appendChild(div);
        li.appendChild(a);
        if (playlist[i].subscribed == true) {
            ul.appendChild(li);
        } else {
            ul2.appendChild(li);
        }
    }
}

/**
 * 创建音乐库的歌单
 * @param {*} playlist 需要生成的歌单数组
 * @param {*} ul 生成至该元素
 */
function CreateLibraryPlaylists(playlist, ul) {
    for (let i = 0; i < playlist.length; i++) {
        const li = document.createElement('li');

        li.setAttribute("data-song-id", playlist[i].id);

        li.innerHTML = `<a href="#">
        <div class="icon">
            <img
                src="${playlist[i].coverImgUrl}">
        </div>
        <div class="text-songsheet f-thide">
            ${playlist[i].name}
        </div>
    </a>
    <button id="delPlaylistBtn">
        <svg t="1708954270110" class="icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="3416" width="200" height="200">
            <path d="M0 0h1024v1024H0z" fill="#515151" opacity=".01" p-id="3417"></path>
            <path
                d="M343.074133 57.480533A34.133333 34.133333 0 0 1 375.466667 34.133333h273.066666a34.133333 34.133333 0 0 1 32.392534 23.3472L695.876267 102.4H887.466667a68.266667 68.266667 0 0 1 68.266666 68.266667v68.266666a68.266667 68.266667 0 0 1-68.266666 68.266667v512a170.666667 170.666667 0 0 1-170.666667 170.666667H307.2a170.666667 170.666667 0 0 1-170.666667-170.666667V307.2a68.266667 68.266667 0 0 1-68.266666-68.266667V170.666667a68.266667 68.266667 0 0 1 68.266666-68.266667h191.5904l14.9504-44.919467zM716.8 307.2H204.8v512a102.4 102.4 0 0 0 102.4 102.4h409.6a102.4 102.4 0 0 0 102.4-102.4V307.2h-102.4z m170.666667-68.266667V170.666667h-216.1664a34.133333 34.133333 0 0 1-32.392534-23.3472L623.9232 102.4h-223.8464l-14.984533 44.919467a34.133333 34.133333 0 0 1-32.392534 23.3472H136.533333v68.266666h750.933334z m-477.866667 204.8a34.133333 34.133333 0 1 0-68.266667 0v341.333334a34.133333 34.133333 0 1 0 68.266667 0V443.733333z m273.066667 0a34.133333 34.133333 0 1 0-68.266667 0v341.333334a34.133333 34.133333 0 1 0 68.266667 0V443.733333z"
                fill="#B3B3B3" p-id="3418"></path>
        </svg>
    </button>`
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
 * @param {*} songName 歌曲名
 * @param {*} pic 歌曲pic
 * @param {*} playbarsinger 歌手名字
 * @param {*} songId 歌曲Id
 */
async function setSongInfo(songId) {
    const songName = document.querySelector("#songName");
    const pic = document.querySelector("#pic");
    const playbarsinger = document.querySelector('#playbarsinger');

    const lyricSongName = document.querySelector(".musicInfo #songName");
    const lyricPic = document.querySelector(".picWrap #pic");
    const lyricSinger = document.querySelector('.musicInfo #playbarsinger');
    const lyricBgImage = document.querySelector('.lyricBgImage');
    const lyricWrap = document.querySelector("#lyric-wrap");

    clickArname(lyricSinger);

    if (songId) {
        // 获取歌曲信息
        await getSongDetails(songId).then(song => {
            pic.src = song.songs[0].al.picUrl;
            songName.textContent = song.songs[0].name;
            title.innerText = song.songs[0].name;

            lyricPic.src = song.songs[0].al.picUrl;
            let pirurl = song.songs[0].al.picUrl;
            checkWhitePercentage(pirurl, 50, 'https://p1.music.126.net/0WHLmSNY4bNaiy6oVWGJ3w==/109951169300999067.jpg');
            // lyricBgImage.style.backgroundImage = `url(${song.songs[0].al.picUrl})`;
            lyricSongName.textContent = song.songs[0].name;

            playbarsinger.innerHTML = '';
            lyricSinger.innerHTML = '';

            for (let i = 0; i < song.songs[0].ar.length; i++) {
                let a = document.createElement('a');
                a.id = 'singerName';
                playbarsinger.appendChild(a);

                a.textContent = song.songs[0].ar[i].name;
                a.setAttribute('data-singer-id', song.songs[0].ar[i].id);

                if (i < song.songs[0].ar.length - 1) {
                    let span = document.createElement('span');
                    span.textContent = ' / ';
                    playbarsinger.appendChild(span);
                }
            }
            for (let i = 0; i < song.songs[0].ar.length; i++) {
                let a = document.createElement('a');
                a.id = 'singerName';
                lyricSinger.appendChild(a);
                a.textContent = song.songs[0].ar[i].name;
                a.setAttribute('data-singer-id', song.songs[0].ar[i].id);

                if (i < song.songs[0].ar.length - 1) {
                    let span = document.createElement('span');
                    span.textContent = ' / ';
                    lyricSinger.appendChild(span);
                }
            }
            let durationSpan = document.querySelector('#duration');
            const { h, m, s } = duration(song.songs[0].dt);
            durationSpan.textContent = h ? `${h}:${m}:${s}` : `${m}:${s}`
        });

        // 该歌曲是否在喜欢列表中
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            if (user.account !== null) {
                getUserPlaylists(user.account.id).then(async resp => {
                    const playlist = resp.playlist;
                    const id = playlist[0].id;
                    getPlaylistsDetail(id).then(async resp => {
                        const list = resp.playlist.tracks;
                        for (let i = 0; i < list.length; i++) {
                            if (list[i].id == songId) {
                                disLike.style.display = 'block';
                                joinLikes.style.display = 'none';
                                return
                            } else {
                                disLike.style.display = 'none';
                                joinLikes.style.display = 'block';
                            }
                        }
                    })
                })
            }
        } else {
            console.log('没有登录哦！')
            joinLikes.style.display = 'none';
            disLike.style.display = 'none';
        }

        // 获取歌曲URL
        await getSongUrl(songId).then(resp => {
            if (resp.data[0].url) {
                audio.src = resp.data[0].url;
                audio.dataset.songId = songId;
            } else {
                console.log('没有该资源哦！')
            }
        });

        // 获取歌词
        await getsongLyric(songId).then(resp => {
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
                if (activeLi) {
                    const size = {
                        liHeight: activeLi.offsetHeight,
                        containerHeight: lyricWrap.offsetHeight
                    };
                    if (size.containerHeight !== Infinity) {
                        let top = size.liHeight * index + size.liHeight / 2 - size.containerHeight / 2;
                        top = -top;
                        if (top > 0) {
                            top = 0;
                        }
                        lyric.style.transform = `translate3d(0, ${top + 40}px, 0)`;
                        lyric.style.transition = `2s`;
                    }
                }
            }
        });
    } else {
        console.log('没有获取到歌曲id');
    }
};

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

    if (playingSongId !== Number(songId)) {
        await setSongInfo(playList[order].id);
    }

    let playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            video.pause();
        })
            .catch(error => { });
    }
}

/**
 * 设置控制台播放按钮ico
 */
function updateButton() {
    const play = document.querySelector("#play");
    const suspend = document.querySelector("#suspend");
    const lyricplay = document.querySelector(".console #play");
    const lyricsuspend = document.querySelector(".console #suspend");
    if (audio.paused) {
        play.style.display = "block";
        suspend.style.display = "none";

        lyricplay.style.display = "block";
        lyricsuspend.style.display = "none";
    } else {
        play.style.display = "none";
        suspend.style.display = "block";

        lyricplay.style.display = "none";
        lyricsuspend.style.display = "block";
    }
}
/**
 * 播放暂停上下一首控制台
 * @param {*} control 点击按钮的父元素
 * @param {*} play 播放按钮
 * @param {*} suspend 暂停按钮
 * @param {*} PreviousSong 上一首
 * @param {*} nextSongs 下一首
 */
function songConsole(control, play, suspend, PreviousSong, nextSongs) {
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

/**
 * 登陆成功后，返回登录信息
 */
async function getUserInfo() {
    await loginStatus().then(async resp => {
        localStorage.setItem('user', JSON.stringify(resp.data));
        console.log('已经设置用户信息')
    })
};

/**
 * 更新播放进度条的显示
 */
function updateProgressBar() {
    const progressPercentage = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercentage}%`;
    lyricprogress.style.width = `${progressPercentage}%`;

    currentTimeSpan.textContent = formatTime(audio.currentTime);
    lyriccurrentTimeSpan.textContent = formatTime(audio.currentTime);
    durationSpan.textContent = formatTime(audio.duration);
    lyricdurationSpan.textContent = formatTime(audio.duration);
}

/**
 * 时间转换
 * @param {*} time 时间
 * @returns 
 */
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${addZero(minutes)}:${addZero(seconds)}`;
}

/**
 * 根据用户点击的位置设置播放进度条的位置
 * @param {*} event 点击的位置
 */
function setProgress(event) {
    const progressBarWidth = progressBar.clientWidth;
    const lyricprogressBarWidth = lyricprogressBar.clientWidth;
    const clickX = event.offsetX;
    const progressPercentage = (clickX / progressBarWidth) * 100;
    const lyricprogressPercentage = (clickX / lyricprogressBarWidth) * 100;
    progress.style.width = `${progressPercentage}%`;
    lyricprogress.style.width = `${lyricprogressPercentage}%`;
    const { progressOrder } = event.target.dataset;
    if (progressOrder == 1) {
        audio.currentTime = (progressPercentage / 100) * audio.duration;
    } else if (progressOrder == 2) {
        audio.currentTime = (lyricprogressPercentage / 100) * audio.duration;
    }
}

/**
 * 更新进度条上的球的位置，保持与播放进度条的位置一致
 */
function updateProgressBall() {
    const progressPercentage = (audio.currentTime / audio.duration) * 100;
    const progressBallPosition = (progressPercentage / 100) * progressBar.clientWidth;
    progressBall.style.transform = `translateX(${progressBallPosition}px)`;

    const lyricprogressPercentage = (audio.currentTime / audio.duration) * 100;
    const lyricprogressBallPosition = (lyricprogressPercentage / 100) * lyricprogressBar.clientWidth;
    lyricprogressBall.style.transform = `translateX(${lyricprogressBallPosition}px)`;
}

/**
 * 播放模式icon切换
 * @param {*} lyricsequentialPlayback 顺序播放
 * @param {*} lyricshuffle 随机播放
 * @param {*} lyricsingleLoop 单曲循环
 * @param {*} lyriclistLoop 列表循环
 */
function playModeIcon(lyricsequentialPlayback, lyricshuffle, lyricsingleLoop, lyriclistLoop) {
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
}

/**
 * 播放模式切换
 * @param {*} playMode 点击目标的父元素
 * @param {*} lyricsequentialPlayback 顺序播放
 * @param {*} lyricshuffle 随机播放
 * @param {*} lyricsingleLoop 单曲循环
 * @param {*} lyriclistLoop 列表循环
 * @param {*} playbarsequentialPlayback 顺序播放
 * @param {*} playbarshuffle 随机播放
 * @param {*} playbarsingleLoop 单曲循环
 * @param {*} playbarlistLoop 列表循环
 */
function clickPlayMode(playMode, lyricsequentialPlayback, lyricshuffle, lyricsingleLoop, lyriclistLoop, playbarsequentialPlayback, playbarshuffle, playbarsingleLoop, playbarlistLoop) {
    playMode.addEventListener('click', (event) => {
        const button = event.target.closest("button");
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
        playModeIcon(lyricsequentialPlayback, lyricshuffle, lyricsingleLoop, lyriclistLoop)
        playModeIcon(playbarsequentialPlayback, playbarshuffle, playbarsingleLoop, playbarlistLoop)
    })
}

/**
 * 歌词背景图片白色像素占比监听
 * @param {*} imageUrl false Url
 * @param {*} threshold 占比
 * @param {*} userImageUrl true Url
 */
function checkWhitePercentage(imageUrl, threshold, userImageUrl) {
    let lyricBgImage = document.querySelector('.lyricBgImage');
    let img = new Image();
    img.crossOrigin = "Anonymous"; // 解决跨域问题
    img.src = imageUrl;
    img.onload = function () {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data;
        let whitePixels = 0;

        for (let i = 0; i < data.length; i += 4) {
            let red = data[i];
            let green = data[i + 1];
            let blue = data[i + 2];
            if (red === 255 && green === 255 && blue === 255) {
                whitePixels++;
            }
        }

        let whitePercentage = (whitePixels / (canvas.width * canvas.height)) * 100;
        if (whitePercentage > threshold) {
            lyricBgImage.style.backgroundImage = `url(${userImageUrl})`;
        } else {
            lyricBgImage.style.backgroundImage = `url(${imageUrl})`;
        }
    }
}

/**
 * 调节音量按钮显示
 * @param {*} MusicControl 
 */
function volume(MusicControl) {
    MusicControl.addEventListener('click', (event) => {
        const button = event.target.closest("button");
        if (!button) return;
        if (!MusicControl.contains(button)) return;

        if (button.id === 'playbarVolume') {
            if (playbarVolumeControl.style.display === 'block') {
                playbarVolumeControl.style.display = 'none';
            } else {
                playbarVolumeControl.style.display = 'block';
            }
            let volume = localStorage.getItem('volume');
            console.log(volume)
            if (volume) {
                audio.volume = volume;
                lyricVolumeControl.value = volume;
            }
        } else if (button.id === 'lyricVolume') {
            if (lyricVolumeControl.style.display === 'block') {
                lyricVolumeControl.style.display = 'none';
            } else {
                lyricVolumeControl.style.display = 'block';
            }
            let volume = localStorage.getItem('volume');
            console.log(volume)
            if (volume) {
                audio.volume = volume;
                playbarVolumeControl.value = volume;
            }
        }
    })
}

/**
 * 播放栏莹亮调节
 */
function playbarchangeVolume() {
    audio.volume = playbarVolumeControl.value;
    localStorage.setItem('volume', playbarVolumeControl.value);
}

/**
 * 歌词播放栏莹亮调节
 */
function lyricchangeVolume() {
    audio.volume = lyricVolumeControl.value;
    localStorage.setItem('volume', lyricVolumeControl.value);
}