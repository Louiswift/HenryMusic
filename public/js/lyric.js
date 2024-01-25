const rightTop = document.querySelector(".rightTop");
const nav = document.querySelector(".nav-wrap");
const lyricWrap = document.querySelector("#lyric-wrap");

pic.addEventListener('click', () => {
  console.log(rightTop.style.display == "block")
    if (rightTop.style.display == "block") {
        nav.style.display = "none";
        rightTop.style.display = "none";
      rightTop.style.opacity = "0";
      lyricWrap.style.opacity = "1";
        lyricWrap.style.display = "block";
    }else{
        nav.style.display = "flex";
        rightTop.style.display = "block";
      rightTop.style.opacity = "1";
      lyricWrap.style.opacity = "0";
        lyricWrap.style.display = "none";
    }
})
  