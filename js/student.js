'use strict';

// Create global variables.
var userCourse;
var activeUser;
var currentUser;
var refresh_intervalId;
var student_requested_ta;

// Get HTML elements that will be manipulated.
var pickTA = document.getElementById('pick_ta');
var problemType = document.getElementById('prob_type');
var flip_front = document.getElementById('enter_queue');
var flip_back = document.getElementById('pause_resume');
var remove_request_btn = document.getElementById('remove_request_btn');
var studentHeader = document.getElementById('student_header');
var queueDisplay = document.getElementById('queue');
var selectedTA = document.getElementById('ta_image_wrap');
var TA_Pic = document.createElement('img');

// Create the queue.
function createList(course) {
  var queueDisplay = document.getElementById('queue');
  //reorder the array if any requests are paused
  get_theQueues();
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

// On page load, get local storage and listen for button events.
function student_request_event_listeners() {
  if( sessionStorage.username){
    userCourse = users[sessionStorage.username].currentCourse;
    activeUser = sessionStorage.username;
    currentUser = users[sessionStorage.username].fullName;
    studentHeader.innerHTML = currentUser;
  }
  set_available_ta_dropdown();
  flip_front.addEventListener('click', enterQueue);
  flip_back.addEventListener('click', pauseResume);
  remove_request_btn.addEventListener('click', removeRequest);
  pickTA.addEventListener('change', displaySelectedTA);
  student_requested_ta = pickTA.value;
  TA_Pic.setAttribute('src', users[student_requested_ta].profileImagePath);
  selectedTA.appendChild(TA_Pic);
}

// Called by previous function, populates list of available TAs.
function set_available_ta_dropdown(){
  if(localStorage.courses){
    var courses = JSON.parse(localStorage.courses);
    var availableTAs = courses[userCourse].availableTA;
    var addTA = document.getElementById('pick_ta');
    for (var i = 0; i < availableTAs.length; i++) {
      var optionTA = document.createElement('option');
      optionTA.setAttribute('value', availableTAs[i]);
      optionTA.innerHTML = users[availableTAs[i]].fullName;
      addTA.appendChild(optionTA);
    }
  }
}

// Display the profile pic of the selected TA.
function displaySelectedTA() {
  selectedTA.innerHTML = '';
  var TA_Pic = document.createElement('img');
  student_requested_ta = pickTA.value;
  TA_Pic.setAttribute('src', users[student_requested_ta].profileImagePath);
  selectedTA.appendChild(TA_Pic);
}

// Grab TA preference and problem type, then enter the bottom of the queue for your course.
function enterQueue() {
  get_theQueues();
  document.getElementsByClassName('flipBtn')[0].style.transform = 'rotateX(180deg)';
  remove_request_btn.classList.toggle('active');
  var student_requestIssue = problemType.value;
  new HelpRequest(activeUser, student_requestIssue, student_requested_ta, userCourse);
  set_theQueues();
  var queueDisplay = document.getElementById('queue');
  queueDisplay.innerHTML = '';
  createList(userCourse);
};

// Drop out of the queue for your course.
function removeRequest(e) {
  e.preventDefault();
  document.getElementsByClassName('flipBtn')[0].style.transform = 'rotateX(0deg)';
  remove_request_btn.classList.toggle('active');
  get_theQueues();
  the_queues.deleteRequest(userCourse, activeUser);
  set_theQueues();
  queueDisplay.innerHTML = '';
  createList(userCourse);
}

// Toggle freezing your place in line.
function pauseResume(e) {
  e.preventDefault();
  get_theQueues();
  the_queues.togglePauseResume(userCourse, activeUser);
  set_theQueues();
}

// I don't know what this does. Probably something amazing.
function setPauseClass(course) {
  get_theQueues();
  var pauseIds = the_queues.getPausedArray(course);
  for (var p = 0; p < pauseIds.length; p++){
    document.getElementById(pauseIds[p]).classList.add('pause');
  }
}

// This has to do with the amazing thing happening. Probably pulling something from local storage that has something to do with something something the pause state.
function get_theQueues(){
  the_queues = JSON.parse(localStorage.the_queues);
  the_queues = Object.setPrototypeOf(the_queues, new Queues());
}

function set_theQueues(){
  localStorage.the_queues = JSON.stringify(the_queues);
}

// Every 10 seconds...
function refreshQueueInterval(){
  refresh_intervalId = setInterval(refreshQueue, 10000);
}

// Refresh the queue.
function refreshQueue(){
  queueDisplay.innerHTML = '';
  createList(userCourse);
  if (localStorage.potd) {
    currentPotd.innerHTML = '';
    currentPotd.innerHTML = localStorage.potd;
  }

}

student_request_event_listeners();


// Clear storage on signout.
function signout(event) {
  sessionStorage.clear();
  window.location = './index.html';
}
logout.addEventListener('click', signout);

createList(userCourse);
refreshQueueInterval();
