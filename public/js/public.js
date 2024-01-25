window.onload = () => {
    const playStatus = localStorage.getItem('play');
    if (playStatus === '1') {
        playMain()
    } else {
        const order = localStorage.getItem('currentPlaySongOrder');
        const playList = JSON.parse(localStorage.getItem('playingList'));
        setSongInfo(playList[order].id);
    }
    let playTime = localStorage.getItem('playTime');
    audio.currentTime = playTime;
}