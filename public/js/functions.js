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
        if(playingList.length > 0){
            const songId = playingList[localStorage.getItem('currentPlaySongOrder')].id;
            await setSongInfo(songId);
        }else{
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

        if (target.id == 'playAll' || target.tagName === 'svg' || target.tagName === 'path') {
            console.log('播放歌单所有歌曲');
            let li = event.target.closest("li");
            const { songId, singerId } = li.dataset;
            playAllSongs(songId);
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
        div.innerText = playlist[i].name;
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
likeMusicList(444055992).then(resp => {
    console.log(resp)
})

/**
 * 设置歌曲信息
 * @param {*} songId 歌曲Id
 */
async function setSongInfo(songId) {
    const songName = document.querySelector("#songName");
    const pic = document.querySelector("#pic");
    const playbarsinger = document.querySelector('#playbarsinger');

    if (songId) {
        // 获取歌曲信息
        await getSongDetails(songId).then(song => {
            pic.src = song.songs[0].al.picUrl;
            songName.innerText = song.songs[0].name;
            title.innerText = song.songs[0].name;

            playbarsinger.innerHTML = '';
            for (let i = 0; i < song.songs[0].ar.length; i++) {
                let a = document.createElement('a');
                a.id = 'singerName';
                playbarsinger.appendChild(a);
                a.textContent = song.songs[0].ar[i].name;
                a.setAttribute('data-singer-id', song.songs[0].ar[i].id);

                if (i < song.songs[0].ar.length - 1) {
                    let span = document.createElement('span');
                    span.textContent = ' / ';
                    playbarsinger.appendChild(span)
                }
            }
        });

        // 该歌曲用户是否在喜欢列表中
        getPlaylistsDetail(640067993).then(resp => {
            let songs = resp.playlist.tracks;
            for (let i = 0; i < songs.length; i++) {
                if (songs[i].id == songId) {
                    console.log('true');
                    disLike.style.display = 'block';
                    joinLikes.style.display = 'none';
                    return
                } else {
                    console.log(false)
                    disLike.style.display = 'none';
                    joinLikes.style.display = 'block';
                }
            }
        })

        // 获取歌曲URL
        await getSongUrl(songId).then(resp => {
            if (resp.data) {
                audio.src = resp.data[0].url;
                audio.dataset.songId = songId;
            } else {
                console.log(resp.message);
            }
        });

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
    
                if (lyricWrap.style.display == "block") {
                    // 滚动
                    if (activeLi && activeLi.innerHTML !== '') {
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
                            lyric.style.transform = `translate3d(0, ${top}px, 0)`;
                            lyric.style.transition = `2s`;
                        }
                    }
                }
            }
        });
    } else {
        console.log('没有获取到歌曲Id')
    }
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

/**
 * 登陆成功后，返回登录信息
 */
async function getUserInfo() {
    await loginStatus().then(async resp => {
        localStorage.setItem('user', JSON.stringify(resp.data));
        console.log('已经设置用户信息')
    })
};