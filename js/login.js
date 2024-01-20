const txtloginId = document.querySelector("#txtLoginId");
const txtloginPwd = document.querySelector("#txtLoginPwd");
const btn = document.querySelector("#loginBtn");
const sendCodeBtn = document.querySelector("#sendCode");
console.log(sendCodeBtn);


/*
    手机号登录,由于接口问题, 返回code:-462 使用不了
*/
// sendCodeBtn.addEventListener('click', () => {
//     sendVerificationCode(txtloginId.value).then(resp => {
//         console.log(resp);
//     });
//     console.log('已发送')
// });

// btn.addEventListener('click', () => {
//     checkCode(txtloginId.value, txtloginPwd.value).then(resp => {
//         console.log(resp)

//         mobileLogin(txtloginId.value, txtloginPwd.value).then(resp => {
//             console.log(resp);
//         });

//         // if (resp.code == 503) {
//             // window.location.href = 'index.html';
//         // }
//     })
// });\

// btn.addEventListener('click', () => {
//     emailLogin(txtloginId, txtloginPwd).then(resp => {
//         console.log(resp)
//     });
// });



/*
    邮箱登录,由于接口问题, 返回code:-462 使用不了
*/
btn.addEventListener('click', async () => {
    const resp = await emailLogin(txtloginId, txtloginPwd);
    console.log(resp);
});
