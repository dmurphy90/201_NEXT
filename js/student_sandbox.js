'use strict';

var courses = {};
var aCourse = {
  courseNum: 'seattle-201d27',
  instructor: 'Brian Nations',
  availableTA:['StuartM', 'BhartiB']
};

courses['seattle-201d27'] = aCourse;

var enterQueueBtn = document.getElementById('enter_queue_btn');
var pickTA = document.getElementById('pick_ta');
var problemType = document.getElementById('prob_type');

pickTA.addEventListener('change', this.value);
problemType.addEventListener('change', this.value);

var flip_front = document.getElementById('enter_queue');
flip_front.addEventListener('click', enterQueue);
var flip_back = document.getElementById('pause_resume');
flip_back.addEventListener('click', pauseResume);
var remove_request_btn = document.getElementById('remove_request_btn');
remove_request_btn.addEventListener('click', removeRequest);

function enterQueue(e) {
  console.log('Pick TA: ', pickTA.value);
  console.log('Problem Type: ', problemType.value);
  document.getElementsByClassName('flipBtn')[0].style.transform = 'rotateX(180deg)';
  remove_request_btn.classList.toggle('active');
};

function removeRequest(e) {
  document.getElementsByClassName('flipBtn')[0].style.transform = 'rotateX(0deg)';
  remove_request_btn.classList.toggle('active');
}

function pauseResume(e) {
}

function setStudentHeader() {
  users[sessionStorage.username].fullName;
}

setStudentHeader();
