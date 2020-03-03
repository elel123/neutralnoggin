$(document).ready(function() {
	initializePage();
	
})


var tiltCounterB = 0;
var currentUserB = "not-logged-in";
var versionB = "A";

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Banner script connected!");
	tiltCounterB = $(".tilt").attr('id');
	console.log("extracted tilt for banner: " + tiltCounterB);

	tiltCounterB = parseInt(tiltCounterB);

	//Attempt to extract the user name
	var username = $(".userlogin").attr('id');
	if (username == "no one. Login?") {
		username = "not-logged-in";
	}
	currentUserB = username;

	//Attempt to extract the version
	versionB = $(".version").attr('id');

	// register a click listener 
	$('.container.link').click(function() {
		var id = $(this).attr('id');
		tiltCounterB = tiltCounterB + parseInt(id);
		console.log("banner tilt: " + tiltCounterB);
		$("#bannerButton").attr('href', 'scale?ut=' + tiltCounterB + "&user=" + currentUserB + "&v=" + versionB);
		
	});

	$("#bannerButton").attr('href', 'scale?ut=' + tiltCounterB + "&user=" + currentUserB + "&v=" + versionB);


}