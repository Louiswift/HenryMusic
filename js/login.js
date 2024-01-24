const txtloginId = document.querySelector("#txtLoginId");
const txtloginPwd = document.querySelector("#txtLoginPwd");
const btn = document.querySelector("#loginBtn");
const sendCodeBtn = document.querySelector("#sendCode");
console.log(sendCodeBtn);


/*
    手机号登录
*/
sendCodeBtn.addEventListener('click', () => {
    console.log("手机号获取成功")
    sendVerificationCode(txtloginId.value).then(resp => {
        console.log(resp);
    });
    console.log('已发送')
});

btn.addEventListener('click', () => {
    checkCode(txtloginId.value, txtloginPwd.value).then(resp => {
        console.log(resp)

        mobileLogin(txtloginId.value, txtloginPwd.value).then(resp => {
            console.log(resp);
        });

        // if (resp.code == 503) {
            // window.location.href = 'index.html';
        // }
    })
});

btn.addEventListener('click', () => {
    emailLogin(txtloginId, txtloginPwd).then(resp => {
        console.log(resp)
    });
});



/*
    邮箱登录
*/
// btn.addEventListener('click', async () => {
//     const resp = await emailLogin("18347156218", "2392228720Wq123");
    
//             // window.location.href = 'index.html';
//     console.log(resp.cookie)
// });



/*
    游客登录
*/
// btn.addEventListener('click', async () =>{
//     await visitorLogin().then(resp => {
//         document.cookie = JSON.stringify(resp.cookie);
//         window.location.href = "index.html"
//     });
// });