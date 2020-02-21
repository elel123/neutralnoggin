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

	updateTaskbar(tiltCounter);

} 


function updateTaskbar(tilt) {
	//update the hrefs to reflect correct tilt
	$("#taskButton1").attr('href', 'home?ut=' + tilt);
	$("#taskButton2").attr('href', 'search?ut=' + tilt);
	$("#taskButton3").attr('href', 'saved?' + tilt);
	$("#taskButton4").attr('href', 'more?' + tilt);
	$("#scaleButton").attr('href', 'scale?' + tilt);
	$("#scaleButtonFromMore").attr('href', 'scale?' + tilt);
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