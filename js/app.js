'use strict';

var logout = document.getElementById('log_out_btn')
var dateToday = new Date();
//object for all users
var users = {};
var usersData = [
  ['Bhavya', 'Bharti', 'ta', 'seattle-201d27'],
  ['Brian', 'Nations', 'instructor', 'seattle-201d27'],
  ['Daniel', 'Logerstedt', 'student', 'seattle-201d27'],
  ['Dean', 'Murphy', 'student', 'seattle-201d27'],
  ['Dylan', 'Wilkinson', 'student', 'seattle-201d27'],
  ['Greg', 'Nordeng', 'student', 'seattle-201d27'],
  ['Heath', 'Smith', 'student ta', 'seattle-201d27'],
  ['Hector', 'Norza', 'student ta', 'seattle-201d27'],
  ['Jamie', 'Williams', 'student', 'seattle-201d27'],
  ['Jeremy', 'Pearson', 'student', 'seattle-201d27'],
  ['Jordan', 'VanNess', 'student', 'seattle-201d27'],
  ['Joshua', 'Evans', 'ta', 'seattle-201d27'],
  ['Karen', 'Perez', 'student', 'seattle-201d27'],
  ['Ken', 'Unterseher', 'student', 'seattle-201d27'],
  ['Kevin', 'Miller', 'student', 'seattle-201d27'],
  ['Matt', 'Harding', 'student', 'seattle-201d27'],
  ['Melanie', 'Downing', 'student', 'seattle-201d27'],
  ['Michael', 'Stuart', 'ta', 'seattle-201d27'],
  ['Mitchell', 'Massie', 'student ta', 'seattle-201d27'],
  ['Richard', 'Montgomery', 'student ta', 'seattle-201d27'],
  ['Roger', 'Davenport', 'student ta', 'seattle-201d27'],
  ['Tama', 'Rushin', 'student ta', 'seattle-201d27']
];

var testProblems = [['DavenportR','number1','Mike','seattle-201d27'],['MassieM', 'number2', 'Bhavya','seattle-201d27'],['Van NessJ', 'number 3', 'Josh','seattle-201d27'],['NorzaH', 'number4', 'Mike', 'seattle-201d27'], ['MillerK', 'Number 1', 'Bhavya', 'seattle-201d27'], ['MurphyD', 'number5', 'Josh', 'seattle-201d27'], ['UnterseherK', 'number4', 'Josh','seattle-301d27']];

var coursesData = [{courseName: 'seattle-201d27', courseInstructor: 'Brian Nations'}, {courseName: 'seattle-301d27', courseInstructor: 'Brian Nations'}];
var problemType = ['Code Error', 'Problem Domain', 'Git', 'Styling', 'Other'];

function User(firstName, lastName, userType, course){
  this.userId;
  this.firstName = firstName;
  this.lastName = lastName;
  this.fullName = this.firstName + ' ' + this.lastName;
  this.userType = userType;
  this.userPermissionsOptions = {
    ta: 'admin',
    student: 'student',
    instructor: 'admin',
    supportStaff: 'admin'
  };
  this.userPerms;
  this.currentCourse = course;
  this.profileImageFolderPath = 'images/';
  this.profileImagePath;
  this.imageFormat = '.jpg';
  this.createUserId();
  this.setProfileImagePath();
  this.setPermissions();
}

User.prototype.createUserId = function() {
  this.userId = this.lastName + this.firstName.charAt(0);
};

User.prototype.setProfileImagePath = function(){
  this.profileImagePath = this.profileImageFolderPath + this.firstName.toLowerCase() + '_' + this.lastName.toLowerCase() + this.imageFormat;
};

User.prototype.setPermissions = function() {
  this.userPerms = this.userPermissionsOptions[this.userType];
};

function loadPotd(){
  if (localStorage.potd) {
    console.log('this is working');
    currentPotd.innerHTML = '';
    currentPotd.innerHTML = localStorage.potd;
  }
};

function Course(courseNum, instructor) {
  this.courseNum = courseNum;
  this.instructor = instructor;
  this.availableTA = [];
}

/*****************************************************/
//simple constructor to hold requests and prototypes//
function Queues(){};
Queues.prototype.deleteRequest = function(courseId, requestId){
  //get a reference to the request object using the requestId
  var theRequest = this[courseId][requestId];
  var course_request_array = this[theRequest.requestArray];
  //remove the requestId from the array
  this[theRequest.requestArray] = remove_from_array(requestId, course_request_array);
  //remove the requestId from the pause array if it exists
  if (this[theRequest.pausedRequests].includes(requestId)){
    this[theRequest.pausedRequests] = remove_from_array(requestId, course_request_array);
  }
  //delete request object
  delete this[courseId][requestId];
};

