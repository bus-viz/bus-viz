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
    "Bus stops": L.geoJson(bus_stops, {
      pointToLayer: function(feature, latlng){
        return L.circleMarker(latlng,{
          stroke: false,
          opacity: 0.8,
        }).setRadius(3);
      }
    }),
    "Bus routes": L.geoJson(bus_shapes)
};

// Init map
var map = L.map('map', {
  center: [48.45368424076468, -123.34093093872069],
  zoom: 12,
  layers: [mapnik_bw]
});

// Add layers to map
L.control.layers(baseMaps, overlayMaps).addTo(map);
