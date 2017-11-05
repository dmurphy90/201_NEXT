## Possible Data Structures

### Single User Structure

  User{
  	"userId":"user_MjAxNzEwNDY2MzI0",
  	"firstName":"Cosmo",
  	"lastName":"Spacely",
  	"fullName":"Cosmo Spacely",
  	"userType":"student",
  	"currentCourse":"401",
  	"courseFocus":"javascript",
  	"courseInstructor":"Elroy Jetson"
  	"studentOptions":{"currentCourse":"401","courseFocus":"javascript","courseInstructor":"Elroy Jetson"},
  	"userPermissionsOptions":{"ta":"admin","student":"basic","intructor":"admin","supportStaff":"basic"},
  	"userPerms":"basic",
  	"profileImageFolderPath":"images/",
  	"imageFormat":".jpg",
  	"profileImagePath":"images/cosmo_spacely.jpg",
  }

### All Users Structure
  users{
  	"user_MjAxNzEwNDY2MzI0":{
  		"firstName":"Cosmo",
  		"lastName":"Spacely",
  		"fullName":"Cosmo Spacely",
  		"userType":"student",
  		"studentOptions":{"currentCourse":"401", "courseFocus":"javascript", "courseInstructor":"Elroy Jetson"},
  		"userPermissionsOptions":{"ta":"admin", "student":"basic", "instructor":"admin",,"supportStaff":"basic"}
  		"courseFocus":"javascript",
  		"profileImageFolderPath":"images/",
  		"imageFormat":".jpg",
  		"userId":"user_MjAxNzEwNDY2MzI0",
  		"profileImagePath":"images/cosmo_spacely.jpg",
  		"userPerms":"basic",
  		"currentCourse":"401",
  		"courseInstructor":"Elroy Jetson"
  	},

  	"user_MjAxNzEwNDY2MzI1":{
  		"firstName":"Kevin",
  		"lastName":"Miller",
  		"fullName":"Kevin Miller",
  		"userType":"student",
  		"studentOptions":{"currentCourse":"201", "courseFocus":"", "courseInstructor":"Brian Nations"}
  		"userPermissionsOptions":{"ta":"admin", "student":"basic", "intructor":"admin", "supportStaff":"basic"}
  		"courseFocus":""
  		"profileImageFolderPath":"images/"
  		"imageFormat":".jpg"
  		"userId":"user_MjAxNzEwNDY2MzI1"
  		"profileImagePath":"images/kevin_miller.jpg"
  		"userPerms":"basic"
  		"currentCourse":"201"
  		"courseInstructor":"Brian Nations"
  	}

  	"user_MjAxNzEwNDY2MzI2":{
  		"firstName":"Michael",
  		"lastName":"Stuart",
  		"fullName":"Michael Stuart",
  		"userType":"ta",
  		"studentOptions":{},
  		"userPermissionsOptions":{"ta":"admin", "student":"basic", "intructor":"admin", "supportStaff":"basic"}
  		"profileImageFolderPath":"images/",
  		"imageFormat":".jpg",
  		"userId":"user_MjAxNzEwNDY2MzI2",
  		"profileImagePath":"images/michael_stuart.jpg",
  		"userPerms":"admin"
  	},
  	"student":["user_MjAxNzEwNDY2MzI0", "user_MjAxNzEwNDY2MzI1"],
  	"ta":["user_MjAxNzEwNDY2MzI2"]
  }

### Single Request Structure

  request{
  	"requesterUserId":"user_MjAxNzEwNDY2MzI0",
  	"requestIssue":"this is broken",
  	"requested_ta":"user_MjAxNzEwNDY2MzI2",
  	"requestId":"helpReq_MjAxNzEwNDY2MzI3",
  	"requestTimeStamp":"Sat Nov 04 2017 6:25:24 PM"
  }

### All Requests Structures

  requests{
  	"helpReq_MjAxNzEwNDY2MzI3":{
  		"requesterUserId":"user_MjAxNzEwNDY2MzI0",
  		"requestIssue":"this is broken",
  		"requested_ta":"user_MjAxNzEwNDY2MzI2",
  		"requestId":"helpReq_MjAxNzEwNDY2MzI3",
  		"requestTimeStamp":"Sat Nov 04 2017 6:25:24 PM"
  	},
  	"helpReq_MjAxNzEwNDY2MzI4":{
  		"requesterUserId":"user_MjAxNzEwNDY2MzI1",
  		"requestIssue":"I have a gituation",
  		"requested_ta":"user_MjAxNzEwNDY2MzI2",
  		"requestId":"helpReq_MjAxNzEwNDY2MzI4",
  		"requestTimeStamp":"Sat Nov 04 2017 6:25:24 PM"
  	}
  }
