'use strict';

var dateToday = new Date();
var time_stamp = 0;
//object for all users
var users = {};
//object for queue requests
var queueRequests = {};

//sample Data
var current_201_options = {currentCourse: '201', courseFocus: '', courseInstructor: 'Brian Nations'};
var usersData = [ ['Cosmo', 'Spacely', 'student', {currentCourse: '401', courseFocus: 'javascript', courseInstructor: 'Elroy Jetson'}], ['Kevin', 'Miller', 'student', current_201_options], ['Michael', 'Stuart', 'ta', {}]];

//function User(firstName, lastName, userType, currentCourse, courseFocus){
function User(firstName, lastName, userType, course){
  this.userId;
  this.firstName = firstName;
  this.lastName = lastName;
  this.fullName = this.firstName + ' ' + this.lastName;
  this.userType = userType;
  this.userPermissionsOptions = {
    ta: 'admin',
    student: 'basic',
    instructor: 'admin',
    supportStaff: 'basic'
  };
  this.userPerms;
  this.currentCourse = course;
  this.profileImageFolderPath = 'images/';
  this.profileImagePath;
  this.imageFormat = '.jpg';
  this.createUserId();
  this.setProfileImagePath();
  this.setPermissions();
  this.setStudentOptions();
}

User.prototype.createUserId = function() {
  this.userId = this.lastName + this.firstName.charAt(0) + this.currentCourse;
};

User.prototype.setProfileImagePath = function(){
  this.profileImagePath = this.profileImageFolderPath + this.firstName.toLowerCase() + '_' + this.lastName.toLowerCase() + this.imageFormat;
};

User.prototype.setPermissions = function() {
  this.userPerms = this.userPermissionsOptions[this.userType];
};





//build the users object from sample data
function build_users_object(){
  var the_user;
  for (var i = 0; i < usersData.length; i++){
    the_user = create_user_from_data.apply(this, usersData[i]);
    console.log('the_user: ', the_user);
    console.log('the_user_string: ', JSON.stringify(the_user));
    users[the_user.userId] = the_user;
    //create array of user ids per userType
    if(!users[the_user.userType]){
      users[the_user.userType] = [];
    }
    users[the_user.userType].push(the_user.userId);
  }
  console.log('users', users);
  console.log('users_string', JSON.stringify(users));
}

//this function creates a new User
function create_user_from_data(firstName, lastName, userType, studentOptions){
  return new User(firstName, lastName, userType, studentOptions);
}

function Course(courseNum, instructor){
  this.courseNum = courseNum;
  this.instructor = instructor;
  this.availableTA = [];
}


function buildTestRequests(){
  var testRequestIssues = ['this is broken', 'I have a gituation'];
  var thisUser;
  var the_request;
  for (var i = 0; i < users.student.length; i++){
    thisUser = users[users.student[i]];
    the_request = new HelpRequest(thisUser.userId, testRequestIssues[i], users.ta[0]);
    console.log('the_request', the_request);
    console.log('the_request_string: ', JSON.stringify(the_request));
    queueRequests[the_request.requestId] = the_request;
  }

  console.log('queueRequests: ', queueRequests);
  console.log('queueRequests_string: ', JSON.stringify(queueRequests));
}


function HelpRequest(requesterUserId, requestIssue, requested_ta){
  this.requestId;
  this.requestTimeStamp;
  this.requesterUserId = requesterUserId;
  this.requestIssue = requestIssue;
  this.requested_ta = requested_ta;
  this.createRequestId();
  this.createRequestTimeStamp();
}

HelpRequest.prototype.createRequestId = function() {
  this.requestId = 'helpReq_' + uniqueId();
};

HelpRequest.prototype.createRequestTimeStamp = function() {
  this.requestTimeStamp = dateToday.toDateString() + ' ' + dateToday.toLocaleTimeString();
};

function uniqueId(){
  var month = dateToday.getMonth();
  var day = dateToday.getDate();
  var year = dateToday.getFullYear();
  var todayString = year.toString() + month.toString() + day.toString();
  //this get the time in millisecs starting at midnight
  var todayStart = new Date(year, month, day).getTime();
  //this gets the current time in millesecs
  var now = Date.now();
  //get the time of day in seconds, use this as a base number
  var secondsToday = Math.floor((now - todayStart) / 1000);
  //processing in a loop happens in milleseconds, add 1 to secondsToday to keep it unique
  if (secondsToday <= time_stamp){
    secondsToday = time_stamp + 1;
  }
  time_stamp = secondsToday;
  var time_date_stamp = todayString + time_stamp.toString();
  //base64 the string so it cannot be confused with an index number
  var uniqueId = btoa(time_date_stamp);
  return uniqueId;
}


build_users_object();
buildTestRequests();
//
//console.log('uniqueid:', uniqueId('user'));
