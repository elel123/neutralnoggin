'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	
})


var tiltCounter = 0;
var currentUser = "not-logged-in";

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript connected!");
	tiltCounter = $(".tilt").attr('id');
	console.log("extracted tilt: " + tiltCounter);

	tiltCounter = parseInt(tiltCounter);

	//Attempt to extract the user name
	var username = $(".userlogin").attr('id');

	if (username == "no one. Login?") {
		username = "not-logged-in";
	}

	console.log("hello " + username);
	currentUser = username;

	updateTaskbar(tiltCounter);


	// register a click listener 
	$('.container.link').click(function() {
		var id = $(this).attr('id');
		//console.log(this);
		tiltCalculator(id);
	});


	loginHandler();
	logoutHandler();
	registerHandler();

}

function logoutHandler() {

	//Track log in/out status for more page
	var logMsg = $('.logMsg').attr('id');
	if (logMsg == "no one. Login?") {
		$('.logoutButton').hide();
	}

	$(".logoutButton").click(function(e) {
		currentUser = "not-logged-in";
		tiltCounter = 0;
		window.location.href = "homeLogout?ut=" + tiltCounter + "&user=" + currentUser;
	});

}

function loginHandler() {

	//Track log in/out status for more page
	var logMsg = $('.logMsg').attr('id');
	if (logMsg != "no one. Login?") {
		$('#loginButton').hide();
	}

	//If form was submitted
	$('#login').submit(function(e) {

		//Prevents default submit + reload (we only want submit part)
	  	e.preventDefault();
	  	console.log("logging in...");


		//Extracts the JSON file
		$.get('getData', function(data) {

	  		var username = $('#username').val();
	  		var password = $('#password').val();

			//Attempt to find the account
			var profilesArr = data["profiles"];
			var profileExists = false;

			console.log(profilesArr);

			var i;
			for (i = 0; i < profilesArr.length; i++) {

				var userkey = profilesArr[i]["name"];
				var passkey = profilesArr[i]["password"];

				console.log(username);
				console.log(password);

				//Check if credentials are equal
				if (username.length == userkey.length && password.length == passkey.length) {
					console.log("Length is the same");
					var nI;
					var isEqual = true; 
					for (nI = 0; nI < username.length; nI++) {
						if (username.charAt(nI) != userkey.charAt(nI)) {
							isEqual = false;
						}
					}
					for (nI = 0; nI < password.length; nI++) {
						if (password.charAt(nI) != passkey.charAt(nI)) {
							isEqual = false;
						}
					}


					if (isEqual == true) {
						tiltCounter = profilesArr[i]["tilt"];
						currentUser = profilesArr[i]["name"];
						profilesArr[i]["loggedIn"] = true;
						data["loggedInProfile"] = username;
						profileExists = true;

						$('.login-buttons').append("<p>Logging you in!</p>");
						$.post("morelogin", {name: username}, function(result){
							console.log("successfully logged in!");
						});
						
						//Redirect user to more page
						updateTaskbar(tiltCounter);
						window.location.href = "more?ut=" + tiltCounter + "&user=" + currentUser;
					}

				}
			}

			if (profileExists == false) {
				alert("The username or password is incorrect. Don't have an account? Create one today.");
			  	var username = $('#username').val('');
	  			var password = $('#password').val('');
			}

		});


	  	//$.get('moreLogin', {rsvpEmail: rsvpEmail}, postCallback);

	});

	function postCallback(res) {
	  	alert("RSVP form successfully submitted!");
	  	$('#rsvpEmail').val('');
	    //console.log(res);
	}
}

function registerHandler() {

	//If form was submitted
	$('#register').submit(function(e) {

		//Prevents default submit + reload (we only want submit part)
	  	e.preventDefault();
	  	console.log("registering...");


		//Extracts the JSON file
		$.get('getData', function(data) {

	  		var username = $('#username').val();
	  		var password = $('#password').val();

			
			var profilesArr = data["profiles"];
			var isSuccessful = true;

			//Attempt to find if the username already exists
			var i;
			for (i = 0; i < profilesArr.length; i++) {

				var userkey = profilesArr[i]["name"];

				//Check if credentials are equal
				if (username.length == userkey.length) {
					var nI;
					var isEqual = true; 
					for (nI = 0; nI < username.length; nI++) {
						if (username.charAt(nI) != userkey.charAt(nI)) {
							isEqual = false;
						}
					}

					if (isEqual == true) {
						//Username already exists
						alert("Error: Username is already taken");
						isSuccessful = false;
					}
				}
			}

			if (password.length < 4) {
				alert("Error: Password must be longer than 4 characters");
				isSuccessful = false;
			}


			if (isSuccessful) {
				tiltCounter = 0;
				currentUser = username;				
				data["loggedInProfile"] = username;

				$('.login-buttons').append("<p>Registering...!</p>");
				$.post("moreRegister", {name: username, pass: password}, function(result){
					console.log("successfully Registered and Logged In!");
				});
				
				//Redirect user to more page
				updateTaskbar(tiltCounter);
				window.location.href = "more?ut=" + tiltCounter + "&user=" + currentUser;
			}

		});

	});		
}

function tiltCalculator(tilt) {
	console.log("Tilt is " + tilt);
	tiltCounter = tiltCounter + parseInt(tilt);
	console.log("Tilt Counter is at: " + tiltCounter);

	updateTaskbar(tiltCounter);

} 


function updateTaskbar(tilt) {
	//update the hrefs to reflect correct tilt
	$("#taskButtonH").attr('href', 'home?ut=' + tilt + "&user=" + currentUser);
	$("#taskButtonS").attr('href', 'saved?ut=' + tilt + "&user=" + currentUser);
	$("#taskButtonM").attr('href', 'more?ut=' + tilt + "&user=" + currentUser);
	$("#loginButton").attr('href', 'login?ut=' + tilt + "&user=" + currentUser);
	$("#scaleButton").attr('href', 'scale?ut=' + tilt + "&user=" + currentUser);
	$("#cancelButton").attr('href', 'more?ut=' + tilt + "&user=" + currentUser);
	$("#registerButton").attr('href', 'register?ut=' + tilt + "&user=" + currentUser);
	$("#scaleButtonFromMore").attr('href', 'scale?ut=' + tilt + "&user=" + currentUser);
}



function getScaleImage() {
	tiltCounter = $(".tilt").attr('id');
	tiltCounter = parseInt(tiltCounter);
	console.log("extracted tilt for scale: " + tiltCounter);


	if (tiltCounter == 0 || (tiltCounter > -0.5 && tiltCounter < 0.5)) {
		// neutral
		return "<img src=\"scale_imgs/balanced-scale.PNG\" class=\"img-responsive scale\">";

	} else if (tiltCounter <= -0.5 && tiltCounter >= -2) {
		// medium left
		return "<img src=\"scale_imgs/med-left-scale.PNG\" class=\"img-responsive scale\">";

	} else if (tiltCounter >= 0.5 && tiltCounter <= 2) {
		// medium right
		return "<img src=\"scale_imgs/med-right-scale.PNG\" class=\"img-responsive scale\">";

	} else if (tiltCounter < -2) {
		// heavy left
		return "<img src=\"scale_imgs/heavy-left-scale.PNG\" class=\"img-responsive scale\">";

	} else if (tiltCounter > 2) {
		// heavy left
		return "<img src=\"scale_imgs/heavy-right-scale.PNG\" class=\"img-responsive scale\">";
	}

}