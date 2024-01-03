const input = document.querySelector('.search');

input.addEventListener('keydown', (event) => {
    if(event.key == "Enter"){
        search(input.value).then(async resp => {
            const song = resp.result.songs;
    
            const ul = document.querySelector("#list");
            ul.innerHTML = "";

            let list = [];
            for (let i = 0; i < song.length; i++) {
                let id = song[i].id
                await getSongDetails(id).then(resp => {
                    list.push(resp.songs[0]);
                });
            }
            console.log(list)
            localStorage.setItem('playList', JSON.stringify(song));

            // 双击li播放歌曲
            ul.addEventListener("dblclick", async (event) => {
                localStorage.setItem('playTime','0')
                audio.currentTime = 0;

                let li = event.target.closest("li");
                if (!li) return;
                if (!ul.contains(li)) return;

                localStorage.setItem('playingList', JSON.stringify(list));
                const { songId, songOrder } = li.dataset;
    
                // 设置当前播放的歌曲 
                song[localStorage.getItem('currentPlaySongOrder')].id
                setSongInfo(songId);
                playMain();
                localStorage.setItem('currentPlaySongOrder', songOrder);
            })
           

            const playingList = JSON.parse(localStorage.getItem('playingList') || []);

            if (playingList.length === 0) {
                localStorage.setItem('playingList', JSON.stringify(list));
            }
        
            const playStatus = localStorage.getItem('play');
            if (playStatus === '1') {
                playMain();
            } else {
                const songId = playingList[localStorage.getItem('currentPlaySongOrder')].id;
                setSongInfo(songId);
            }
            creatList(list);
        })
    }
});