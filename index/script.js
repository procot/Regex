const classRegex = new Regex();

function logIn () {
  let data = {}

  data.email = document.querySelector('#email').value
  data.password = document.querySelector('#password').value;

  classRegex.Login(data);
}

function showPassword (source) {
  let password = document.querySelector('#password')
  if (password.type === 'password') {
    password.type = 'text';
    source.checked = true;
  }else {
    password.type = 'password';
    source.checked = false;
  }
}

function reg() {
    let data = {};

    data.login = document.querySelector("#login").value;
    data.email = document.querySelector("#email").value;
    data.password = document.querySelector("#password").value;
    classRegex.Registration(data);
}