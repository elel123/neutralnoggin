/*
 * GET home page.
 */

// Get articles data
var data = require("../data.json");

exports.view = function(request, response){
	// console.log(data);
	var requestTilt = request.query.ut;
	data['userTilt'] = parseInt(requestTilt);

	//Check which profile to update
	var i;
	var profilesArr = data["profiles"];
	for (i = 0; i < profilesArr.length; i++) {
		if (profilesArr[i]["loggedIn"]) {
			profilesArr[i]["tilt"] = parseInt(requestTilt);
		}
	}


	response.render('index', data);
};

exports.viewStart = function(request, response){
	
	var i;
	var profilesArr = data["profiles"];
	for (i = 0; i < profilesArr.length; i++) {
		//reset everyone's login back to false
		profilesArr[i]["loggedIn"] = false;
	}
	data['userTilt'] = 0;
	data["loggedInProfile"] = "no one. Login?";
	response.render('index', data);

};

exports.viewOut = function(request, response){
	
	var requestTilt = request.query.ut;

	//Check which profile to update
	var i;
	var profilesArr = data["profiles"];
	for (i = 0; i < profilesArr.length; i++) {
		if (profilesArr[i]["loggedIn"]) {
			profilesArr[i]["tilt"] = parseInt(requestTilt);
		}
	}

	var profilesArr = data["profiles"];
	for (i = 0; i < profilesArr.length; i++) {
		//reset everyone's login back to false
		profilesArr[i]["loggedIn"] = false;
	}
	data['userTilt'] = 0;
	data["loggedInProfile"] = "no one. Login?";
	response.render('index', data);

};