/*
 * GET home page.
 */

// Get articles data
var data = require("../data.json");

exports.view = function(request, response){
	// console.log(data);
	var requestTilt = request.query.ut;
	var requestUser = request.query.user;

	//Check which profile to update
	var i;
	var profilesArr = data["profiles"];
	for (i = 0; i < profilesArr.length; i++) {
		if (profilesArr[i]["name"] == requestUser) {
			profilesArr[i]["tilt"] = parseInt(requestTilt);
		}
	}

	//Make data copy so multiple people can log in w/o conflicting data
	var renderDataCopy = JSON.parse(JSON.stringify(data));

	renderDataCopy['userTilt'] = parseInt(requestTilt);

	if (requestUser == "not-logged-in") {
		renderDataCopy["loggedInProfile"] = "no one. Login?";
	} else {
		renderDataCopy["loggedInProfile"] = requestUser;
	}

	response.render('index', renderDataCopy);
};

exports.viewStart = function(request, response){
	response.render('index', data);
};

// Log out screen
exports.viewOut = function(request, response){
	
	var requestTilt = request.query.ut;
	var requestUser = request.query.user;

	//No need to update tilt since going to the more pasge already did that.

	var renderDataCopy = JSON.parse(JSON.stringify(data));

	renderDataCopy['userTilt'] = 0;
	renderDataCopy["loggedInProfile"] = "no one. Login?";
	response.render('index', renderDataCopy);

};


exports.getData = function(request, response) {
	response.send(data);
}