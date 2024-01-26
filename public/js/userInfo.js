const userInfo = JSON.parse(localStorage.getItem('userInformation'));
console.log(userInfo)
let headSculpture = document.querySelector('.headSculpture');
let userInfoWrap = document.querySelector('.userInfoWrap');

headSculpture.src = userInfo.avatarUrl;