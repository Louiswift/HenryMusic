const rightTop = document.querySelector(".rightTop");
const lyricWrap = document.querySelector("#lyric-wrap");

pic.addEventListener('click', () => {
    if (rightTop.style.display == "block") {
        rightTop.style.display = "none";
      rightTop.style.opacity = "0";
      lyricWrap.style.opacity = "1";
        lyricWrap.style.display = "block";
    }else{
        rightTop.style.display = "block";
      rightTop.style.opacity = "1";
      lyricWrap.style.opacity = "0";
        lyricWrap.style.display = "none";
    }
})
  