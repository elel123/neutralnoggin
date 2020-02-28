/*
 * GET SEARCH PAGE	
 */

// Get articles data
var data = require("../data.json");

exports.view = function(request, response){
	var requestTilt = request.query.ut;
	data['userTilt'] = parseInt(requestTilt);
	response.render('search', data);
};