class Regex {
    constructor () {
        this.user = {};
        this.isAutorizated = false;
        this.results = [];
        this.currentTask = {
            titleRussian: '',
            titleEnglish: ''
        };
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/getUserInfo', true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) return;
            const res = JSON.parse(xhr.responseText);
            this.user = res.data ? res.data : {};
            this.isAutorizated = res.isAutorizated ? res.isAutorizated : false;
        }
        xhr.send();
    }

    Registration (user) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/autoriz?reg", true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) return;
            if (!xhr.responseText) return;
            const res = JSON.parse(xhr.responseText);
            this.user = res.data;
            this.isAutorizated = res.isAutorizated;
            if (!this.isAutorizated) {
                alert('Такой пользователь уже зарегистрирован');
            } else {
                document.location.href = '#/';
            }
        }
        xhr.send(JSON.stringify(user));
    }

    Login (user) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/autoriz?login", true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) return;
            if (!xhr.responseText) return;
            const res = JSON.parse(xhr.responseText);
            this.user = res.data;
            this.isAutorizated = res.isAutorizated;
            if (!this.isAutorizated) {
                alert('Такой пользователь еще не зарегистрирован');
            } else {
                document.location.href = '#/';
            }
        }
        xhr.send(JSON.stringify(user));
    }

    Logout (source) {
        const self = this;
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/logout', true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) return;
            self.user = {};
            self.isAutorizated = false;
            document.location.href = '#/';
        }
        xhr.send();
    }

    Submit(data) {
        const self = this;
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/checkTask', true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) return;
            if (!xhr.responseText) return;
            const res = JSON.parse(xhr.responseText);
            if (res.status === 'runtime') {
                self.results.unshift({
                    "message": `Ошибка исполнения на тесте ${res.number}`,
                    'status': 'error',
                    'task': data.titleRussian,
                    'href': `#/task/${data.titleEnglish}`
                });
            } else if (res.status === 'answer') {
                self.results.unshift({
                    "message": `Неправильный ответ на тесте ${res.number}`,
                    'status': 'error',
                    'task': data.titleRussian,
                    'href': `#/task/${data.titleEnglish}`
                });
            } else {
                self.results.unshift({
                    "message": 'Все тесты пройдены',
                    'status': 'ok',
                    'task': data.titleRussian,
                    'href': `#/task/${data.titleEnglish}`
                });
            }
            document.location.href = '#/task/results';
        }
        xhr.send(JSON.stringify(data));
    }

    get User() {
        return this.user;
    }

    get statusAutorizated() {
        return this.isAutorizated;
    }
}