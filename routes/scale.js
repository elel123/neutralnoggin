/*
 * GET SCALE PAGE	
 */
// Get articles data
var data = require("../data.json");


exports.view = function(request, response){
	// console.log(data);
	var requestTilt = request.query.ut;
	data['userTilt'] = parseInt(requestTilt);
	response.render('scale', data);
};


exports.viewStart = function(request, response){
	// console.log(data);
	response.render('scale', data);
};