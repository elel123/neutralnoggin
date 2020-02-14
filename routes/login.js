/*
 * GET LOGIN PAGE
 */


exports.view = function(request, response){
	// console.log(data);
	response.render('login.handlebars');
};