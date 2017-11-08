'use strict';

var userCourse;
var activeUser;
var request_array_suffix = '_arr';
var pause_array_suffix = '_pause';
var pause_resume_btn = document.getElementById('pause_resume_btn');

var enterQueueBtn = document.getElementById('enter_queue_btn');
var pickTA = document.getElementById('pick_ta');
var problemType = document.getElementById('prob_type');
var flip_front = document.getElementById('enter_queue');
var flip_back = document.getElementById('pause_resume');
var remove_request_btn = document.getElementById('remove_request_btn');

var queueDisplay = document.getElementById('queue');

function createList(course) {
  var queueDisplay = document.getElementById('queue');
  //reorder the array if any requests are paused
  the_queues.pause_handler(course);
  for (var a = 0; a < the_queues[course + '_arr'].length; a++) {
    var newLi = document.createElement('li');
    var userid = the_queues[course + '_arr'][a];
    newLi.innerHTML = (a + 1 + '    ') + the_queues[course][userid].newli;
    queueDisplay.appendChild(newLi);
    newLi.setAttribute('id',userid);
    console.log('newLi', newLi);
  }
}
createList('seattle-201d27');

function student_request_event_listeners() {
  if(! sessionStorage.loginUser){
    userCourse = 'seattle-201d27';
    activeUser = 'MillerK';
  }
  flip_front.addEventListener('click', enterQueue);
  flip_back.addEventListener('click', pauseResume);
  remove_request_btn.addEventListener('click', removeRequest);
}

function enterQueue(e) {
  document.getElementsByClassName('flipBtn')[0].style.transform = 'rotateX(180deg)';
  var student_requested_ta = pickTA.value;
  var student_requestIssue = problemType.value;
  var student_request = new HelpRequest(activeUser, student_requestIssue, student_requested_ta, userCourse);
  var queueDisplay = document.getElementById('queue');
  queueDisplay.innerHTML = '';
  createList(userCourse);
};

function removeRequest(e) {
  e.preventDefault();
  document.getElementsByClassName('flipBtn')[0].style.transform = 'rotateX(0deg)';
  the_queues.deleteRequest(userCourse, activeUser);
  queueDisplay.innerHTML = '';
  createList(userCourse);
}

function pauseResume(e) {
  e.preventDefault();
  the_queues.togglePauseResume(userCourse, activeUser);
}

function pause_handler(aCourse){
  //if there are no requests on pause, exit
  if (! the_queues[aCourse.pausedRequests]) return;
  var temp_course_array = [];
  var pause_request_array = the_queues[aCourse.pausedRequests];
  var course_request_array = the_queues[aCourse.requestArray];
  for (var i = 0; i < course_request_array.length; i++){
    if (pause_request_array.includes(course_request_array[i])){
      temp_course_array.push(course_request_array[i + 1]);
      temp_course_array.push(course_request_array[i]);
      i++;
    } else {
      temp_course_array.push(course_request_array[i]);
    }
  }
  the_queues[aCourse.requestArray] = temp_course_array;
}

student_request_event_listeners();
