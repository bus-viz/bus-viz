
var hoveredIndex = -1;

function mouseEnter(index) {
	if(hoveredIndex >= 0) {
		 mouseLeave(hoveredIndex);
	}
	var v = houses[index];
	v.hoverMarker.addTo(map);
	hoveredIndex = index;
}

function mouseLeave(index) {
	var v = houses[index];
	map.removeLayer(v.hoverMarker);
}