const txtloginId = document.querySelector("#txtLoginId");
const txtloginPwd = document.querySelector("#txtLoginPwd");
const btn = document.querySelector("#loginBtn");

btn.onclick = async function () {
    const loginId = txtloginId.value,
        loginPwd = txtloginPwd.value;
    const obj = {
        loginId,
        loginPwd
    };
    const resp = await fetch("https://study.duyiedu.com/api/user/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            a: 123
        },
        body: JSON.stringify(obj),
    });
    const body = await resp.json();
    if (body.code) {
        alert(body.msg)
    } else {
        alert('登录成功')
        window.location.href = 'index.html';
    }
};