
// Init basemaps
var mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: "<a href='https://openstreetmap.org/'>&copy OpenStreetMap contributors, CC-BY-SA</a>"
});
var mapnik_bw = L.tileLayer('http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
  attribution: "<a href='https://openstreetmap.org/'>&copy OpenStreetMap contributors, CC-BY-SA</a>"
});

// Init map
var map = L.map('map', {
   center: [48.44406299071947, -123.32316398620604], //Victoria
  zoom: 13,
  layers: [mapnik_bw]
});


var markersLayer = new L.LayerGroup();
map.addLayer(markersLayer);
map.addControl( new L.Control.Search({layer: markersLayer}));


var data = [
		{"shape_id":"-123.99536143544, 49.1958029273466", "title":"4"},
		{"shape_id":"[-123.99536143544, 49.1958029273466], [-123.99536143544, 49.1958029273466]", "title":"14"},
		{"shape_id":"123456", "title":"vish"},
		{"shape_id":"", "title":"2"},
		{"shape_id":"", "title":"7"},
		{"shape_id":"", "title":"11"},
		{"shape_id":"", "title":"26"},
		{"shape_id":"", "title":"16"},
		{"shape_id":"", "title":"51"},
		{"shape_id":"", "title":"12"},
		{"shape_id":"", "title":"39"}
	];


var route;

for(i in data) {

	var title = data[i].title;	//value searched
	shape_id = data[i].shape_id;		//position
	//alert(shape_id);

}

//marker = new L.Marker(new L.latLng(shape_id), {title: title} );//se property searched

//marker.bindPopup('title: '+ title );
//markersLayer.addLayer(marker);
