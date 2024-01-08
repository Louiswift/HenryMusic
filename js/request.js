/*
  功能: 获取最新的音乐
*/
const getNewSong = async () => {
  const resp = await fetch('http://localhost:3000/personalized/newsong?limit');
  return await resp.json();
}

/*
  功能: 获取推荐歌单
*/
const recommendedPlaylists = async () => {
  const resp = await fetch('http://localhost:3000/personalized?limit=100');
  return await resp.json();
}

/*
  功能: 获取歌单所有歌曲
  参数: PlayListID (歌单 Id)
  
*/
const getAllsongsOnThePlaylist = async (PlayListId) => {
  const resp = await fetch(`http://localhost:3000/playlist/track/all?limit=20&id=${PlayListId}&offset=1`);
  return await resp.json();
}

/*
  功能: 获取歌曲Url
  参数: id (歌曲 Id)
  说明: 使用歌单详情接口后 , 能得到的音乐的 id, 但不能得到的音乐 url, 调用此接口, 传入的音乐 id( 可多个 , 用逗号隔开 ), 可以获取对应的音乐的 url;
*/
const getSongUrl = async (id) => {
  const resp = await fetch(`http://localhost:3000/song/url?id=${id}`);
  return await resp.json();
}

/*
  功能: 获取歌单详情
  参数: id : (歌单 Id)
  说明: 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 可 以获取对应歌单内的所有的音乐;
*/
const getPlaylistsDetail = async (id) => {
  const resp = await fetch(`http://localhost:3000/playlist/detail?id=${id}`);
  return await resp.json();
}

/*
  功能: 搜索
  参数: keywords : 关键词
  说明: 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接;
*/
async function search(key){
  const resp = await fetch(`http://localhost:3000/search?keywords=${key}`);
  return await resp.json();
} 

/*
  功能: 获取歌曲详情
  参数: ids: 音乐 id, 如 ids=347230
  说明: 调用此接口 , 传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情(dt为歌曲时长);
*/
async function getSongDetails(id){
  const resp = await fetch(`http://localhost:3000/song/detail?ids=${id}`);
  return await resp.json();
}


/*
  功能: 获取歌曲歌词
  参数: id: 音乐 id
  说明: 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 );
*/
async function getsongLyric(id){
  const resp = await fetch(`http://localhost:3000/lyric?id=${id}`);
  return await resp.json();
}

/*
  功能: 搜索建议
  参数: keywords : 关键词
  说明: 调用此接口 , 可获取默认搜索关键词;
*/
async function searchSuggestions(keywords){
  const resp = await fetch(`http://localhost:3000/search/suggest?keywords=${keywords}`);
  return await resp.json();
}

