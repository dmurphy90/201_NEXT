'use strict';

function Queues(){};

Queues.prototype.deleteRequest = function(courseId, requestId){
  //get the values of the request array
  var course_request_array = this.getRequestArray(courseId);
  //remove the requestId from the array
  this.setRequestArray(courseId, remove_from_array(requestId, course_request_array));
  var course_pause_array = this.getPausedArray(courseId);
  //remove the requestId from the pause array if it exists
  if (course_pause_array.includes(requestId)){
    this.setPausedArray(courseId, remove_from_array(requestId, course_pause_array));
  }
  //delete request object
  delete this[courseId][requestId];
};

Queues.prototype.togglePauseResume = function(courseId, requestId){
  //togle highlight for li
  var thisRequestItem = document.getElementById(requestId);
  thisRequestItem.classList.toggle('pause');
  //get a reference to the request object using the requestId
  var theRequest = this[courseId][requestId];
  // if the request is not in the pause array add it then exit the function
  var course_pause_array = this.getPausedArray(courseId);
  if (! course_pause_array.includes(requestId)){
    console.log('push to pause');
    this[theRequest.pausedRequests].push(requestId);
    return;
  }
  //if the request is in the pause array, remove it
  this.setPausedArray(courseId, remove_from_array(requestId, course_pause_array));
};

Queues.prototype.pause_handler = function(courseId) {
  console.log('pause_handler');
  var pausedRequests = this.getPausedArray(courseId);
  var requestArray = this.getRequestArray(courseId);
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
  this.setRequestArray(courseId, temp_course_array);
};

Queues.prototype.getRequestArray = function(courseId){
  return this[this[courseId].requestArray];
};
Queues.prototype.setRequestArray = function(courseId, values_array){
  this[this[courseId].requestArray] = values_array;
};
Queues.prototype.getPausedArray = function(courseId){
  return this[this[courseId].pausedRequests];
};
Queues.prototype.setPausedArray = function(courseId, values_array){
  this[this[courseId].pausedRequests] = values_array;
};
