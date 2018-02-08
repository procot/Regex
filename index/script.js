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