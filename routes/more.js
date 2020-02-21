/*
 * GET MORE PAGE	
 */

// Get articles data
var data = require("../data.json");

exports.view = function(request, response){
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

 	response.render('more', data);
};



exports.login = function(request, response){
	var username = request.query.username;
	var password = request.query.password;

	var i;
	var profilesArr = data["profiles"];
	var requestTilt = 0;
	var profileExists = false;
	for (i = 0; i < profilesArr.length; i++) {

		if (profilesArr[i]["name"] == username && 
			profilesArr[i]["password"] == password) {

			requestTilt = profilesArr[i]["tilt"];
			profilesArr[i]["loggedIn"] = true;
			data["loggedInProfile"] = username;
			profileExists = true;
		}
	}

	if (profileExists == false) {
		var newProfile = {				
			"name": username,
			"password": password,
			"loggedIn": true,
			"tilt": 0, 
			"saved" : []
		}
		profilesArr.push(newProfile);
		data["loggedInProfile"] = "Newly Logger";
	}

	data['userTilt'] = requestTilt; 
 	response.render('more', data);
}