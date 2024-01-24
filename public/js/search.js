const input = document.querySelector('.search');
const ul = document.querySelector("#list");
let searchValue = getParameterByName("search");

if (!searchValue) {
    getNewSong().then(async resp => {
        let list = [];
        let songs = resp.result;
        await improveSongInformation(list,songs)
        creatList(list);
        addDblClickEventListener(ul, audio, playMain,list)    
    });
}


input.addEventListener('keydown', (event) => {
    if (event.key == "Enter") {
        window.location.href = `search.html?search=${input.value}`;
    }
});

if (searchValue !== null) {
    search(searchValue).then(async resp => {
        let list = [];
        const songs = resp.result.songs;
        await improveSongInformation(list,songs)
        creatList(list);
        addDblClickEventListener(ul, audio, playMain,list)    
    });
}