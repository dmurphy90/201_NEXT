'use strict';

var potdButton = document.getElementById('problem_otd_button');
var popup = document.getElementById('potd_popup');
var overlay = document.getElementById('potd_overlay');
var potdSubmit = document.getElementById('submit_potd');
var potdCancel = document.getElementById('cancel_potd');

function openPopup() {
  popup.style.display = "block";
  console.log('hello');
}

function closePopup() {
  popup.style.display = "none";
  console.log('goodbye');
}

potdButton.addEventListener('click', openPopup);
potdCancel.addEventListener('click', closePopup);
