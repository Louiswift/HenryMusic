// 生成歌单
recommendedPlaylists().then(resp => {
  const ul = document.querySelector("#playlists");
  ul.addEventListener("click", (event) => {
    let li = event.target.closest("li");
    if (!li) return;
    if (!ul.contains(li)) return;
    const { songId } = li.dataset;
    window.location.href = "list.html?id=" + songId;
  });
  let arr = resp.result;
  generatePlaylists(arr,ul)
});

getTheDailyRecommendedSongList().then(resp => {
  const ul = document.querySelector("#playlists");
  ul.addEventListener("click", (event) => {
    let li = event.target.closest("li");
    if (!li) return;
    if (!ul.contains(li)) return;
    const { songId } = li.dataset;
    window.location.href = "list.html?id=" + songId;
  });
  let arr = resp.recommend;
  generatePlaylists(arr,ul)
});

window.onload = () => {
  const currentPlaySongOrder = localStorage.getItem('currentPlaySongOrder');

  if (currentPlaySongOrder !== '0' && !currentPlaySongOrder ) {
    localStorage.setItem('currentPlaySongOrder', 0);
  }
}