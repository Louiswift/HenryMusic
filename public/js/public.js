window.onload = () => {
    const playStatus = localStorage.getItem('play');
    if (playStatus === '1') {
        playMain()
    } else {
        const order = localStorage.getItem('currentPlaySongOrder');
        const playList = JSON.parse(localStorage.getItem('playingList'));
        if(playList && order){
            setSongInfo(playList[order].id);
        }else{
            console.log('未发现歌曲哦！播放不了呢！');
        }
    }
    let playTime = localStorage.getItem('playTime');
    audio.currentTime = playTime;
}