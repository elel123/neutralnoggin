'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	
})


var tiltCounter = 0;

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript connected!");
	tiltCounter = $(".tilt").attr('id');
	console.log("extracted tilt: " + tiltCounter);

	tiltCounter = parseInt(tiltCounter);

	updateTaskbar(tiltCounter);


	//Attempt to extract the user name
	var username = $(".userlogin").attr('id');
	console.log("hello " + username);


	// register a click listener 
	$('.container.link').click(function() {
		var id = $(this).attr('id');
		//console.log(this);
		tiltCalculator(id);
	});

	//Track log in/out status for more page
	var logMsg = $('.logMsg').attr('id');
	if (logMsg == "no one. Login?") {
		$('.logoutButton').hide();
	}

	//Checking if Done button is clicked in login screen
	$('#done-button').click(function(e) {
		$('.login-buttons').append("<p>Logging you in!</p>")
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
	$("#taskButtonH").attr('href', 'home?ut=' + tilt);
	$("#taskButtonS").attr('href', 'saved?ut=' + tilt);
	$("#taskButtonM").attr('href', 'more?ut=' + tilt);
	$("#loginButton").attr('href', 'login?ut=' + tilt);
	$("#scaleButton").attr('href', 'scale?ut=' + tilt);
	$("#cancelButton").attr('href', 'more?ut=' + tilt);
	$("#logoutButton").attr('href', 'homeLogout?ut=' + tilt);
	
}