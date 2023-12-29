function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
window.onload = function () {
    var ul = document.querySelector("#list");
    var dataId = getParameterByName("id");
    console.log(dataId);

    getPlaylistsDetail(dataId).then(resp => {
        let listImg = document.querySelector(".songlist-pic img");
        let listName = document.querySelector(".song-list-name");
      
        const { playlist } = resp;
        const { coverImgUrl, name } = playlist || {};
        listImg.src = coverImgUrl;
        listName.innerText = name;
    });

    async function displayPlaylistSongs(playlistId) {
        const playlist = await getAllsongsOnThePlaylist(playlistId);
        console.log(playlist);
        const ul = document.querySelector("#list");

        for (let i = 0; i < playlist.songs.length; i++) {
            const li = document.createElement("li");
            const div1 = document.createElement("div");
            const picDiv = document.createElement("div");
            const nameDiv = document.createElement("div");
            const img = document.createElement("img");
            const zj = document.createElement("div");
            const tjtime = document.createElement("div");
            const playTime = document.createElement("div");
            const xx = document.createElement("div");
            const arName = document.createElement("div");

            div1.id = "information";
            picDiv.classList = "pic";
            nameDiv.id = "information-name";
            zj.id = "information-zj";
            tjtime.id = "information-time";
            playTime.id = "information-count";
            xx.classList = "xx";
            arName.classList = "ar-name";

            li.appendChild(div1);
            div1.appendChild(picDiv);
            picDiv.appendChild(img);
            xx.appendChild(nameDiv);
            xx.appendChild(arName);
            div1.appendChild(xx);
            li.appendChild(zj);
            li.appendChild(tjtime);
            li.appendChild(playTime);
            ul.appendChild(li);

            li.addEventListener("dblclick", function () {
                const songName = document.querySelector("#songName");
                const singer = document.querySelector("#singerName");
                const pic = document.getElementById("pic");

                let id = playlist.songs[i].id;
                console.log(playlist)

                pic.src = playlist.songs[i].al.picUrl;
                songName.innerText = playlist.songs[i].name;
                singer.innerText = playlist.songs[i].ar[0].name;

                console.log(id)

                getSongUrl(id).then(resp => {
                    const audio = document.querySelector("#audio");
                    const result = resp.data[0].url;
                    audio.src = result;
                    audio.play();
                });

                const getSongId = async (id) => {
                    const nextSongs = document.querySelector("#nextSongs");
                    const PreviousSong = document.querySelector("#PreviousSong");
                    const play = document.querySelector("#play");
                    const suspend = document.querySelector("#suspend");
                    const audio = document.querySelector("#audio");

                    const songs = playlist.songs;
                    console.log(id)
                    console.log(songs);

                    for (let i = 0; i < songs.length; i++) {
                        console.log(id == songs[i].id);
                        console.log(songs[i].al.id);

                      

                        if (id == songs[i].id) {
                            // alert("匹配成功");

                            if (audio.play) {
                                // alert("设置按钮为暂停")
                                play.style.display = "none";
                                suspend.style.display = "block";
                            }
                            // if(audio.prepend){
                            //     // alert("设置按钮为播放")
                            //     play.style.display = "block";
                            //     suspend.style.display = "none";
                            // }

                            // 上一首
                            PreviousSong.addEventListener("click", function PreviousSong() {
                                i--;
                                const id = songs[i].id;

                                const songName = document.querySelector("#songName");
                                const singer = document.querySelector("#singerName");
                                const pic = document.getElementById("pic");

                                pic.src = songs[i].al.picUrl;

                                songName.innerText = songs[i].name;
                                singer.innerText = songs[i].ar[0].name;

                                getSongUrl(id).then(resp => {
                                    const result = resp.data[0].url;
                                    audio.src = result;
                                    audio.play();
                                });
                                if (audio.play) {
                                    play.style.display = "none";
                                    suspend.style.display = "block";
                                }
                            });

                            // 下一首
                            nextSongs.addEventListener("click", function playNextSong() {
                                i++;
                                const id = songs[i].id;

                                const songName = document.querySelector("#songName");
                                const singer = document.querySelector("#singerName");
                                const pic = document.getElementById("pic");

                                pic.src = songs[i].al.picUrl;

                                songName.innerText = songs[i].name;
                                singer.innerText = songs[i].ar[0].name;

                                getSongUrl(id).then(resp => {
                                    const result = resp.data[0].url;
                                    audio.src = result;
                                    audio.play();
                                });
                                if (audio.play) {
                                    play.style.display = "none";
                                    suspend.style.display = "block";
                                }
                            });
                            // 播放
                            play.addEventListener("click", function playSongs() {
                                if (audio.paused) {
                                    audio.play();
                                play.style.display = "none";
                                suspend.style.display = "block";
                                }
                            });

                            // 暂停
                            suspend.addEventListener("click", function suspendSongs() {
                                if (audio.play) {
                                    audio.pause();
                                suspend.style.display = "none";
                                play.style.display = "block";
                                }
                            });
                            break;
                        }
                    }
                };
                getSongId(id);
            })
        }

        const names = document.querySelectorAll("#information-name");
        const ar = document.querySelectorAll(".ar-name");
        const pics = document.querySelectorAll("#information .pic img");
        const zj = document.querySelectorAll("#information-zj");

        playlist.songs.forEach((song, index) => {
            names[index].innerText = song.name;
            pics[index].src = song.al.picUrl;
            zj[index].innerText = song.al.name;
            ar[index].innerText = song.ar[0].name;
        });
    }
    displayPlaylistSongs(dataId)
}