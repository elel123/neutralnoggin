/*
 * GET SAVED PAGE	
 */

// Get articles data
var data = require("../data.json");

exports.view = function(request, response){
	var requestTilt = request.query.ut;
	var requestUser = request.query.user;
	var requestVer = request.query.v;

	//Make data copy so multiple people can log in w/o conflicting data
	var renderDataCopy = JSON.parse(JSON.stringify(data));

	//Check which profile to update
	var i;
	var profilesArr = data["profiles"];
	for (i = 0; i < profilesArr.length; i++) {
		if (profilesArr[i]["name"] == requestUser) {
			profilesArr[i]["tilt"] = parseInt(requestTilt);
			renderDataCopy["userSaved"] = profilesArr[i]["saved"];
		}
	}



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

	response.render('saved', renderDataCopy);
};

exports.saveArticle = function(request, response) {
	var articleURL = request.body.url;
	var username = request.body.user;

	var articleJSON = {};

	//Find the article
	var i;
	var articlesArr = data["articles"];
	for (i = 0; i < articlesArr.length; i++) {
		if (articlesArr[i]["URL"] == articleURL) {
			articleJSON = articlesArr[i];
		}
	}

	//Find the user account
	var profilesArr = data["profiles"];
	for (i = 0; i < profilesArr.length; i++) {
		if (profilesArr[i]["name"] == username) {

			//Save the article to the user's account
			if (profilesArr[i]["saved"].indexOf(articleJSON) == -1) {
				profilesArr[i]["saved"].push(articleJSON);
			}
		}
	}

	response.send("Saved!");
	
};

exports.deleteArticle = function(request, response) {
	var articleURL = request.body.url;
	var username = request.body.user;

	var articleJSON = {};

	//Find the article
	var i;
	var articlesArr = data["articles"];
	for (i = 0; i < articlesArr.length; i++) {
		if (articlesArr[i]["URL"] == articleURL) {
			articleJSON = articlesArr[i];
		}
	}

	//Find the user account
	var profilesArr = data["profiles"];
	for (i = 0; i < profilesArr.length; i++) {
		if (profilesArr[i]["name"] == username) {

			//Delete the article from the user's account
			(profilesArr[i]["saved"]).splice((profilesArr[i]["saved"]).indexOf(articleJSON), 1);
			data["profiles"][i]["saved"] = profilesArr[i]["saved"];
		}
	}

	response.send("Deleted!");
	
};