'use strict';



function createList(course) {
  var queueDisplay = document.getElementById('queue');
  for (var a = 0; a < the_queues[course + '_arr'].length; a++) {
    var newLi = document.createElement('li');
    var userid = the_queues[course + '_arr'][a];
    newLi.innerHTML = the_queues[course][userid].newli;
    queueDisplay.appendChild(newLi);
    newLi.setAttribute('userid',userid);
    console.log('newLi', newLi);
  }
}
createList('seattle-201d27');
