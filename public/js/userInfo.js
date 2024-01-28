// 获取用户头像dom
const headSculpture = document.querySelector('.headSculpture');
const userInfoWrap = document.querySelector('.userInfoWrap');

// 点击头像显示用户信息下拉列表
headSculpture.addEventListener('click', () => {
    if (userInfoWrap.style.display == 'none') {
        userInfoWrap.style.display = 'block'
    } else {
        userInfoWrap.style.display = 'none';
    }
});

// 获取用户详细信息中的用户头像dom
const userInfoHeadSculpture = document.querySelector('.userInfoHeadSculpture');
const username = document.querySelector('.username');

loginStatus().then(async resp => {
    if (resp.data.account) {
        headSculpture.src = resp.profile.avatarUrl;
        userInfoHeadSculpture.src = resp.profile.avatarUrl;
        username.innerText = resp.data.profile.name;

    } else {
        headSculpture.src = 'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2023%2F0406%2F5da2c82ej00rsof5j0038d200et00djg005i0050.jpg&thumbnail=660x2147483647&quality=80&type=jpg';
        userInfoHeadSculpture.src = 'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2023%2F0406%2F5da2c82ej00rsof5j0038d200et00djg005i0050.jpg&thumbnail=660x2147483647&quality=80&type=jpg';
        username.innerText = "游客";
    }
    getUserDetails(resp.data.account.id).then(resp => {
        console.log(resp)

    });

    // 获取用户信息中的歌单dom

    getUserPlaylists(resp.data.account.id).then(async resp => {
        const createdPlaylist = document.querySelector('#createdPlaylist');
        const playlist = resp.playlist;
        console.log(playlist)
        for (let i = 0; i < playlist.length - 2; i++) {
            // 创建dom
            const li = document.createElement('li');
            const a = document.createElement('a');
            const img = document.createElement('img');
            const div = document.createElement('div');

            // 给dom赋值class & 值
            div.classList = 'txtplaylistName f-thide';
            img.src = playlist[i].coverImgUrl;
            div.innerText = playlist[i].name;
            li.setAttribute("data-song-id", playlist[i].id);

            // 将dom拼装
            a.appendChild(img);
            a.appendChild(div);
            li.appendChild(a);
            createdPlaylist.appendChild(li);
        }
        clickOnPlaylist(createdPlaylist);
    })

    getUserInfoAndPlaylist().then(resp => {
        console.log(resp)
    });

})