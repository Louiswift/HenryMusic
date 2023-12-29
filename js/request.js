// 获取最新的音乐 
const getNewSong = async () => {
  const resp = await fetch('http://localhost:3000/personalized/newsong?limit');
  return await resp.json();
}

// 获取推荐歌单 
const recommendedPlaylists = async () => {
  const resp = await fetch('http://localhost:3000/personalized?limit=100');
  return await resp.json();
}

// 获取歌单所有歌曲
const getAllsongsOnThePlaylist = async (PlayListId) => {
  const resp = await fetch(`http://localhost:3000/playlist/track/all?id=${PlayListId}&offset=1`);
  return await resp.json();
}

const getSongUrl = async (id) => {
  const resp = await fetch(`http://localhost:3000/song/url?id=${id}`);
  return await resp.json();
}
const getPlaylistsDetail = async (id) => {
  const resp = await fetch(`http://localhost:3000/playlist/detail?id=${id}`);
  return await resp.json();
}