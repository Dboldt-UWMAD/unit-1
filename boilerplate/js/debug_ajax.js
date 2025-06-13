function debugCallback(response){
	// Pass the parsed response data to the callback
	document.querySelector("#mydiv").insertAdjacentHTML('beforeend', 'GeoJSON data: ' + JSON.stringify(response))
};

function debugAjax(){
	
	fetch("data/MegaCities.geojson")
		.then(function(response){
			// Parse the JSON data from the response
			return response.json();
		})
		.then(function(data) {
			// Call the debugCallback with the actual data
			debugCallback(data);
		})
		.catch(function(error) {
			// Handle any errors that occur during the fetch or parsing
			console.error('Error fetching or parsing data:', error);
		});

	// Removed the problematic line as 'myData' is not defined here
};

// Removed the problematic line as 'myData' is not defined in the global scope
