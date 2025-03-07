const input = document.querySelector('.search');
const ul = document.querySelector("#list");
let searchValue = getParameterByName("search");
const popularSearches = document.querySelector('.popularSearches-History');

if (!searchValue) {
    getNewSong().then(async resp => {
        let list = [];
        let songs = resp.result;
        await improveSongInformation(list, songs)
        creatList(list, ul);
        await addDblClickEventListener(ul);
        await settingUpViewing(list);
        clickArnamelist(ul)
    });
}

input.addEventListener('keydown', (event) => {
    if (event.key == "Enter") {
        input.value.trim();
        if(input.value !== '' && removeExtraSpaces(input.value) !== ' '){
            let searchHistory = JSON.parse(localStorage.getItem('SearchHistory')) || [];
            searchHistory.push({ searchWord: input.value });
            localStorage.setItem('SearchHistory', JSON.stringify({}));
            localStorage.setItem('SearchHistory', JSON.stringify(searchHistory));
            window.location.href = `search.html?search=${input.value}`;
        }else{
            console.log('请输入搜索内容')
            input.value = '';
        }
    }
});

// 搜索成功后创建歌曲列表
if (searchValue !== '') {
    search(searchValue).then(async resp => {
        const songs = resp.result.songs;
        creatList(songs, ul);
        await addDblClickEventListener(ul)
        await settingUpViewing(list);
        clickArnamelist(ul)
    });
}   

// 鼠标聚焦搜索框
input.addEventListener('click', function () {
    popularSearches.style.display = 'block';
});

document.addEventListener('click', function (event) {
    if (event.target !== input && event.target !== popularSearches) {
        popularSearches.style.display = 'none';
    }
});

// 热门搜索
const hotHistoryWrap = document.querySelector("#hotSearch");

hotSearch().then(resp => {
    generateSearcHistory(resp.data, hotHistoryWrap);
});

// 搜索历史
const searchHistoryWrap = document.querySelector("#searchHistory");
let searchHistory = JSON.parse(localStorage.getItem('SearchHistory')) || [];
generateSearcHistory(searchHistory, searchHistoryWrap)

// 点击按钮清除历史搜索
const clearBtn = document.querySelector(".clearbtn");
clearBtn.addEventListener('click', () => {
    localStorage.removeItem('SearchHistory');
    searchHistoryWrap.innerText = '';
})

// 鼠标点击历史搜索 or 热门搜索的内容 进行搜索
popularSearches.addEventListener('click', (event) => {
    let li = event.target.closest("li");
    if (!li) return;
    if (!popularSearches.contains(li)) return;
    window.location.href = `search.html?search=${event.target.innerText}`;
})