//initialize function that fires the rest of the functions
function initialize(){
    cities();
    addColumns(cityPop);
    addEvents();
};

// way to store cities and their data
var cityPop = [
    { city: 'Madison', population: 233209 },
    { city: 'Milwaukee', population: 594833 },
    { city: 'Green Bay', population: 104057 },
    { city: 'Superior', population: 27244 }
];

//function to create a table with cities and their populations

function cities(){
    
    //create the table element
    var table = document.createElement("table");

    //create a header row
    var headerRow = document.createElement("tr");

    //add the City column
    var cityHeader = document.createElement("th");
    cityHeader.innerHTML = "City";
    headerRow.appendChild(cityHeader);

    //add Population column
    var popHeader = document.createElement("th");
    popHeader.innerHTML = "Population";
    headerRow.appendChild(popHeader);

    table.appendChild(headerRow);

    //loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
        var tr = document.createElement("tr");

        var city = document.createElement("td");
        city.innerHTML = cityPop[i].city;
        tr.appendChild(city);

        var pop = document.createElement("td");
        pop.innerHTML = cityPop[i].population;
        tr.appendChild(pop);

        table.appendChild(tr);
    };

    //add table to  div
    var myDiv = document.getElementById("mydiv");
    myDiv.appendChild(table);
};

//adding city size column
function addColumns(cityPop){
    document.querySelectorAll("tr").forEach(function(row, i){
        if (i === 0){
            row.insertAdjacentHTML('beforeend', '<th>City Size</th>');
        } else {
            var citySize;
            if (cityPop[i-1].population < 100000){
                citySize = 'Small';
            } else if (cityPop[i-1].population < 500000){
                citySize = 'Medium';
            } else {
                citySize = 'Large';
            }

            row.insertAdjacentHTML('beforeend', '<td>' + citySize + '</td>');
        }
    });
};


function addEvents(){
    var table = document.querySelector("table");

    table.addEventListener("mouseover", function(){
        var color = "rgb(";
        for (var i = 0; i < 3; i++){
            var random = Math.round(Math.random() * 255);
            color += random;
            if (i < 2) color += ",";
        };
        color += ")";
        table.style.backgroundColor = color;
    });

    table.addEventListener("click", function(){
        alert('Hey, you clicked me!');
    });
};

// onload so all html elements load in
window.onload = initialize;