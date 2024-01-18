function getParameterByName(name) {
    let url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

let dataId = getParameterByName("id");

getPlaylistsDetail(dataId).then(resp => {
    const listImg = document.querySelector(".songlist-pic img");
    const listName = document.querySelector(".song-list-name");

    const { playlist } = resp;
    const { coverImgUrl, name } = playlist || {};
    listImg.src = coverImgUrl;
    listName.innerText = name;
    title.innerText = name;
});

getAllsongsOnThePlaylist(dataId).then(resp => {
    localStorage.setItem('playList', JSON.stringify(resp.songs));

    renderPlayList(dataId)
    const playingList = JSON.parse(localStorage.getItem('playingList') || []);

    if (playingList.length === 0) {
        localStorage.setItem('playingList', JSON.stringify(resp.songs));
    }

    const playStatus = localStorage.getItem('play');
    if (playStatus === '1') {
        playMain();
    } else {
        const songId = playingList[localStorage.getItem('currentPlaySongOrder')].id;
        setSongInfo(songId);
    }
})

// 生成歌单列表
async function renderPlayList() {
    const playList = JSON.parse(localStorage.getItem('playList'));
    const ul = document.querySelector("#list");

    // 双击li播放歌曲
    ul.addEventListener("dblclick", async (event) => {
        localStorage.setItem('playTime','0');
        audio.currentTime = 0;

        let li = event.target.closest("li");
        if (!li) return;
        if (!ul.contains(li)) return;
        
        localStorage.setItem('playingList', JSON.stringify(playList));

        const { songOrder } = li.dataset;
        localStorage.setItem('currentPlaylistID', dataId);
        localStorage.setItem('currentPlaySongOrder', songOrder);
        playMain()
    })
    creatList(playList);
}