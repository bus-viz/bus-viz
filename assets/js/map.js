// Init basemaps
var mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: "<a href='https://openstreetmap.org/'>&copy OpenStreetMap contributors, CC-BY-SA</a>"
});
var mapnik_bw = L.tileLayer('http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
  attribution: "<a href='https://openstreetmap.org/'>&copy OpenStreetMap contributors, CC-BY-SA</a>"
});

var baseMaps = {
  "Grayscale": mapnik_bw,
  "Color": mapnik
};

// Init overlays

var overlayMaps = {
    //eg "Bus stops": busstops
};

// Init map
var map = L.map('map', {
  center: [51.505, -0.09],
  zoom: 13,
  layers: [mapnik_bw]
});

// Add layers to map
L.control.layers(baseMaps, overlayMaps).addTo(map);
