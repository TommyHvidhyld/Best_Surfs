/////Basic map setup
// Initialize map options
var caliCoords = [34, -118];
var mapZoomLevel = 7;

// Create the map object with options.
var myMap = L.map("map-id", {
    center: caliCoords,
    zoom: mapZoomLevel
});

// Create the title layer that will be the background of our map.
//initialMap is the layer object, have basemaps dictionary would have that list entered so it could be selected in the legend.
let initialStreet =
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);
let initialTopo =
    L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });


// // Test that markers are working
// var marker = L.marker(newYorkCoords, {
//     draggable: true,
//     title: "My First Marker"
// }).addTo(myMap);


/////Get the marker data
// Pull the "stations" property from response.data.
let surfMarkers = [];
let geoData = "https://surf-app.onrender.com/api/v1.0/surf";

d3.json(geoData).then(response => {
    // Pull the "stations" property from response.data. to shorten what's used in the loop
    let stations = response;

    //Use For Loop
    for (var index = 0; index < stations.length; index++) {


        // For each station, create a marker, and bind a popup with the station's name.
        let surfMarker = L.circle([stations[index].longitude, stations[index].latitude],  {
            stroke: true,
            fillOpacity: ([stations[index].wave_height / 3]),
            color: "blue",
            fillColor: "blue",
            radius: ([stations[index].air_temp * 500])
        })
    .bindPopup("<h2>" + stations[index].spot + "<h2><h4>Wave Height: " + stations[index].wave_height +  " M</h4><h4>Air Temperature: " + stations[index].air_temp + " °C</h4><h4>Wind Speed: " + stations[index].wind_speed + " m/s</h4>")
    .addTo(myMap);
        // ;
        // Add the marker to the bikeMarkers array.
        surfMarkers.push(surfMarker);
    }

});


///// Legend Setup
// Create two separate layer groups: one for the city markers and another for the state markers.
let spotMarkers = L.layerGroup(surfMarkers);

// Create a baseMaps object to hold the lightmap layer.
let baseMaps = {
    "Street": initialStreet,
    "Topography": initialTopo
};

// Create an overlayMaps object to hold the bikeStations layer.
let overlayMaps = {
    
};

// Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
legendControl = L.control.layers(baseMaps, overlayMaps).addTo(myMap);

legendControl.addOverlay(spotMarkers, "Surf Locations");