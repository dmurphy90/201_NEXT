'use strict';

var potdButton = document.getElementById('problem_otd_button');
var popup = document.getElementById('potd_popup');
var overlay = document.getElementById('potd_overlay');
var potdSubmit = document.getElementById('submit_potd');
var potdCancel = document.getElementById('cancel_potd');
var potdForm = document.getElementById('potd_form');
var currentPotd = document.getElementById('current_potd');
var problemOtd = document.getElementsByClassName('problem_otd');
var para = document.createElement('p');

function openPopup() {
  popup.style.display = 'block';
  console.log('hello');
}

function closePopup() {
  popup.style.display = 'none';
  console.log('goodbye');
}

function postPotd(event) {
  event.preventDefault();
  console.log('submitted');
  var potd = event.target.potd_text.value;
  localStorage.potd = potd;
  console.log('problem of the day:', potd);
  popup.style.display = 'none';
}

// if (localStorage.potd) {
//   console.log('this is working');
//   currentPotd.innerHTML = '';
//   currentPotd.innerHTML = localStorage.potd;
// }

potdButton.addEventListener('click', openPopup);
potdCancel.addEventListener('click', closePopup);
potdForm.addEventListener('submit', postPotd);
