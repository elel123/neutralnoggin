/*
 * GET SCALE PAGE	
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
	
	response.render('scale', data);
};


exports.viewStart = function(request, response){
	// console.log(data);
	response.render('scale', data);
};