
function mouseEnter(index) {
	var v = houses[index];
	v.hoverMarker.addTo(map);
}

function mouseLeave(index) {
	var v = houses[index];
	map.removeLayer(v.hoverMarker);
}