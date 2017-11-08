'use strict';

var courses = {};
var aCourse = {
  courseNum: 'seattle-201d27',
  instructor: 'Brian Nations',
  availableTA:['StuartM', 'BhartiB', 'EvansJ']
};

courses['seattle-201d27'] = aCourse;

var pickTA = document.getElementById('pick_ta');
var problemType = document.getElementById('prob_type');

pickTA.addEventListener('change', this.value);
problemType.addEventListener('change', this.value);

var flip_front = document.getElementById('enter_queue');
flip_front.addEventListener('click', enterQueue);
var flip_back = document.getElementById('pause_resume');
var remove_request_btn = document.getElementById('remove_request_btn');
remove_request_btn.addEventListener('click', removeRequest);

function enterQueue(e) {
  document.getElementsByClassName('flipBtn')[0].style.transform = 'rotateX(180deg)';
  remove_request_btn.classList.toggle('active');
};

function removeRequest(e) {
  document.getElementsByClassName('flipBtn')[0].style.transform = 'rotateX(0deg)';
  remove_request_btn.classList.toggle('active');
}

function fillPage() {
  var currentUser = users[sessionStorage.username].fullName;
  var currentCourse = users[sessionStorage.username].currentCourse;
  var availableTAs = courses[currentCourse].availableTA;
  var studentHeader = document.getElementById('student_header');
  studentHeader.innerHTML = currentUser;
  var addTA = document.getElementById('pick_ta');
  for (var i = 0; i < availableTAs.length; i++) {
    var optionTA = document.createElement('option');
    optionTA.innerHTML = availableTAs[i];
    addTA.appendChild(optionTA);
  }
}

fillPage();
