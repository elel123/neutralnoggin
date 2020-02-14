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
	tiltCounter = parseInt($(".tilt").attr('id'));


	// register a click listener 
	$('.container.link').click(function() {
		var id = $(this).attr('id');
		//console.log(this);
		tiltCalculator(id);
	});
}

function tiltCalculator(tilt) {
	console.log("Tilt is " + tilt);
	tiltCounter = tiltCounter + parseInt(tilt);
	console.log("Tilt Counter is at: " + tiltCounter);

	$(".tilt").attr('id', tiltCounter);
	var assignedTilt = $(".tilt").attr('id');

	console.log("html tilt: " + assignedTilt);

	
} 