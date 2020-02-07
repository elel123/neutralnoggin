/*
 * GET SEARCH PAGE	
 */

// Get articles data
var data = require("../data.json");

exports.view = function(request, response){
	// console.log(data);
	response.render('search.handlebars', data);
};