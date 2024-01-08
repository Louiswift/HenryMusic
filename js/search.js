const input = document.querySelector('.search');
const ul = document.querySelector("#list");

input.addEventListener('keydown', (event) => {
    if(event.key == "Enter"){
        search(input.value).then(async resp => {
            const song = resp.result.songs;
            searchSuggestions(input.value).then(async resp =>{
                console.log(resp)
            });
           
            ul.innerHTML = "";

            let list = [];
            for (let i = 0; i < song.length; i++) {
                let id = song[i].id
                await getSongDetails(id).then(resp => {
                    list.push(resp.songs[0]);
                });
            }
            console.log(list)
            localStorage.setItem('playList', JSON.stringify(list));
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
            // 双击li播放歌曲
            ul.addEventListener("dblclick", async (event) => {
                localStorage.setItem('playTime','0')
                audio.currentTime = 0;

                let li = event.target.closest("li");
                if (!li) return;
                if (!ul.contains(li)) return;

                let playList = JSON.parse(localStorage.getItem('playList'));
                localStorage.setItem('playingList', JSON.stringify(playList));

                const { songId, songOrder } = li.dataset;
                localStorage.setItem('currentPlaySongOrder', songOrder);
                playMain();
            })     
            creatList(list);
        })
    }
});