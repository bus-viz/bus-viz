// Init basemaps
var mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: "<a href='https://openstreetmap.org/'>&copy OpenStreetMap contributors, CC-BY-SA</a>"
});
var mapnik_bw = L.tileLayer('http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
  attribution: "<a href='https://openstreetmap.org/'>&copy OpenStreetMap contributors, CC-BY-SA</a>"
});

// Init map
var map = L.map('map', {
  // center: [52.50578645650081, 13.40080976486206], //Berlin
  center: [48.44406299071947, -123.32316398620604], //Victoria
  zoom: 13,
  layers: [mapnik_bw]
});



r360.config.serviceKey = 'CV397NJLTVWPVDEOO2MS';
r360.config.serviceUrl = 'http://api.route360.net/api_dev/';
var travelOptions = r360.travelOptions();
var polygonLayer = r360.route360PolygonLayer();
polygonLayer.addTo(map);

// Create Route360 shapes
map.on('dblclick', function(e){
  var latlng = [e.latlng.lat, e.latlng.lng];
  var marker = L.marker(latlng).addTo(map);

  travelOptions.addSource(e.latlng);
  // polygons for 5 to 30 minutes
  travelOptions.setTravelTimes([300, 600, 900, 1200, 1500, 1800]);
  travelOptions.setTravelType('car')

  // call the service
  r360.PolygonService.getTravelTimePolygons(travelOptions, function(polygons){
    console.log(polygons);
    polygonLayer.addLayer(polygons);
    // map.fitBounds(polygonLayer.getBoundingBox());
  },
  function(status, message){
      $("#r360-gettingstarted-error").show('fade').html("We are currently performing service maintenance. The \
          service will be available shortly.");
  });
});
