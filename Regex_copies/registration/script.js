function reg() {
    const regLog = document.querySelector(".regLog");
    const body = document.querySelector(".body");
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/autoriz?reg", true);
    const xhr1 = new XMLHttpRequest();
    xhr1.open("GET", "/", true);
    let data = {};

    data.login = document.querySelector("#login").value;
    data.email = document.querySelector("#email").value;
    data.password = document.querySelector("#password").value;

    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;

        if (xhr.responseText === "false")
            alert("Такой пользователь не зарегистрирован");
        else {
            xhr1.send();
        }
    }

    xhr1.onreadystatechange = () => {
        if (xhr1.readyState !== 4) return;

        let str1 = xhr1.responseText.match(/<div class="regLog">([\s\S]*)(<\/div>){4}<\/header>/);
        let str2 = xhr1.responseText.match(/<div class="menu">([\s\S]*)<\/div><div class="body">/);
        let str3 = xhr1.responseText.match(/<div class="body">([\s\S]*)<\/div><script/);
        regLog.innerHTML = str1[1];
        const menu = document.createElement("div");
        menu.className = "menu";
        menu.innerHTML = str2[1];
        document.body.insertBefore(menu, body);
        body.innerHTML = str3[1];
    }
    xhr.send(JSON.stringify(data));
}

function showPassword(source) {
    let password = document.querySelector("#password");
    if (password.type === "password") {
        password.type = "text";
        source.checked = true;
    }
    else {
        password.type = "password";
        source.checked = false;
    }
}