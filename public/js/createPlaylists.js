// 生成歌单
recommendedPlaylists().then(resp => {
  const ul = document.querySelector("#RecommendedPlaylists");
  const playAllBtn = document.querySelector('#playAll');
  clickOnPlaylist(ul);
  let arr = resp.result;
  generatePlaylists(arr,ul);
});

loginStatus().then(async resp => {
  localStorage.setItem('user', JSON.stringify(resp.data));
  if (resp.data.account) {
    let titleDailyRecommendations = document.querySelector('#titleDailyRecommendations');
    const ul = document.querySelector("#DailyRecommendations");
    ul.style.display = 'block';
    titleDailyRecommendations.style.display = 'block';

    getTheDailyRecommendedSongList().then(async resp => {
      clickOnPlaylist(ul);
      let arr = resp.recommend;
      generatePlaylists(arr, ul);
    });
  }
})

window.onload = () => {
  const currentPlaySongOrder = localStorage.getItem('currentPlaySongOrder');

  if (currentPlaySongOrder !== '0' && !currentPlaySongOrder ) {
    localStorage.setItem('currentPlaySongOrder', 0);
  }
}