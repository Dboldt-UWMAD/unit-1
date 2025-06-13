// main.js - Final Project Script
// This script dynamically creates a table of Wisconsin cities and their populations,
// adds a city size column, attaches interactive events, and fetches GeoJSON data for display.

// Array of city objects with name and population
var cityPop = [
    { city: 'Madison', population: 233209 },
    { city: 'Milwaukee', population: 594833 },
    { city: 'Green Bay', population: 104057 },
    { city: 'Superior', population: 27244 }
];

/**
 * Creates and appends a table of cities and populations to the #mydiv element.
 */
function cities() {
    var table = document.createElement("table");
    var headerRow = document.createElement("tr");

    // Create table headers
    var cityHeader = document.createElement("th");
    cityHeader.innerHTML = "City";
    headerRow.appendChild(cityHeader);

    var popHeader = document.createElement("th");
    popHeader.innerHTML = "Population";
    headerRow.appendChild(popHeader);
    table.appendChild(headerRow);

    // Add a row for each city
    for (var i = 0; i < cityPop.length; i++) {
        var tr = document.createElement("tr");
        var city = document.createElement("td");
        city.innerHTML = cityPop[i].city;
        tr.appendChild(city);
        var pop = document.createElement("td");
        pop.innerHTML = cityPop[i].population;
        tr.appendChild(pop);
        table.appendChild(tr);
    }

    // Append the table to the target div
    var myDiv = document.getElementById("mydiv");
    myDiv.appendChild(table);
}

/**
 * Adds a "City Size" column to the table based on population thresholds.
 */
function addColumns() {
    document.querySelectorAll("tr").forEach(function(row, i) {
        if (i === 0) {
            // Header row: add column title
            row.insertAdjacentHTML('beforeend', '<th>City Size</th>');
        } else {
            // Data rows: determine and add city size
            var citySize;
            if (cityPop[i - 1].population < 100000) {
                citySize = 'Small';
            } else if (cityPop[i - 1].population < 500000) {
                citySize = 'Medium';
            } else {
                citySize = 'Large';
            }
            row.insertAdjacentHTML('beforeend', '<td>' + citySize + '</td>');
        }
    });
}

/**
 * Attaches interactive events to the table: color change on hover and alert on click.
 */
function addEvents() {
    var table = document.querySelector("table");
    // Change background color to a random RGB value on mouseover
    table.addEventListener("mouseover", function() {
        var color = "rgb(";
        for (var i = 0; i < 3; i++) {
            var random = Math.round(Math.random() * 255);
            color += random;
            if (i < 2) color += ",";
        }
        color += ")";
        table.style.backgroundColor = color;
    });
    // Show an alert when the table is clicked
    table.addEventListener("click", function() {
        alert('Hey, you clicked me!');
    });
}

/**
 * Displays the fetched GeoJSON data in the #mydiv element for debugging purposes.
 * @param {Object} response - The parsed GeoJSON data.
 */
function debugCallback(response) {
    document.querySelector("#mydiv").insertAdjacentHTML('beforeend', '<br>GeoJSON data: ' + JSON.stringify(response));
}

/**
 * Fetches the MegaCities.geojson file and passes the data to debugCallback.
 */
function debugAjax() {
    fetch("data/MegaCities.geojson")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            debugCallback(data);
        })
        .catch(function(error) {
            console.error('Error fetching or parsing data:', error);
        });
}

/**
 * Initializes the page: builds the table, adds columns, attaches events, and loads GeoJSON data.
 */
function initialize() {
    cities();      // Build the city table
    addColumns();  // Add city size column
    addEvents();   // Attach table events
    debugAjax();   // Fetch and display GeoJSON data
}

// Run initialize when the window finishes loading
window.onload = initialize;