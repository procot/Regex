class Regex {
    constructor () {
        this.user = {};
        this.isAutorizated = false;
    }

    Registration (user) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/autoriz?reg", true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) return;
            this.user = xhr.response ? JSON.parse(xhr.responseText) : {};
            this.isAutorizated = xhr.response ? true : false;
            if (!this.isAutorizated) {
                alert('Такой пользователь еще не зарегистрирован');
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
            this.user = xhr.response ? JSON.parse(xhr.responseText) : {};
            this.isAutorizated = xhr.response ? true : false;
            if (!this.isAutorizated) {
                alert('Такой пользователь еще не зарегистрирован');
            } else {
                document.location.href = '#/';
            }
        }
        xhr.send(JSON.stringify(user));
    }

    Logout () {
        this.user = {};
        this.isAutorizated = false;
    }

    get User() {
        return this.user;
    }

    get statusAutorizated() {
        return this.isAutorizated;
    }
}