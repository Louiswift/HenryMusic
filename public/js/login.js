const txtEmail = document.querySelector("#txtEmail");
const txtPassword = document.querySelector("#txtPassword");
const loginBtn = document.querySelector("#Login");
const sendCodeBtn = document.querySelector("#sendCode");


/*
    手机号登录
*/



/*
    邮箱登录
*/
loginBtn.addEventListener('click', async () => {
    const email = txtEmail.value;
    const Password = txtPassword.value;
    const resp = await emailLogin(JSON.stringify(email),JSON.stringify(Password));
    localStorage.setItem('token',resp.token);
    localStorage.setItem('cookie',resp.cookie);
    if(resp.code == 200){
        window.location.href = 'index.html';
    }else{
        alert(resp.msg);
    }
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