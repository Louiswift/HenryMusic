let dataId = getParameterByName("id");

getPlaylistsDetail(dataId).then(async resp => {
    const listImg = document.querySelector(".songlist-pic img");
    const listName = document.querySelector(".song-list-name");
    const bgImgTitle = document.querySelector('.bgImgTitle');
    const ul = document.querySelector("#list");
    const similarPlaylistsUl = document.querySelector('#similarPlaylistsUl');

    const { playlist } = resp;
    const { coverImgUrl, name } = playlist || {};
    listImg.src = coverImgUrl;
    bgImgTitle.style.backgroundImage = `url(${coverImgUrl})`;
    bgImgTitle.style.backgroundSize = '100% 100%';
    bgImgTitle.style.backgroundRepeat = 'no-repeat';
    listName.innerText = name;
    title.innerText = name;

    let songs = resp.playlist.tracks;
    creatList(songs, ul);
    await addDblClickEventListener(ul);
    await settingUpViewing(songs);
    clickArnamelist(ul)

    const { firstId } = ul.dataset;
    similarPlaylists(firstId).then(resp => {
        const playlists = resp.playlists;
        creatSimilarSingers(playlists, similarPlaylistsUl);
        clickOnPlaylist(similarPlaylistsUl);
    })
});