'use strict';

var test_TA = 'StuartM';

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


function set_active_course(e) {
  //get the value of the active course before it is changed
  var current_active_course = active_course_ul.dataset.value;
  //if the function returns false, then no data change has taken place
  customSelectAction(this, e);
  //get the value of the active course after it is changed
  var updated_active_course = active_course_ul.dataset.value;
  //get the active TA
  var active_ta = test_TA;
  //if the values are the same, then nothing changed, no update needed
  if (current_active_course === updated_active_course) return;
  update_available_ta(active_ta, current_active_course, updated_active_course);
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
