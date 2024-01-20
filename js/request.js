/*
  功能: 获取最新的音乐
*/
const getNewSong = async () => {
  const resp = await fetch('https://wycloudapi.vercel.app/personalized/newsong?limit');
  return await resp.json();
}

/*
  功能: 获取推荐歌单
*/
const recommendedPlaylists = async () => {
  const resp = await fetch('https://wycloudapi.vercel.app/personalized?limit=100');
  return await resp.json();
}

/*
  功能: 获取歌单所有歌曲
  参数: PlayListID (歌单 Id)
  
*/
const getAllsongsOnThePlaylist = async (PlayListId) => {
  const resp = await fetch(`https://wycloudapi.vercel.app/playlist/track/all?limit=20&id=${PlayListId}&offset=1`);
  return await resp.json();
}

/*
  功能: 获取歌曲Url
  参数: id (歌曲 Id)
  说明: 使用歌单详情接口后 , 能得到的音乐的 id, 但不能得到的音乐 url, 调用此接口, 传入的音乐 id( 可多个 , 用逗号隔开 ), 可以获取对应的音乐的 url;
*/
const getSongUrl = async (id) => {
  const resp = await fetch(`https://wycloudapi.vercel.app/song/url?id=${id}`);
  return await resp.json();
}

/*
  功能: 获取歌单详情
  参数: id : (歌单 Id)
  说明: 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 可 以获取对应歌单内的所有的音乐;
*/
const getPlaylistsDetail = async (id) => {
  const resp = await fetch(`https://wycloudapi.vercel.app/playlist/detail?id=${id}`);
  return await resp.json();
}

/*
  功能: 搜索
  参数: keywords : 关键词
  说明: 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接;
*/
async function search(key){
  const resp = await fetch(`https://wycloudapi.vercel.app/search?keywords=${key}`);
  return await resp.json();
} 

/*
  功能: 获取歌曲详情
  参数: ids: 音乐 id, 如 ids=347230
  说明: 调用此接口 , 传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情(dt为歌曲时长);
*/
async function getSongDetails(id){
  const resp = await fetch(`https://wycloudapi.vercel.app/song/detail?ids=${id}`);
  return await resp.json();
}


/*
  功能: 获取歌曲歌词
  参数: id: 音乐 id
  说明: 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 );
*/
async function getsongLyric(id){
  const resp = await fetch(`https://wycloudapi.vercel.app/lyric?id=${id}`);
  return await resp.json();
}

/*
  功能: 搜索建议
  参数: keywords : 关键词
  说明: 调用此接口 , 可获取默认搜索关键词;
*/
async function searchSuggestions(keywords){
  const resp = await fetch(`https://wycloudapi.vercel.app/search/suggest?keywords=${keywords}`);
  return await resp.json();
}

/*
  功能: 手机登录
  参数: phone: 手机号码 & password: 密码
  可选参数：captcha：验证码
  说明: 调用此接口 , 手机号登录;
*/
async function mobileLogin(phone,captcha){
  const resp = await fetch(`http://localhost:3000/login/cellphone?phone=${phone}&captcha=${captcha}`);
  return await resp.json();
}

/*
  功能: 邮箱登录
  参数: email: 163 网易邮箱 & password: 密码
  说明: 调用此接口 , ;
*/
async function emailLogin(email,password){
  const resp = await fetch(`https://wycloudapi.vercel.app/login?email=${email}@163.com&password=${password}`);
  return await resp.json();
}

/*
  功能: 发送验证码
  参数: phone: 手机号码
  说明: 调用此接口 ,传入手机号码, 可发送验证码
*/
async function sendVerificationCode(phone){
  const resp = await fetch(`http://localhost:3000/captcha/sent?phone=${phone}`);
  return await resp.json();
}

/*
  功能: 验证验证码
  参数: phone: 手机号码 captcha：验证码
  说明: 调用此接口 ,传入手机号码和验证码, 可校验验证码是否正确
*/
async function checkCode(phone,captcha){
  const resp = await fetch(`http://localhost:3000/captcha/verify?phone=${phone}&captcha=${captcha}`);
  return await resp.json();
}