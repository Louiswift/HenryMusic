const rightTop = document.querySelector(".rightTop");
const nav = document.querySelector(".nav-wrap");
const lyricWrap = document.querySelector("#lyric-wrap");
const lyric = document.querySelector(".lyric");

pic.addEventListener('click', () => {
    if (rightTop.style.display == "block") {
        nav.style.display = "none";
        rightTop.style.display = "none";
        lyricWrap.style.display = "block";
    }else{
        nav.style.display = "flex";
        rightTop.style.display = "block";
        lyricWrap.style.display = "none";
    }
})