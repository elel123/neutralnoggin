$(document).ready(function() {
	initializePage();
	
})


var tiltCounterB = 0;
var currentUserB = "not-logged-in";

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Banner script connected!");
	tiltCounterB = $(".tilt").attr('id');
	console.log("extracted tilt for banner: " + tiltCounterB);

	tiltCounterB = parseInt(tiltCounter);

	//Attempt to extract the user name
	var username = $(".userlogin").attr('id');
	if (username == "no one. Login?") {
		username = "not-logged-in";
	}
	currentUserB = username;

	// register a click listener 
	$('.container.link').click(function() {
		var id = $(this).attr('id');
		tiltCounterB = tiltCounterB + parseInt(id);
		console.log("banner tilt: " + tiltCounterB);
	});

	

	$("#bannerButton").attr('href', 'scale?ut=' + tiltCounterB + "&user=" + currentUserB);


}