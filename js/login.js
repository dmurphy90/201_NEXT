'use strict';

var loginBox = document.getElementsByClassName('login');
var loginBtn = document.getElementById('login_btn');
var loginForm = document.getElementById('login_form');
var username;
var signupButton = document.getElementById('signup_button');
var signupOverlay = document.getElementById('signup_overlay');
var signupPopup = document.getElementById('signup_popup');
var signupForm = document.getElementById('signup_form');
var userSignup = document.getElementById('user_signup');
var cancelSignup = document.getElementById('cancel_signup');
var signupForm = document.getElementById('signup_form');

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

function openPopup() {
  signupPopup.style.display = 'block';
  console.log('hello');
}

function closePopup() {
  signupPopup.style.display = 'none';
  console.log('goodbye');
}

function newUser(event) {
  event.preventDefault();

  var firstName = event.target.firstName.value;
  var lastName = event.target.lastName.value;
  var userType = event.target.lastName.value;
  var course = event.target.course.value;
  var someUser = new User(firstName, lastName, userType, course);

  users[someUser.userId] = someUser;
  console.log('user list:', users);
  signupForm.reset();
}

loginForm.addEventListener('submit', loadPage);
signupButton.addEventListener('click', openPopup);
cancelSignup.addEventListener('click', closePopup);
signupForm.addEventListener('submit', newUser);
