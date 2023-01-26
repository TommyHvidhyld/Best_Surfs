// Create the tile layer that will be the background of our map.
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});


// Initialize all the LayerGroups that we'll use.
let layers = {
  city: new L.LayerGroup(),
  air_temp: new L.LayerGroup(),
  pressure: new L.LayerGroup(),
  gust: new L.LayerGroup(),
  precipitation: new L.LayerGroup(),
  visibility: new L.LayerGroup(),
  water_temp: new L.LayerGroup(),
  wave_height: new L.LayerGroup(),
  wave_direction: new L.LayerGroup(),
  wind_direction: new L.LayerGroup(),
  wind_speed: new L.LayerGroup(),
};

// Create the map with our layers.
let map = L.map("map-id", {
  center: [34, -118],
  zoom: 5,
  layers: [
    layers.city,
    layers.air_temp,
    layers.pressure,
    layers.gust,
    layers.precipitation,
    layers.visibility,
    layers.water_temp,
    layers.wave_height,
    layers.wave_direction,
    layers.wind_direction,
    layers.wind_speed
  ]
});

// Add our "streetmap" tile layer to the map.
streetmap.addTo(map);

// Create an overlays object to add to the layer control.
let overlays = {
  "City": layers.city,
  "Air Temperature": layers.air_temp,
  "Pressure": layers.pressure,
  "Gust": layers.gust,
  "Precipitation": layers.precipitation,
  "Visibility": layers.visibility,
  "Water Temperature": layers.water_temp,
  "Wave Height": layers.wave_height,
  "Wave Direction": layers.wave_direction,
  "Wind Direciton": layers.wind_direction,
  "Wind Speed": layers.wind_speed  
};

// Create a control for our layers, and add our overlays to it.
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map.
let info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend".
info.onAdd = function() {
  let div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map.
info.addTo(map);

// Initialize an object that contains icons for each layer group.
let icons = {
  city: L.ExtraMarkers.icon({
    icon: "ion-settings",
    iconColor: "white",
    markerColor: "yellow",
    shape: "star"
  }),
  pressure: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "red",
    shape: "circle"
  }),
  gust: L.ExtraMarkers.icon({
    icon: "ion-minus-circled",
    iconColor: "white",
    markerColor: "blue-dark",
    shape: "penta"
  }),
  precipitation: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "orange",
    shape: "circle"
  }),
  visibility: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "green",
    shape: "circle"
  }),
  water_temp: L.ExtraMarkers.icon({
    icon: "ion-settings",
    iconColor: "white",
    markerColor: "blue",
    shape: "star"
  }),
  wave_height: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "purple",
    shape: "circle"
  }),
  wave_direction: L.ExtraMarkers.icon({
    icon: "ion-minus-circled",
    iconColor: "white",
    markerColor: "black",
    shape: "penta"
  }),
  wind_direction: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "red-dark",
    shape: "circle"
  }),
  wind_speed: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "green-dark",
    shape: "circle"
  })
};

// function createMarkers(response) {

//     // Pull the "stations" property from response.data.
//     let locations = response.data.locations;
  
//     // Initialize an array to hold bike markers.
//     let cityMarkers = [];
    
//     // forEach version
//     // stations.forEach(station => {
      
//     //   let bikeMarker = L.marker([station.lat, station.lon])
//     //     .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>");
  
//     //   // Add the marker to the bikeMarkers array.
//     //   bikeMarkers.push(bikeMarker);
//     // });
  
//     // Loop through the stations array.
//     for (let index = 0; index < locations.length; index++) {
//       let location = locations[index];
  
//       // For each station, create a marker, and bind a popup with the station's name.
//       let cityMarker = L.marker([locations.latitude, locations.longitude])
//         .bindPopup("<h3>" + location.spot + "<h3><h3>Capacity: " + location.gust + "</h3>");
  
//       // Add the marker to the bikeMarkers array.
//       cityMarkers.push(cityMarker);
//     }
  
//     // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
//     createMap(L.layerGroup(cityMarkers));
//   }

  
//   // Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
//   d3.json("http://127.0.0.1:5000/api/v1.0/names").then(data => createMarkers(data));