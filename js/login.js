'use strict';

var loginBox = document.getElementsByClassName('login');
var loginBtn = document.getElementById('login_btn');
var loginForm = document.getElementById('login_form');
var username;

function authenticate() {
  console.log('it was pressed');
  username = event.target.username.value;
  console.log('username:', username);
  if (users[username]) {
    username = JSON.stringify(username);
    username = JSON.parse(username);
    sessionStorage.username = username;
  }
  console.log('session storage username:', sessionStorage.username);
};

function loadPage(event) {
  event.preventDefault();
  authenticate();
  console.log('authenticated');
  if(users[username]) {
    console.log('user perms:', users[username].userPerms);
    if(users[username].userPerms === 'admin') {
      console.log('second if worked');
      window.location = './admin_ta.html'
    } else {
      console.log('else worked');
      window.location = './student.html'
    }
  }
}

loginForm.addEventListener('submit', loadPage);
