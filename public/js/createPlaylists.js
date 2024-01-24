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

  for (let i = 0; i < resp.result.length; i++) {
    const newLi = document.createElement("li");
    const newA = document.createElement("a");
    const newDivImg = document.createElement("div");
    const newImg = document.createElement("img");
    const newDivText = document.createElement("div");

    newDivImg.classList.add("pic")
    newImg.classList.add("pic-img")
    newDivText.classList.add("text-list")

    let songListId = resp.result[i].id;
    newLi.setAttribute("data-song-id", songListId);

    newImg.src = resp.result[i].picUrl;
    newDivText.textContent = resp.result[i].name;

    newLi.appendChild(newA);
    newA.appendChild(newDivImg);
    newDivImg.appendChild(newImg);
    newA.appendChild(newDivText);
    ul.appendChild(newLi);
  }
});

getTheDailyRecommendedSongList().then(resp => {
  console.log(resp)
});

window.onload = () => {
  const currentPlaySongOrder = localStorage.getItem('currentPlaySongOrder');

  if (currentPlaySongOrder !== '0' && !currentPlaySongOrder ) {
    localStorage.setItem('currentPlaySongOrder', 0);
  }
}