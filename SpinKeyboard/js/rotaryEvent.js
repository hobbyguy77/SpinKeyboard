/*global tau */
(function(){
	/**
	 * page - Rotary event page element
	 * progressBar - Circle progress element
	 * progressBarWidget - TAU circle progress instance
	 * rotaryDetentHandler - rotarydetent event handler
	 */
	var page = document.getElementById( "pageRotaryEvent" ),
		progressBar,
		progressBarWidget,
		rotaryDetentHandler,
		currentDirection, 
		command, 
		counter = 0;

	/**
	 * pagebeforeshow event handler
	 * Do preparatory works and adds event listeners
	 */
	page.addEventListener("pagebeforeshow", function() {
		var resultDiv = document.getElementById("result"),
			direction,
			steps;

		progressBar = document.getElementById("circleprogress");
		progressBarWidget = new tau.widget.CircleProgressBar(progressBar, {size: "large"});
		//resultDiv.innerText = progressBarWidget.value() + "%";
		
		// "rotarydetent" event handler
		rotaryDetentHandler = function(e) {
			// Get rotary direction
			direction = e.detail.direction;
			
			if (direction === "CW") {
				// Right direction

				if(currentDirection === undefined)
					currentDirection="CW";
				if(currentDirection != "CW"){
					command = command + "-" + counter
					counter=0;
					currentDirection = "CW";
				}
				counter++;
			} else if (direction === "CCW") {

				if(currentDirection === undefined)
					currentDirection="CCW";
				if(currentDirection != "CCW"){
					command = command + "+" + counter;
					counter=0;
					currentDirection = "CCW";
				}
				counter++;
			}

			resultDiv.innerText = command;
			progressBarWidget.value(counter);
		};

		// Add rotarydetent handler to document
		document.addEventListener("rotarydetent", rotaryDetentHandler);
	});

	/**
	 * pagehide event handler
	 * Destroys and removes event listeners
	 */
	page.addEventListener("pagehide", function() {
		progressBarWidget.destroy();
		document.removeEventListener("rotarydetent", rotaryDetentHandler);
	});
	
	page.addEventListener("onclick", function() {alert(command); command="";});
}());
