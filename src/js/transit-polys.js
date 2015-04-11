var transitPolys = L.geoJson(fake_polys, {
  clickable: true,
  color: "#007700",
  weight: 1,
  className: "transit-poly",
  opacity: 0.5,
  fillOpacity: 0.15,

  onEachFeature: function(data, layer){
    layer.on('click', function(e){
      // Set only selected poly to heavier line weight
      transitPolys.setStyle({weight: 1});
      layer.setStyle({weight: 4});

      // Filter points if not in polygon
      dimLatLng.filter(function(d){
        return pointInPoly(d, layer.getLatLngs());
      })
      dc.redrawAll();

    });
  },
}).addTo(map);


// Purpose: Calculate if a point is in a polygon
// Input:   point format: [o.LatLng]; polygon format: [[o.LatLng],[o.LatLng],...]
// Output:  Boolean True or False
// Source: http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
function pointInPoly(point, poly) {
  var x = point.lat, y = point.lng;

  var inside = false;
  for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    var xi = poly[i].lat, yi = poly[i].lng;
    var xj = poly[j].lat, yj = poly[j].lng;

    var intersect = ((yi > y) != (yj > y))
      && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
};
