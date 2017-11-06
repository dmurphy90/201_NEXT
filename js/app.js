'use strict';

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
  ['Jordan', 'Van Ness', 'student', 'seattle-201d27'],
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
var testProblems = [['DavenportR_d27','number1','Mike','seattle-201d27'],['MassieM-d27', 'number2', 'Bhavya','seattle-201d27'],['VanNessJ_d27', 'number 3', 'Josh','seattle-201d27'],['NorzaH_d27', 'number4', 'Mike', 'seattle-201d27'], ['MurphyD_d27', 'number5', 'Josh', 'seattle-201d27']];

var courses = ['seattle-201d27'];
var problemType = ['Code Error', 'Problem Domain', 'Git', 'Styling', 'Other'];

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

function Course(courseNum, instructor) {
  this.courseNum = courseNum;
  this.instructor = instructor;
  this.availableTA = [];
}

function Queues(){};

function HelpRequest(UserId, requestIssue, requested_ta, course){
  this.UserId = UserId;
  this.course = course;
  this.requestIssue = requestIssue;
  this.requestedTA = requested_ta;
  this.requestTimeStamp;
  // this.createRequestTimeStamp();
  this.add_to_queue();
}

HelpRequest.prototype.createRequestTimeStamp = function() {
  this.requestTimeStamp = dateToday.toDateString() + ' ' + dateToday.toLocaleTimeString();
};

HelpRequest.prototype.add_to_queue = function(){
  if (!the_queues[this.course]) the_queues[this.course] = {};
  the_queues[this.course][this.UserId] = this;
  if (!the_queues[this.course + '_arr']) the_queues[this.course + '_arr'] = [];
  the_queues[this.course + '_arr'].push(this.UserId);
};


function build_users_object(){
  var the_user;
  for (var i = 0; i < usersData.length; i++){
    the_user = create_user_from_data.apply(this, usersData[i]);
    users[the_user.userId] = the_user;
  }
  console.log('users', users);
}
//this function creates a new User
function create_user_from_data(firstName, lastName, userType, course){
  return new User(firstName, lastName, userType, course);
}


function build_test_data() {
  var the_queues = new Queues();
  for (var i = 0; i < testProblems.length; i++) {
    new HelpRequest(testProblems[i][0],testProblems[i][1],testProblems[i][2],testProblems[i][3]);
  };
  console.log('the_queues: ', the_queues);
}

build_users_object();
// var myCourse = 'seattled27';
// the_queues[myCourse].kevin_miller_d27
