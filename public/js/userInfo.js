// 获取用户头像dom
const headSculpture = document.querySelector('.headSculpture');
const userInfoWrap = document.querySelector('.userInfoWrap');
const vip = document.querySelector('#vip');
const userlevel = document.querySelector('.userlevel');

// 获取用户详细信息中的用户头像dom
const userInfoHeadSculpture = document.querySelector('.userInfoHeadSculpture');
const username = document.querySelector('.username');

// 点击头像显示用户信息下拉列表
headSculpture.addEventListener('click', function () {
    if (userInfoWrap.id == '') {
        userInfoWrap.id = 'show';
        userInfo.style.display = 'block';
    } else {
        userInfoWrap.id = '';
        setTimeout(function(){
            userInfo.style.display = 'none';
            playingListWrap.style.display = 'none';
        } ,200);
    }
});

// 获取登录信息
const user = JSON.parse(localStorage.getItem('user'));

// 如果登录则添加用户信息以及歌单等 否则右上角显示登录按钮
if (user && user.account !== null) {
    getUserDetails(user.account.id).then(resp => {
        console.log(resp)
        headSculpture.src = resp.profile.avatarUrl;
        userInfoHeadSculpture.src = resp.profile.avatarUrl;
        username.textContent = resp.profile.nickname;
        userlevel.textContent = `LV${resp.level}`;
        if (resp.profile.vipType == 11) {
            vip.src = 'img/vip.svg';
        } else {
            vip.src = 'img/普通用户.svg';
        }
    });

    // 获取用户信息中的歌单
    getUserPlaylists(user.account.id).then(async resp => {
        const createdPlaylist = document.querySelector('#createdPlaylist');
        const collectPlaylists = document.querySelector('#collectPlaylists');
        const ul = document.querySelector('#songsheet');
        const playlist = resp.playlist;

        createYourPlaylist(playlist, collectPlaylists, createdPlaylist);
        CreateLibraryPlaylists(playlist, ul);
        clickOnPlaylist(createdPlaylist);
        clickOnPlaylist(collectPlaylists);
        clickOnPlaylist(ul);
    })
    getUserInfoAndPlaylist().then(resp => {
        console.log(resp)
    });


} else {
    headSculpture.src = 'img/登录.svg';
    headSculpture.addEventListener('click', () => {
        window.location.href = 'login.html';
        userInfoHeadSculpture.src = 'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2023%2F0406%2F5da2c82ej00rsof5j0038d200et00djg005i0050.jpg&thumbnail=660x2147483647&quality=80&type=jpg';
        username.innerText = "游客";
        userInfoWrap.style.display = 'none';
    })
}