const singerId = getParameterByName('id');
getSingerDetails(singerId).then(resp => {
    const singerPic = document.querySelector('#singerPic');
    const singerName = document.querySelector('#artistName');
    const identity = document.querySelector('#identity');
    const Engartisname = document.querySelector('#Engartisname');

    console.log(resp)

    singerPic.src = resp.data.artist.avatar;
    singerName.textContent = resp.data.artist.name;
    if(resp.data.artist.identifyTag !== null){
      identity.textContent = resp.data.artist.identifyTag[0];
    }else{
      identity.textContent = '认证艺人';
    }
    Engartisname.textContent = resp.data.artist.alias[0];

})

// 歌手热门50首歌曲
getPopularSongsFromSingers(singerId).then(async resp => {
  const ul = document.querySelector('#list');
    console.log(resp);
    let songs = resp.songs;

    creatList(songs, ul);
    addDblClickEventListener(ul);
    await settingUpViewing(songs);
})