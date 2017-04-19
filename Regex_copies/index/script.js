function logOut() {
	const regLog = document.querySelector(".regLog");
    const body = document.querySelector(".body");
	const menu = document.querySelector(".menu");
	const xhr = new XMLHttpRequest();
	xhr.open("POST", "/logout", true);

	const xhr1 = new XMLHttpRequest();
    xhr1.open("GET", "/", true);

	xhr.onreadystatechange = () => {
		if (xhr.readyState !== 4) return;
		xhr1.send();
	}

	xhr1.onreadystatechange = () => {
        if (xhr1.readyState !== 4) return;

        let str1 = xhr1.responseText.match(/<div class="regLog">([\s\S]*)(<\/div>){4}<\/header>/);
        let str2 = xhr1.responseText.match(/<div class="menu">([\s\S]*)<\/div><div class="body">/);
        let str3 = xhr1.responseText.match(/<div class="body">([\s\S]*)<\/div><script/);
        regLog.innerHTML = str1[1];
        menu.innerHTML = str2[1];
        body.innerHTML = str3[1];
    }
	xhr.send();
}

function login() {
	const head = document.getElementsByTagName("head")[0];
	const body = document.querySelector(".body");
	let scrLi = document.querySelector(".scrReg, .scrLi");
	if (scrLi !== null)
		scrLi.remove();
	
	let stlLi = document.querySelector(".stlReg, .stlLi");
	if (stlLi !== null)
		stlLi.remove();

	scrLi = document.createElement('script');
	scrLi.className = "scrLi";
	scrLi.src = "login/script.js";
	head.appendChild(scrLi);

	stlLi = document.createElement("link");
	stlLi.rel = "stylesheet";
	stlLi.href = "login/style.css";
	stlLi.type = "text/css";
	stlLi.className = "stlLi";
	head.appendChild(stlLi);

	const menu = document.querySelector(".menu");
	if (menu !== null)
		menu.remove();

	const xhr = new XMLHttpRequest();
	xhr.open("GET", "/login/login.html", true);
	xhr.onreadystatechange = () => {
		if (xhr.readyState !== 4) return;

		document.querySelector("title").innerHTML = "Войти";
		body.innerHTML = xhr.responseText;
	}
	xhr.send();
}

function registration() {
	const head = document.getElementsByTagName("head")[0];
	const body = document.querySelector(".body");
	let scrReg = document.querySelector(".scrLi");
	if (scrReg !== null)
		scrReg.remove();
	
	let stlReg = document.querySelector(".stlLi");
	if (stlReg !== null)
		stlReg.remove();

	scrReg = document.createElement('script');
	scrReg.className = "scrReg";
	scrReg.src = "registration/script.js";
	head.appendChild(scrReg);

	stlReg = document.createElement("link");
	stlReg.rel = "stylesheet";
	stlReg.href = "registration/style.css";
	stlReg.type = "text/css";
	stlReg.className = "stlReg";
	head.appendChild(stlReg);

	const menu = document.querySelector(".menu");
	if (menu !== null)
		menu.remove();

	const xhr = new XMLHttpRequest();
	xhr.open("GET", "/registration/registr.html", true);
	xhr.onreadystatechange = () => {
		if (xhr.readyState !== 4) return;

		document.querySelector("title").innerHTML = "Регистрация";
		body.innerHTML = xhr.responseText;
	}
	xhr.send();
}

function toHome() {
	const regLog = document.querySelector(".regLog");
    const body = document.querySelector(".body");
	let menu = document.querySelector(".menu");
	
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "/", true);

	xhr.onreadystatechange = () => {
		if (xhr.readyState !== 4) return;

		let str1 = xhr.responseText.match(/<div class="regLog">([\s\S]*)(<\/div>){4}<\/header>/);
        let str2 = xhr.responseText.match(/<div class="menu">([\s\S]*)<\/div><div class="body">/);
        let str3 = xhr.responseText.match(/<div class="body">([\s\S]*)<\/div><script/);
		const title = xhr.responseText.match(/<title>([\s\S]*)<\/title>/);
        regLog.innerHTML = str1[1];
		if (menu === null) {
			menu = document.createElement("div");
			menu.className = "menu";
			document.body.insertBefore(menu, body);
		}

		menu.innerHTML = str2[1];		
        body.innerHTML = str3[1];
		document.querySelector("title").innerHTML = title[1];
	}
	xhr.send();
}

function toArchive() {
	const regLog = document.querySelector(".regLog");
    const body = document.querySelector(".body");
	let menu = document.querySelector(".menu");
	
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "/", true);

	const xhr1 = new XMLHttpRequest();
	xhr1.open("GET", "/tasks", true);

	xhr.onreadystatechange = () => {
		if (xhr.readyState !== 4) return;

		let str1 = xhr.responseText.match(/<div class="regLog">([\s\S]*)(<\/div>){4}<\/header>/);
        let str2 = xhr.responseText.match(/<div class="menu">([\s\S]*)<\/div><div class="body">/);
		const title = xhr.responseText.match(/<title>([\s\S]*)<\/title>/);
        regLog.innerHTML = str1[1];
		if (menu === null) {
			menu = document.createElement("div");
			menu.className = "menu";
			document.body.insertBefore(menu, body);
			menu = document.querySelector(".menu");
		}

        menu.innerHTML = str2[1];		
		document.querySelector("title").innerHTML = title[1];
		xhr1.send();
	}

	xhr1.onreadystatechange = () => {
		if (xhr1.readyState !== 4) return;

		body.innerHTML = xhr1.responseText;
		document.querySelector("title").innerHTML = "Архив задач";
	}
	xhr.send();
}