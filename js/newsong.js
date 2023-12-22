// 获取最新的音乐 
const getNewSong = async () => {
  const resp = await fetch('http://localhost:3000/personalized/newsong?limit');
  return await resp.json();
}

// 获取推荐歌单 
const recommendedPlaylists = async () => {
  const resp = await fetch('http://localhost:3000/personalized?limit');
  return await resp.json();
}

// 获取歌曲地址
// 参数：歌曲id
const getSongUrl = async (id) => {
  const resp = await fetch(`http://localhost:3000/song/url?id=${id}`);
  return await resp.json();
}

// 获取歌单所有歌曲/
const getAllsongsOnThePlaylist = async (PlayListId) => {
  const resp = await fetch(`http://localhost:3000/playlist/track/all?id=${PlayListId}&limit=10&offset=1`);
  return await resp.json();
}

const getSongId = async () => {
  const resp = await getNewSong();
  console.log(resp.result);
  const nextSongs = document.querySelector("#nextSongs");
  const songs = resp.result;
  nextSongs.addEventListener("click", function playNextSong(){
     const currentSong = songs.shift();
    songs.push(currentSong);
    const currentSongId = currentSong.id;
    const currentSongPic = currentSong.picUrl;
    console.log(currentSongId);
    console.log(currentSongPic);

    const songName = document.querySelector("#songName");
    const singer = document.querySelector("#singerName");
    const pic = document.getElementById("pic");

    pic.src = currentSongPic;

    songName.innerText = currentSong.name;
    singer.innerText = currentSong.song.artists[0].name;

    getSongUrl(currentSongId).then(resp => {
      const audio = document.querySelector("#audio");
      const result = resp.data[0].url;
      audio.src = result;
      audio.play();
    });
  });
};
getSongId();


recommendedPlaylists().then(resp => {
  for(let i = 0; i< resp.result.length; i++){
    const ul = document.querySelector("#playlists");
      console.log(ul)
      const newLi = document.createElement("li");
      const newA = document.createElement("a");
      const newDivImg = document.createElement("div");
      const newImg = document.createElement("img");
      const newDivText = document.createElement("div");

      newDivImg.classList.add("pic")
      newImg.classList.add("pic-img")
      newDivText.classList.add("text-list")
      newA.href = "list.html";

      newLi.appendChild(newA);
      newA.appendChild(newDivImg);
      newDivImg.appendChild(newImg);
      newA.appendChild(newDivText);
      ul.appendChild(newLi);
  }
  const imgList = document.querySelectorAll("ul li .pic-img");
  const textList = document.querySelectorAll("ul li .text-list");

  if (resp.result.length > 0) {
    
    imgList[0].src = resp.result[0].pixcUrl;

    for (let i = 0; i < resp.result.length; i++) {
      let text = resp.result[i].name;
      textList[i].textContent = text;
      imgList[i].src = resp.result[i].picUrl;


    }
  }
  console.log(resp);
});

getAllsongsOnThePlaylist(2230318386).then(resp => {
  console.log(resp)
});