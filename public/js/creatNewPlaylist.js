const creatNewPlaylistbtn = document.querySelector('#creatNewPlaylistbtn');
const setCreatNewPlaylistNameWrap = document.querySelector('#setCreatNewPlaylistNameWrap');

// 打开创建歌单页面
creatNewPlaylistbtn.addEventListener('click', () => {
    setCreatNewPlaylistNameWrap.style.display = 'flex';
});

// 关闭该页面
const closesetCreatNewPlaylistNameWrapBtn = document.querySelector('#close');
closesetCreatNewPlaylistNameWrapBtn.addEventListener('click', () => {
    setCreatNewPlaylistNameWrap.style.display = 'none';
})

const playlistName = document.querySelector('#setCreatNewPlaylistName');
const yplaylistNameBtn = document.querySelector('#yplaylistNameBtn');

// 确定提交歌单名称
yplaylistNameBtn.addEventListener('click', ()=>{
    let value = playlistName.value;
    CreateANewPlaylist(value).then(resp => {
        console.log(resp)
        if (resp.data === null) {
            console.log(resp.msg)
        }
    })
    playlistName.value = '';
    setCreatNewPlaylistNameWrap.style.display = 'none';
})

// 鼠标聚焦
playlistName.addEventListener('focus', () => {
    playlistName.style.border = '2px solid #535353';
    playlistName.style.background = '#333';
})
// 鼠标失焦
playlistName.addEventListener('blur', () => {
    playlistName.style.border = '0';
    playlistName.style.background = '#3E3E3E';
})