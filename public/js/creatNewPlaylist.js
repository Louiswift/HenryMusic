const creatNewPlaylistbtn = document.querySelector('#creatNewPlaylistbtn');

creatNewPlaylistbtn.addEventListener('click', () => {
    console.log('创建成功');
    CreateANewPlaylist().then(resp => {
        console.log(resp)
        if(resp.data === null){
            console.log(resp.msg)
        }
    })
});