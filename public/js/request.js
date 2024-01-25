/**
 * 获取最新的音乐
 * @returns 对象
 * @param 说明：获取最新发布的音乐
 */
const getNewSong = async () => {
  const resp = await fetch('https://www.henrywang.xyz/personalized/newsong?limit=20');
  return await resp.json();
}

/**
 * 获取每日推荐歌单 ( 需要登录 )
 * @returns 对象
 */
async function getTheDailyRecommendedSongList(){
  const resp = await fetch(`https://www.henrywang.xyz/recommend/resource`,{
    // headers:{
    //   'Authorization': localStorage.getItem('token'),
    //   credentials: 'include',
    // },
  });
  return await resp.json();
}

/**
 * 获取每日推荐歌曲 ( 需要登录 )
 * @returns 对象
 */
async function getDailySongRecommendations(){
  const resp = await fetch(`https://www.henrywang.xyz/recommend/songs`);
  return await resp.json();
}

/**
 * 获取推荐歌单
 * @returns 对象
 */
const recommendedPlaylists = async () => {
  const resp = await fetch('https://www.henrywang.xyz/personalized?limit=9');
  return await resp.json();
}

/**
 * 获取歌单所有歌曲
 * @param {*} PlayListId 歌单id
 * @returns 对象
 * @param 说明：通过歌单id，获取到歌单中所有的歌曲
 */
const getAllsongsOnThePlaylist = async (PlayListId) => {
  const resp = await fetch(`https://www.henrywang.xyz/playlist/track/all?limit=20&id=${PlayListId}&offset=1`);
  return await resp.json();
}

/**
 * 获取歌曲Url
 * @param {*} id 歌曲id
 * @returns url
 * @param 说明: 使用歌单详情接口后 , 能得到的音乐的 id, 但不能得到的音乐 url, 调用此接口, 传入的音乐 id( 可多个 , 用逗号隔开 ), 可以获取对应的音乐的 url;
 */
const getSongUrl = async (id) => {
  const resp = await fetch(`https://www.henrywang.xyz/song/url/v1?id=${id}&level=jymaster`);
  return await resp.json();
}

/**
 * 获取歌单详情
 * @param {*} id 歌单id
 * @returns 对象
 * @param 说明: 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 可 以获取对应歌单内的所有的音乐;
 */
const getPlaylistsDetail = async (id) => {
  const resp = await fetch(`https://www.henrywang.xyz/playlist/detail?id=${id}`);
  return await resp.json();
}

/**
 * 音乐是否可用
 * @param {*} id 歌曲 id
 * @returns 返回 { success: true, message: 'ok' } 或者 { success: false, message: '亲爱的,暂无版权' }
 */
const musicAvailability = async (id) => {
  const resp = await fetch(`https://www.henrywang.xyz/check/music?id=${id}`);
  return await resp.json();
}

/**
 * 搜索
 * @param {*} key 关键词
 * @returns 对象
 * @param 说明: 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接;
 */
async function search(key){
  const resp = await fetch(`https://www.henrywang.xyz/search?keywords=${key}`);
  return await resp.json();
} 

/**
 * 搜索建议
 * @param {*} keywords 关键词
 * @returns 对象
 * @param 说明: 调用此接口 , 可获取默认搜索关键词;
 */
async function searchSuggestions(keywords){
  const resp = await fetch(`https://www.henrywang.xyz/search/suggest?keywords=${keywords}`);
  return await resp.json();
}

/**
 * 热门搜索（详细）
 * @returns 对象
 * @param 说明 : 调用此接口,可获取热门搜索列表
 */
async function hotSearch(){
  const resp = await fetch(`https://www.henrywang.xyz/search/hot/detail`);
  return await resp.json();
} 

/**
 * 获取歌曲详情
 * @param {*} id 歌曲id
 * @returns 
 * @param 说明: 调用此接口 , 传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情(dt为歌曲时长);
*/
async function getSongDetails(id){
  const resp = await fetch(`https://www.henrywang.xyz/song/detail?ids=${id}`);
  return await resp.json();
}

/**
 * 获取歌曲歌词
 * @param {*} id 歌曲id
 * @returns 对象
 * @param 说明: 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 );
 */
async function getsongLyric(id){
  const resp = await fetch(`https://www.henrywang.xyz/lyric?id=${id}`);
  return await resp.json();
}

/**
 * 手机登录
 * @param {*} phone 手机号码
 * @param {*} password 密码
 * @param {*} captcha 验证码
 * @returns 包含用户信息的对象
 */
async function mobileLogin(phone,captcha){
  const resp = await fetch(`https://www.henrywang.xyz/login/cellphone?phone=${phone}&captcha=${captcha}`);
  return await resp.json();
}

/**
 * 邮箱登录
 * @param {*} email 网易邮箱
 * @param {*} password 密码
 * @returns 对象
 */
async function emailLogin(email,password){
  const resp = await fetch(`https://www.henrywang.xyz/login?email=${email}@163.com&password=${password}`);
  return await resp.json();
}

/**
 * 游客登录
 * @returns 对象
 * @param 可获取游客cookie,如果遇到其他接口未登录状态报400状态码需要验证的错误,可使用此接口获取游客cookie避免报错
 */
async function visitorLogin(){
  const resp = await fetch(`https://www.henrywang.xyz/register/anonimous`);
  return await resp.json();
}

/*
  功能: 发送验证码
  参数: phone: 手机号码
  说明: 调用此接口 ,传入手机号码, 可发送验证码
*/
/**
 * 发送验证码
 * @param {*} phone 手机号码
 * @returns 
 * @param 说明: 调用此接口 ,传入手机号码, 可发送验证码
 */
async function sendVerificationCode(phone){
  const resp = await fetch(`https://www.henrywang.xyz/captcha/sent?phone=${phone}`);
  return await resp.json();
}

/**
 * 验证验证码
 * @param {*} phone 手机号码
 * @param {*} captcha captcha：验证码
 * @returns 
 * @param 说明: 调用此接口 ,传入手机号码和验证码, 可校验验证码是否正确
*/
async function checkCode(phone,captcha){
  const resp = await fetch(`https://www.henrywang.xyz/captcha/verify?phone=${phone}&captcha=${captcha}`);
  return await resp.json();
}