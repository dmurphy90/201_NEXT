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

function createList(course) {
  var queueDisplay = document.getElementById('queue');
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
  pause_resume_btn.addEventListener('click', update_request);
  pickTA.addEventListener('change', this.value);
  problemType.addEventListener('change', this.value);
  flip_front.addEventListener('click', enterQueue);
  flip_back.addEventListener('click', pauseResume);
  remove_request_btn.addEventListener('click', removeRequest);
}

function update_request(e){
  e.preventDefault();
  var temp_request_array = [];

  if (!the_queues[userCourse + request_array_suffix]) the_queues[userCourse + request_array_suffix] = [];
  var course_request_array = the_queues[userCourse + request_array_suffix];
  //if the help request is not in the array add it to the request array and object
  //for that course then exit the function
  if (! course_request_array.includes(activeUser)){
    course_request_array.push(activeUser);
    //the_queues[userCourse][activeUser] = new HelpRequest();
    console.log('Push to request' );
    return;
  }
  // if the request is not in the pause array add it then exit the function
  if (!the_queues[userCourse + pause_array_suffix]) the_queues[userCourse + pause_array_suffix] = [];
  var course_pause_array = the_queues[userCourse + pause_array_suffix];
  if (! course_pause_array.includes(activeUser)){
    console.log('push to pause');
    the_queues[userCourse + pause_array_suffix].push(activeUser);
    return;
  }
  //if the request is in the pause array, remove it
  if (course_pause_array.includes(activeUser)){
    console.log('remove from pause');
    var temp_pause_aray = [];
    for (var i = 0; i < course_pause_array.length; i++){
      if(course_pause_array[i] != activeUser) temp_pause_aray.push(course_pause_array[i]);
    }
    the_queues[userCourse + pause_array_suffix] = temp_pause_aray;
  }

}


function enterQueue(e) {
  console.log('Pick TA: ', pickTA.value);
  console.log('Problem Type: ', problemType.value);
  document.getElementsByClassName('flipBtn')[0].style.transform = 'rotateX(180deg)';

  //make sure there is an array for the course
  if (!the_queues[userCourse + request_array_suffix]) the_queues[userCourse + request_array_suffix] = [];
  var course_request_array = the_queues[userCourse + request_array_suffix];
  //if the help request is not in the array add it to the request array and object
  //for that course then exit the function
  if (! course_request_array.includes(activeUser)){
    course_request_array.push(activeUser);
    //the_queues[userCourse][activeUser] = new HelpRequest();
    console.log('Push to request' );
  }
};

function removeRequest(e) {
  document.getElementsByClassName('flipBtn')[0].style.transform = 'rotateX(0deg)';
}

function pauseResume(e) {
  // if the request is not in the pause array add it then exit the function
  if (!the_queues[userCourse + pause_array_suffix]) the_queues[userCourse + pause_array_suffix] = [];
  var course_pause_array = the_queues[userCourse + pause_array_suffix];
  if (! course_pause_array.includes(activeUser)){
    console.log('push to pause');
    the_queues[userCourse + pause_array_suffix].push(activeUser);
    return;
  }
  //if the request is in the pause array, remove it
  if (course_pause_array.includes(activeUser)){
    console.log('remove from pause');
    var temp_pause_aray = [];
    for (var i = 0; i < course_pause_array.length; i++){
      if(course_pause_array[i] != activeUser) temp_pause_aray.push(course_pause_array[i]);
    }
    the_queues[userCourse + pause_array_suffix] = temp_pause_aray;
  }
}


student_request_event_listeners();
