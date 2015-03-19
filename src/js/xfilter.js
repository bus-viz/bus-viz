
	// add each house to the map, and save a reference to it
	houses.forEach(function(house){
		house.marker = L.marker({lat: house.lat, lng: house.lng}, {title: house.description});
		house.priceRng = Math.floor(+house.price/200) * 200;
	});

	var ndx = crossfilter().add(houses),
	dimID = ndx.dimension(function(d){return +d.id || 0}),
	dimPrice = ndx.dimension(function(d){return d.price || 0}),
	dimBeds = ndx.dimension(function(d){return +d.beds || 0}),
	dimBaths = ndx.dimension(function(d){return +d.baths || 0}),
	dimCats = ndx.dimension(function(d){return +d.cats || 0}),
	dimDogs = ndx.dimension(function(d){return +d.dogs || 0}),
	dimPriceRng = ndx.dimension(function(d){return d.priceRng || 0});

	function reduceAddMap(p, v) {
		v.marker.addTo(map);
		return p + 1;
	}

	function reduceRemoveMap(p, v) {
		map.removeLayer(v.marker);
		return p - 1;
	}

	function reduceInitialMap() {
		return 0;
	}

	var grpMap = dimID.group().reduce(reduceAddMap, reduceRemoveMap, reduceInitialMap);
	grpMap.all();

	var grpPriceRng = dimPriceRng.group().reduceCount();

	chtPrice = dc.lineChart("#price")
	 	.width(400)
		.height(200)
		.x(d3.scale.linear().domain([0,5000]))
	    .brushOn(true)
	    .renderArea(true)
		.xAxisLabel("Price")
		.yAxisLabel("Listings")
		.dimension(dimPriceRng)
		.elasticY(true)
		.group(grpPriceRng);

	var grpBeds = dimBeds.group().reduceCount();

	chtBeds = dc.barChart("#beds")
	 	.width(400)
		.height(200)
		.x(d3.scale.linear().domain([1,10]))
	    .brushOn(true)
	    //.renderArea(true)
		.xAxisLabel("Beds")
		.yAxisLabel("Listings")
		.dimension(dimBeds)
		.group(grpBeds);
	



	dc.renderAll();




