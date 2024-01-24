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
    const ul = document.querySelector("#list");
    let songs = resp.songs;
    creatList(songs);
    addDblClickEventListener(ul, audio, playMain, songs);
})