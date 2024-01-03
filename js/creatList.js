function creatList(list){
    let ul = document.querySelector('#list')
    for (let i = 0; i < list.length; i++) {
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
    
        nameDiv.innerText = list[i].name;
        img.src = list[i].al.picUrl;
        zj.innerText = list[i].al.name;
        arName.innerText = list[i].ar[0].name;
    
        const { h, m, s } = duration(list[i].dt);
        playTime.innerText = h ? `${h}:${m}:${s}` : `${m}:${s}`
    
        li.dataset.songId = list[i].id
        li.dataset.songOrder = i
    
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
    }
}
function duration(time) {
    const seconds = time / 1000
    let h = parseInt(seconds / (60 * 60) % 24);
    let m = parseInt(seconds / 60 % 60);
    let s = parseInt(seconds % 60);

    return { h, m: addZero(m), s: addZero(s) };
}
function ReleaseTime(time) {
    const seconds = time / 1000;
    let year = seconds / (60 * 60 * 2430);
    return year;
}
function addZero(time) {
    return time < 10 ? '0' + time : time
}
