const loginMethod = document.querySelector(".loginMethod");

// 选择登陆方式
loginMethod.addEventListener('click', (event) => {
    let li = event.target.closest("li");
    if (!li) return;
    if (!loginMethod.contains(li)) return;

    const { type } = li.dataset;
    window.location.href = `login.html?method=${type}`;
});

const phoneLog = document.querySelector("#phoneLog")
const emailLog = document.querySelector("#eamilLogin");
let method = getParameterByName('method');

// 判断登陆方式
if (method == 'phoneLogin') {
    // 登陆方式为手机登录
    eamilLogin.style.display = 'none'
    phoneLog.style.display = 'flex'
    const phoneNumber = document.querySelector('#phoneNumber');
    const phonePassword = document.querySelector('#phonePassword');

    const SMS = document.querySelector('#SMS');

    const phoneLoginBtn = document.querySelector("#phoneLogin");
    const codeLoginBtn = document.querySelector('#codeLoginBtn');

    const SMSLogin = document.querySelector("#SMSLogin");
    const pwdLogin = document.querySelector('#pwdLogin');

    const phonepwdWrap = document.querySelector('.phonepwdWrap');
    const SMSLoginWrap = document.querySelector('.SMSLoginWrap');

    const SMSLoginBtnWrap = document.querySelector('.SMSLoginBtnWrap');
    const pwdLoginBtnWrap = document.querySelector('.pwdLoginBtnWrap');

    const obtainVerificationCode = document.querySelector('#obtainVerificationCode');

    SMSLogin.addEventListener('click', () => {
        console.log("已成为短信验证登录")
        phonepwdWrap.style.display = 'none'
        SMSLoginWrap.style.display = 'block'
        SMSLoginBtnWrap.style.display = 'none';
        pwdLoginBtnWrap.style.display = 'block';
        codeLoginBtn.style.display = 'block';
        phoneLoginBtn.style.display = 'none';

    });
    pwdLogin.addEventListener('click', () => {
        console.log("已成为密码登录")
        phonepwdWrap.style.display = 'block'
        SMSLoginWrap.style.display = 'none'
        SMSLoginBtnWrap.style.display = 'block';
        pwdLoginBtnWrap.style.display = 'none';
        codeLoginBtn.style.display = 'none';
        phoneLoginBtn.style.display = 'block';
    });

    // 手机号密码登录
    phoneLoginBtn.addEventListener('click', async () => {
        const phone = phoneNumber.value;
        const password = phonePassword.value;
        mobilePasswordLogin(phone, password).then(resp => {
            console.log(resp)
            localStorage.setItem('token', resp.token);
            localStorage.setItem('cookie', resp.cookie);
            if (resp.code == 200) {
                console.log(resp.profile)
                localStorage.setItem("loginMethod", "手机登录")
                getUserInfo();
                window.location.href = 'https://henrymusic.xyz/';
            } else {
                alert(resp.msg);
            }
        });
    });

    // 手机号短信验证登录
    codeLoginBtn.addEventListener('click', async () => {
        const phone = phoneNumber.value;
        const code = SMS.value;

        await mobileVerificationCodeLogin(phone, code).then(resp => {
            console.log(resp)
            localStorage.setItem('token', resp.token);
            localStorage.setItem('cookie', resp.cookie);
            if (resp.code == 200) {
                console.log(resp.profile)
                localStorage.setItem("loginMethod", "手机登录")
                getUserInfo();
                window.location.href = 'https://henrymusic.xyz/';
            } else {
                alert(resp.msg);
            }
        });
        await checkCode(phone, code).then(resp => {
            console.log(resp)
        });
    });

    // 点击该按钮获取验证码
    obtainVerificationCode.addEventListener('click', async () => {
        const phone = phoneNumber.value;
        await sendVerificationCode(phone).then(resp => {
            console.log(resp)
            if (resp.code == 200) {
                console.log(`验证码已发送至：${phone}`);
            } else {
                console.log(resp.message) || console.log(resp.code);
            }
        });
    });

} else if (method == 'qrCodeLogin') {
    // 登陆方式为二维码登录

} else if (method == 'VisitorLogin') {
    // 登陆方式为游客登陆

    visitorLogin().then(resp => {
        console.log(resp)
        localStorage.setItem("loginMethod", "游客")
        localStorage.setItem("userId", resp.userId)
        window.location.href = "index.html"
    });
}

/*
    邮箱登录
*/
const txtEmail = document.querySelector("#txtEmail");
const txtPassword = document.querySelector("#emailLogPassword");
const loginBtn = document.querySelector("#Login");

loginBtn.addEventListener('click', async () => {
    const email = txtEmail.value;
    const Password = txtPassword.value;
    const resp = await emailLogin(email, Password);
    if (resp.code == 200) {
        console.log(resp.profile)
        localStorage.setItem("loginMethod", "邮箱登录")
        getUserInfo();
        window.location.href = 'https://henrymusic.xyz/';
    } else {
        alert(resp.msg);
    }
});