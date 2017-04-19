function logIn () {
  let data = {}

  data.email = document.querySelector('#email').value
  data.password = document.querySelector('#password').value;

  if (!classRegex.Login(data)) {
      alert('Такой пользователь еще не зарегистрирован');
  }
}

function showPassword (source) {
  let password = document.querySelector('#password')
  if (password.type === 'password') {
    password.type = 'text'
    source.checked = true
  }else {
    password.type = 'password'
    source.checked = false
  }
}
