// 生成歌单
recommendedPlaylists().then(resp => {
  const ul = document.querySelector("#RecommendedPlaylists");
  clickOnPlaylist(ul);
  let arr = resp.result;
  generatePlaylists(arr,ul);
});

getTheDailyRecommendedSongList().then(resp => {
  const ul = document.querySelector("#DailyRecommendations");
  clickOnPlaylist(ul);
  let arr = resp.recommend;
  generatePlaylists(arr,ul);
});

window.onload = () => {
  const currentPlaySongOrder = localStorage.getItem('currentPlaySongOrder');

  if (currentPlaySongOrder !== '0' && !currentPlaySongOrder ) {
    localStorage.setItem('currentPlaySongOrder', 0);
  }
}