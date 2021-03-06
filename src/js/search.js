<script src="leaflet-search.js"></script>
<script>
	//sample data values for populate map
	var data = [
		{"loc":, "title":"4"},
		{"loc":, "title":"14"},
		{"loc":, "title":"15"},
		{"loc":, "title":"2"},
		{"loc":, "title":"7"},
		{"loc":, "title":"11"},
		{"loc":, "title":"26"},	
		{"loc":, "title":"16"},
		{"loc":, "title":"51"},
		{"loc":, "title":"12"},
		{"loc":, "title":"39"}
	];



var markersLayer = new L.LayerGroup();	//layer contain searched elements
map.addLayer(markersLayer);
var controlSearch = new L.Control.Search({layer: markersLayer, initial: false});
map.addControl( controlSearch );
////////////populate map with markers from sample data

for(i in data) {
var title = data[i].title,	//value searched
loc = data[i].loc,		//position found
marker = new L.Marker(new L.latLng(loc), {title: title} );//se property searched
marker.bindPopup('title: '+ title );
markersLayer.addLayer(marker);
}

var routepolyline = new L.Polyline(coordinates, {
color: red, weight: 3, opacity: 0.5, smoothFactor: 1
});

firstpolyline.addTo(map);

</script>