Queues.prototype.togglePauseResume = function(courseId, requestId){
  //get a reference to the request object using the requestId
  var theRequest = this[courseId][requestId];
  // if the request is not in the pause array add it then exit the function
  var course_pause_array = this[theRequest.pausedRequests];
  if (! course_pause_array.includes(requestId)){
    console.log('push to pause');
    this[theRequest.pausedRequests].push(requestId);
    return;
  }
  //if the request is in the pause array, remove it
  this[theRequest.pausedRequests] = remove_from_array(requestId, course_pause_array);
};

Queues.prototype.pause_handler = function(courseId) {
  var course_requests = this[courseId];
  var pausedRequests = this[course_requests.pausedRequests];
  var requestArray = this[course_requests.requestArray];
  //if there are no requests on pause, exit
  if (! pausedRequests) return;
  var temp_course_array = [];
  for (var i = 0; i < requestArray.length; i++){
    if(pausedRequests.includes(requestArray[i])){
      for (var j = i + 1; j < requestArray.length; j++){
        if (!pausedRequests.includes(requestArray[j]) && !temp_course_array.includes(requestArray[j]) ){
          temp_course_array.push(requestArray[j]);
          temp_course_array.push(requestArray[i]);
          break;
        }
      }
    } else if (!temp_course_array.includes(requestArray[i])) {
      temp_course_array.push(requestArray[i]);
    }
  }
  this[course_requests.requestArray] = temp_course_array;
};
/********************************/
/********************************/

function HelpRequest(UserId, requestIssue, requested_ta, course){
  this.UserId = UserId;
  this.course = course;
  this.requestArray = course + '_arr';
  this.pausedRequests = course + '_pause';
  this.requestIssue = requestIssue;
  this.requestedTA = requested_ta;
  this.requestTimeStamp = dateToday.toLocaleTimeString('en-US',{hour: '2-digit', minute: '2-digit'});
  this.newli = '<span class="' + UserId + '">  ' + users[UserId].firstName + ' </span><span class="problemType"> ' + this.requestIssue + ' </span><span class="RequestedTA">  ' + this.requestedTA + '</span><span class="time"> ' + this.requestTimeStamp + '</span>';
  // this.createRequestTimeStamp();
  this.add_to_queue();
}

HelpRequest.prototype.add_to_queue = function(){
  if (!the_queues[this.course]) the_queues[this.course] = {};
  the_queues[this.course][this.UserId] = this;
  //add the pause and request array keys to the object for reference
  the_queues[this.course]['requestArray'] = this.requestArray;
  the_queues[this.course]['pausedRequests'] = this.pausedRequests;
  if (!the_queues[this.requestArray]) the_queues[this.requestArray] = [];
  the_queues[this.requestArray].push(this.UserId);
  if (!the_queues[this.pausedRequests]) the_queues[this.pausedRequests] = [];
};

HelpRequest.prototype.togglePauseResume = function(){
  // if the request is not in the pause array add it then exit the function
  var course_pause_array = the_queues[this.pausedRequests];
  if (! course_pause_array.includes(this.UserId)){
    console.log('push to pause');
    the_queues[this.pausedRequests].push(this.UserId);
    return;
  }
  //if the request is in the pause array, remove it
  the_queues[this.pausedRequests] = remove_from_array(this.UserId, course_pause_array);
};

function remove_from_array(arrayItem, check_array){
  var temp_array = [];
  if(!check_array) return temp_array;
  for (var i = 0; i < check_array.length; i++){
    if(check_array[i] != arrayItem) temp_array.push(check_array[i]);
  }
  return temp_array;
}

function build_users_object(){
  var the_user;
  for (var i = 0; i < usersData.length; i++){
    the_user = create_user_from_data.apply(this, usersData[i]);
    users[the_user.userId] = the_user;
  }
}
//this function creates a new User
function create_user_from_data(firstName, lastName, userType, course){
  return new User(firstName, lastName, userType, course);
}

build_users_object();

var the_queues = new Queues();
// this is just for testing, the HelpRequest needs to be called once the student clicks add to //queue button
for (var i = 0; i < testProblems.length; i++) {
  new HelpRequest(testProblems[i][0],testProblems[i][1],testProblems[i][2],testProblems[i][3]);
};

console.log('the_queues: ', the_queues);

function signout(event) {
  sessionStorage.clear();
  window.location = './index.html'
}


localStorage.the_queues = JSON.stringify(the_queues);
logout.addEventListener('click', signout);
// var myCourse = 'seattled27';
// the_queues[myCourse].kevin_miller_d27
