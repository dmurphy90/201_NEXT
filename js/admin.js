'use strict';

var adminHeader = document.getElementById('admin_header');
var currentUser;

//var test_TA = 'StuartM';
var currentCourseToDislay = 'Unavailable';

//object to hold all course objects
var courses = {};

//ref to active_course drop down
var active_course_ul = document.getElementById('active_course_ul');

build_test_courses_data();
initActiveCourse();

function initActiveCourse() {
  build_active_course_lineItems();
  //add click event handler to active_course ul
  active_course_ul.addEventListener('click', set_active_course);
}

function build_active_course_lineItems() {
  var target_list = active_course_ul.getElementsByClassName('drop_items')[0];
  var courseNames = Object.keys(courses);
  var courseItem;
  for (var i = 0; i < courseNames.length; i++){
    courseItem = document.createElement('li');
    courseItem.textContent = courseNames[i];
    target_list.appendChild(courseItem);
  }
}

function adminHeaderName() {
  if( sessionStorage.username){
    currentUser = users[sessionStorage.username].fullName;
    adminHeader.innerHTML = currentUser;
  }
}

adminHeaderName();

function set_active_course(e) {
  //get the value of the active course before it is changed
  var current_active_course = active_course_ul.dataset.value;
  //if the function returns false, then no data change has taken place
  customSelectAction(this, e);
  //get the value of the active course after it is changed
  var updated_active_course = active_course_ul.dataset.value;
  var oldUserId = document.getElementById('user_image_wrap').getAttribute('data-id');
  // removes user from bieng help array for their couse.
  removeFromBeingHelpedArray(current_active_course, oldUserId);
  // removes user from bieng help array for their couse.
  //get the active TA
  //var active_ta = test_TA;
  var active_ta = sessionStorage.username;
  var active_user_type = users[active_ta].userType;
  //if the values are the same, then nothing changed, no update needed
  if (current_active_course === updated_active_course) return;
  createList(updated_active_course);
  if (active_user_type === 'ta'){
    update_available_ta(active_ta, current_active_course, updated_active_course);
  }
}

function update_available_ta(active_ta, remove_from_course, add_to_course) {
  //array to hold modified array data
  var updated_availible_array = [];
  //add ta to available TAs list for the course
  if (add_to_course != 'Unavailable') courses[add_to_course].availableTA.push(active_ta);
  //if the ta was changeing from on ecourse to another, remove them from previos array
  if (remove_from_course === 'Unavailable') return;
  var availible_array = courses[remove_from_course].availableTA;
  //create new array of avaialable TAs without this TA
  for (var i = 0; i < availible_array.length; i++){
    if ( availible_array[i] != active_ta) availible_array.push(availible_array[i]);
  }
  courses[remove_from_course].availableTA = updated_availible_array;
}

//set selection of custom drop down
function customSelectAction(el, e) {
  var top_li = el.getElementsByTagName('li')[0];
  var innerUl = top_li.getElementsByTagName('ul')[0];
  innerUl.classList.toggle('active');
  var clickedTarget = e.target;
  if (top_li != clickedTarget){
    top_li.firstChild.textContent = e.target.textContent;
    el.setAttribute('data-value', e.target.textContent);
  }
}

//build using coursesData from app.js
function build_test_courses_data() {
  var the_course;
  for (var i = 0; i < coursesData.length; i++){
    the_course = new Course(coursesData[i].courseName, coursesData[i].courseInstructor);
    courses[the_course.courseNum] = the_course;
  }
  console.log('courses: ', courses);
}

function studentCardEvent(e) {
  var userid;
  if (e.target.id === true) {
    userid = e.target.id;
  } else if (e.target.parentNode.id) {
    userid = e.target.parentNode.id;
  } else {
    return;
  }
  var tempPic = document.getElementById('user_image_wrap');
  tempPic.setAttribute('data-id',userid);
  tempPic.innerHTML = '<img src="' + users[userid].profileImagePath + '" >';
  var tempName = document.getElementById('student_name');
  tempName.innerText = users[userid].firstName;
};

