var transitPolys = L.geoJson(fake_polys, {
  clickable: true,
  color: "rgb(215, 0, 0)",
  weight: 1,
  className: "transit-poly",
  opacity: 0.5,
  fillOpacity: 0.15,

  onEachFeature: function(data, layer){
    layer.on('click', function(e){
      // Set only selected poly to heavier line weight
      transitPolys.setStyle({weight: 1});
      layer.setStyle({weight: 4});

      // TODO Filter dimID by polygon


    });
  },
}).addTo(map);
