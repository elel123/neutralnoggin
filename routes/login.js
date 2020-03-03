/*
 * GET LOGIN PAGE
 */

var data = require("../data.json");

exports.view = function(request, response){

	var requestTilt = request.query.ut;
	var requestUser = request.query.user;
	var requestVer = request.query.v;

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

	if (requestVer == "A") {
		renderDataCopy['altView'] = false;
	} else {
		renderDataCopy['altView'] = true;
	}

	if (requestUser == "not-logged-in") {
		renderDataCopy["loggedInProfile"] = "no one. Login?";
	} else {
		renderDataCopy["loggedInProfile"] = requestUser;
	}

	response.render('login.handlebars', renderDataCopy);
};