function studentCard(user) {
  var userid = user;
  var tempPic = document.getElementById('user_image_wrap');
  tempPic.setAttribute('data-id',userid);
  tempPic.innerHTML = '<img src="' + users[userid].profileImagePath + '" >';
  var tempName = document.getElementById('student_name');
  tempName.innerText = users[userid].firstName;
};
// this builds the list everytime a change is made
function createList(course) {
  if (course === 'Unavailable') {
    var olClear = document.getElementById('queue');
    olClear.innerHTML = '';
    return;
  }
  else {
    var queueDisplay = document.getElementById('queue');
    queueDisplay.innerHTML = '';
    //reorder the request array if there are any requests on pause
    the_queues.pause_handler(course);
    for (var a = 0; a < the_queues[course + '_arr'].length; a++) {
      var newLi = document.createElement('li');
      var userid = the_queues[course + '_arr'][a];
      console.log('user id before appending',userid);
      newLi.innerHTML = (a + 1 + '    ') + the_queues[course][userid].newli;
      queueDisplay.appendChild(newLi);
      newLi.setAttribute('id',userid);

      var testli = document.getElementById(userid);
      console.log('testli',testli);
      testli.addEventListener('click', studentCardEvent);

    }

    if (the_queues[course + '_arr'][0]) {
      studentCard(the_queues[course + '_arr'][0]);
    } else {
      studentCard('LegoM');
    }

    setPauseClass(course);
    studentCard(the_queues[course + '_arr'][0]);


  };
}

function setButtonListener() {
  var nextbtn = document.getElementById('next');
  nextbtn.addEventListener('click', nextRemove);
  var bumpbtn = document.getElementById('bump');
  bumpbtn.addEventListener('click', bump);
}





function bump(e) {
  var userToBump = document.getElementById('user_image_wrap').getAttribute('data-id');
  var userCourse = document.getElementById('active_course_ul').getAttribute('data-value');
  if (userToBump != '') {
    var index = the_queues[userCourse + '_arr'].indexOf(userToBump);
    if(index != -1) {
      the_queues[userCourse + '_arr'].splice(index, 1);
    };

    the_queues[userCourse + '_arr'].push(userToBump);
    removeFromBeingHelpedArray(userCourse, userToBump);
    createList(userCourse);
  }
}
// adds the user to array of being helped for the course they are in



function nextRemove(e) {
  var userToRemove = document.getElementById('user_image_wrap').getAttribute('data-id');
  console.log('next remove', userToRemove);
  var userCourse = document.getElementById('active_course_ul').getAttribute('data-value');
  console.log('user course', userCourse);

  if (userToRemove) {
    delete the_queues[userCourse][userToRemove];
  }
  removeFromBeingHelpedArray(userCourse, userToRemove);

  var index = the_queues[userCourse + '_arr'].indexOf(userToRemove);
  console.log('index', index);
  if(index != -1) {
    the_queues[userCourse + '_arr'].splice(index, 1);
  }
  createList(userCourse);
}



// adds the user to array of being helped for the course they are in
function beingHelped(userId) {
  var userCourse = document.getElementById('active_course_ul').getAttribute('data-value');
  if (the_queues[userCourse + '_beingHelped'].includes(userId)) {
    return;
  } else {
    the_queues[userCourse + '_beingHelped'].push(userId);
  }
  return;
}

// removes user from being helped status
function removeFromBeingHelpedArray(userCourse, userId) {
  if (userCourse != 'Unavailable') {
    var helpedIndex = the_queues[userCourse + '_beingHelped'].indexOf(userId);
    if(helpedIndex != -1) {
      the_queues[userCourse + '_beingHelped'].splice(helpedIndex, 1);
    }
  }
}

function setPauseClass(course) {
  var pauseIds = the_queues.getPausedArray(course);
  for (var p = 0; p < pauseIds.length; p++){
    document.getElementById(pauseIds[p]).classList.add('pause');
  }
}
setButtonListener();
function getLocal (objectName) {
  var localObject = JSON.parse(localStorage[objectName]);
  return localObject;
}
function setLocal(objectName, objectToSet) {
  localStorage[objectName] = JSON.stringify(objectToSet);
}
//setLocal('the_queues',the_queues);

//console.log('getlocal',getLocal(the_queues););


function signout(event) {
  sessionStorage.clear();
  window.location = './index.html';
}
logout.addEventListener('click', signout);
