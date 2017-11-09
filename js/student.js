'use strict';

var the_queues;
var users;
var refresh_intervalId;

function init_objects_from_storage(){
  // if (!the_queues){
  //   the_queues = JSON.parse(localStorage.the_queues);
  //   //the_queues = new Queues(the_queues);
  //   //var theQ = new Queues();
  //   //console.log('theQ: ', theQ);
  //   the_queues = Object.setPrototypeOf(the_queues, new Queues());
  //   console.log('the_queues', the_queues);
  // }
  if (!users){
    users = JSON.parse(localStorage.users);
    console.log('users', users);
  }
}

init_objects_from_storage();
//get_theQueues();

var userCourse;
var activeUser;
//var request_array_suffix = '_arr';
//var pause_array_suffix = '_pause';
//var pause_resume_btn = document.getElementById('pause_resume_btn');

//var enterQueueBtn = document.getElementById('enter_queue_btn');
var pickTA = document.getElementById('pick_ta');
var problemType = document.getElementById('prob_type');
var flip_front = document.getElementById('enter_queue');
var flip_back = document.getElementById('pause_resume');
var remove_request_btn = document.getElementById('remove_request_btn');

var queueDisplay = document.getElementById('queue');

function createList(course) {
  get_theQueues();
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
  setPauseClass(course);
  set_theQueues();
}
//createList('seattle-201d27');

function student_request_event_listeners() {
  if( sessionStorage.username){
    userCourse = users[sessionStorage.username].currentCourse;
    activeUser = sessionStorage.username;
  }

  flip_front.addEventListener('click', enterQueue);
  flip_back.addEventListener('click', pauseResume);
  remove_request_btn.addEventListener('click', removeRequest);
}

function enterQueue(e) {
  get_theQueues();
  console.log('get: ', the_queues);
  document.getElementsByClassName('flipBtn')[0].style.transform = 'rotateX(180deg)';
  var student_requested_ta = pickTA.value;
  var student_requestIssue = problemType.value;
  var student_request = new HelpRequest(activeUser, student_requestIssue, student_requested_ta, userCourse);
  set_theQueues();
  var queueDisplay = document.getElementById('queue');
  queueDisplay.innerHTML = '';
  createList(userCourse);
  console.log('set: ', the_queues);
};

function removeRequest(e) {
  e.preventDefault();
  document.getElementsByClassName('flipBtn')[0].style.transform = 'rotateX(0deg)';
  the_queues.deleteRequest(userCourse, activeUser);
  queueDisplay.innerHTML = '';
  get_theQueues();
  createList(userCourse);
  set_theQueues();
}

function pauseResume(e) {
  e.preventDefault();
  get_theQueues()
  the_queues.togglePauseResume(userCourse, activeUser);
  get_theQueues()
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

if (localStorage.potd) {
  console.log('this is working');
  currentPotd.innerHTML = '';
  currentPotd.innerHTML = localStorage.potd;
}

function setPauseClass(course) {
  var pauseIds = the_queues.getPausedArray(course);
  for (var p = 0; p < pauseIds.length; p++){
    document.getElementById(pauseIds[p]).classList.add('pause');
  }
}

function get_theQueues(){
  the_queues = JSON.parse(localStorage.the_queues);
  the_queues = Object.setPrototypeOf(the_queues, new Queues());
}

function set_theQueues(){
  localStorage.the_queues = JSON.stringify(the_queues);
}

function refreshQueueInterval(){
  refresh_intervalId = setInterval(refreshQueue, 10000);
}

function refreshQueue(){
  queueDisplay.innerHTML = '';
  createList(userCourse);

}

student_request_event_listeners();
createList(userCourse);
refreshQueueInterval();
