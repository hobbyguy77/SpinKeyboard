/*global tau */
(function() {
	/**
	 * page - Rotary event page element progressBar - Circle progress element
	 * progressBarWidget - TAU circle progress instance rotaryDetentHandler -
	 * rotarydetent event handler
	 */
	var page = document.getElementById("pageRotaryEvent"), progressBar, progressBarWidget, rotaryDetentHandler, currentDirection = "", command = "", counter = 0, value = 0;

	/**
	 * pagebeforeshow event handler Do preparatory works and adds event
	 * listeners
	 */
	page.addEventListener("pagebeforeshow", function() {
		var resultDiv = document.getElementById("result"), direction, steps;
		
		progressBar = document.getElementById("circleprogress");
		progressBarWidget = new tau.widget.CircleProgressBar(progressBar, {
			size : "large"
		});

		// "rotarydetent" event handler
		rotaryDetentHandler = function(e) {
			// Get rotary direction
			direction = e.detail.direction;

			if (direction === "CW") {
				// Right direction

				if (currentDirection == "")
					currentDirection = "CW";
				if (currentDirection != "CW") {
					command = command + "-" + counter
					counter = 0;
					currentDirection = "CW";
				}
				counter++;
				value++;
			} else if (direction === "CCW") {

				if (currentDirection == "")
					currentDirection = "CCW";
				if (currentDirection != "CCW") {
					command = command + "+" + counter;
					counter = 0;
					currentDirection = "CCW";
				}
				counter++;
				value--;
			}

			resultDiv.innerText = command;
			progressBarWidget.value(value);
		};

		// Add rotarydetent handler to document
		document.addEventListener("rotarydetent", rotaryDetentHandler);
	});

	/**
	 * pagehide event handler Destroys and removes event listeners
	 */
	page.addEventListener("pagehide", function() {
		progressBarWidget.destroy();
		document.removeEventListener("rotarydetent", rotaryDetentHandler);
	});
	
	var enterText = document.getElementById("enter_text");
	enterText.addEventListener("click", function() {
		if(currentDirection == "CW"){
			command = command + "+" + counter;
		}
		else{
			command = command + "-" + counter;
		}
		counter = 0;
		value=0;
		alert(command);
		
		showDataRecord(command);
		
		
		command = "";
		currentDirection = "";
	});
}());
