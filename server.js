const http = require('http');
const fs = require('fs');
const url = require("url");
const querystring = require("querystring");
const mongoClient = require("mongodb").MongoClient;
const mongoUrl = "mongodb://localhost:27017/regexdb";

const requests = {};
let isAutorizated = false;
let currentUser = null;

requests["/"] = function (res) {
	/*let count = 2;
    let home = '<!DOCTYPE html><html><head><title>Главная</title><meta charset="utf-8">' +
				'<link rel="stylesheet" type="text/css" href="index/style.css"></head>' +
				'<body link="black" vlink="black" alink="black"><header><div id="headchild">' +
				'<div id="headchild1"><div id="headchild1_1"><a onclick="toHome()" tabindex="1"><div class="nameSite">Regex.com</div></a></div></div>' +
				'<div id="headchild2"><div id="headchild2_1"><div class="regLog">';
	if (isAutorizated){
		home += '<a onclick="logOut()" tabindex="' + `${count++}` + '" onkeypress="if(event.keyCode===13)logOut()">' + 
		'<div style="margin: 15px 0;">Выйти</div></a>';
	}
	else {
		home += '<a onclick="registration()" tabindex="' + `${count++}` + '" onkeypress="if(event.keyCode===13)registration()"' + 
				'><div>Регистрация</div></a>' + 
				'<a onclick="login()" tabindex="' + `${count++}` + '" onkeypress="if(event.keyCode===13)login()"><div>Войти</div></a>';
	}

	home += '</div></div></div></div></header><div class="menu"><a onclick="toHome()" tabindex="' + `${count++}` + '"' + 
			' onkeypress="if(event.keyCode===13)toHome()"><div>Главная</div></a>' +
			'<a onclick="toArchive()" tabindex="' + `${count++}` + '" onkeypress="if(event.keyCode===13)toArchive()"><div>Архив задач</div></a>';

	if (currentUser != null)
		home += '<a onclick="user()" tabindex="' + `${count++}` + '" onkeypress="if(event.keyCode===13)user()"><div>Профиль</div></a><div id="user"><div>' + currentUser.login + '</div></div>';
	
	home += '</div><div class="body"></div>' + '<script src="index/script.js"></script></body></html>';*/

    /*res.writeHead(200, {"Content-Type": "text/html"});
    res.end(home);*/
	requests["file"](res, "/index/index.html");
}

requests["/registration"] = function (res) {
	fs.readFile("registration/registr.html", (err, data) => {
		if (err) return res.end();

		res.writeHead(200, {"Content-Type": "text/html"});
		
		res.end(data);
	});
}

requests["/login"] = function (res) {
	fs.readFile("login/login.html", "utf-8", (err, data) => {
		if (err) return res.end();

		res.writeHead(200, {"Content-Type": "text/html"});
		
		res.write(data);
		res.end();
	});
}

requests["/logout"] = function (res) {
	isAutorizated = false;
	currentUser = null;
	res.end();
}

requests["/tasks"] = function (res) {
	fs.readFile("tasks/tasks.html", (err, data) => {
		if (err) return res.end();

		res.writeHead(200, {"Content-Type": "text/html"});
		res.end(data);
	});
}

requests["file"] = function (res, nameFile) {
	nameFile = nameFile.slice(1);
	
	fs.readFile(nameFile, (err, data) => {
		if (err) return res.end();

		if (/.js$/.test(nameFile)) {
			res.writeHead(200, {"Content-Type": "text/javascript"});
			res.write(data);
		}
		else if (/.ico$/.test(nameFile)) {
			res.writeHead(200, {"Content-Type": "image/ico"});
			res.write(data, "binary");
		}
		else if (/.ttf$/.test(nameFile)) {
			res.writeHead(200, {"Content-Type": "fonts/ttf"});
			res.write(data);
		} else {
			res.writeHead(200, {"Content-Type": `text/${nameFile.match(/\.(\S+)$/)[1]}`});
			res.write(data);
		}
		res.end();
	});
}

requests["/autoriz"] = function (res, query, req) {
	if (query === "reg") {
		let user = {};

		req.on("data", (data) => {
			user = JSON.parse(data);
		});

		req.on("end", () => {
			mongoClient.connect(mongoUrl, (err, db) => {
				db.collection("users").find(user).toArray((err, result) => {
					if (err) {
						res.end();
						return err;
					}

					if (result.length) {
						res.end();
					}
					else {
						db.collection("users").insertOne(user, (err, result) => {
							if (err) {
								res.end();
								return err;
							}

							res.write(JSON.stringify(result[0]));
							res.end();
							res.end();
						});
					}
				});				
			});
		});
	} else {
		let user = {};

		req.on("data", (data) => {
			user = JSON.parse(data);
		});

		req.on("end", () => {
			mongoClient.connect(mongoUrl, (err, db) => {
				if (err) return res.end();

				db.collection("users").find(user).toArray((err, result) => {
					if (err) {
						isAutorizated = false;
						db.close();
						res.end();
						return err;
					}

					res.write(JSON.stringify(result[0]));
					res.end();
					db.close();
				});				
			});
		});
	}
}

requests["/user"] = function (res) {
	res.end();
}

function start() {
    http.createServer((req, res) => {
        let path = url.parse(req.url);
		if (/(\.\S+)$/.test(path.pathname))
			requests["file"](res, path.pathname);
		else
        requests[path.pathname](res, path.query, req);
    }).listen(8888, "127.0.0.1");
    console.log("Server started");
}

start();