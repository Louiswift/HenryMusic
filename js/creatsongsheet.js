const addButton = document.getElementById("addButton");
const songSheet = document.getElementById("songsheet");
const savedItems = localStorage.getItem('songsheet');
if (savedItems) {
  songSheet.innerHTML = savedItems;
}


addButton.addEventListener("click", function () {
  const newLi = document.createElement("li");
  const newA = document.createElement("a");
  const newDivImg = document.createElement("div");
  const newImg = document.createElement("img");
  const newDiv = document.createElement("div");
  const divText = document.createTextNode("我的歌单");

  newDivImg.classList.add("icon");
  newDiv.classList.add("text-songsheet");
  newImg.src = "img/歌单.svg";
  newA.href = "https:www.baidu.com";

  newA.appendChild(newDivImg);
  newDivImg.appendChild(newImg);
  newA.appendChild(newDiv);
  newDiv.appendChild(divText);
  newLi.appendChild(newA);
  songSheet.appendChild(newLi);

  localStorage.setItem('songsheet', songSheet.innerHTML);
});
