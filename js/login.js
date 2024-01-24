const txtloginId = document.querySelector("#txtLoginId");
const txtloginPwd = document.querySelector("#txtLoginPwd");
const btn = document.querySelector("#loginBtn");
const sendCodeBtn = document.querySelector("#sendCode");
console.log(sendCodeBtn);


/*
    手机号登录
*/



/*
    邮箱登录
*/
btn.addEventListener('click', async () => {
    const resp = await emailLogin("18347156218", "2392228720Wq123");
    // window.location.href = 'index.html';
    localStorage.setItem('token',resp.token);
    localStorage.setItem('cookie',resp.cookie);
    console.log(resp)
});



/*
    游客登录
*/
// btn.addEventListener('click', async () =>{
//     await visitorLogin().then(resp => {
//         document.cookie = JSON.stringify(resp.cookie);
//         window.location.href = "index.html"
//     });
// });