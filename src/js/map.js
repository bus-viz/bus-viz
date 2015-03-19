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
    "Bus routes": L.geoJson(bus_shapes, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.shape_id);
      }
    })
};

// Init map
var map = L.map('map', {
<<<<<<< HEAD:src/js/map.js
  center: [48.45402579009966, -123.35552215576172],
  zoom: 13,
=======
  center: [48.45368424076468, -123.34093093872069],
  zoom: 12,
>>>>>>> 66df4366bb9d0b1c4db20fe89072511c9193dd92:assets/js/map.js
  layers: [mapnik_bw]
});

// Add layers to map
L.control.layers(baseMaps, overlayMaps).addTo(map);
