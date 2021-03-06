
var redMarker = L.AwesomeMarkers.icon({
	markerColor: 'red'
	});
var blueMarker = L.AwesomeMarkers.icon({
	markerColor: 'blue'
	});
var cadetBlueMarker = L.AwesomeMarkers.icon({
	markerColor: 'cadetblue'
	});

// add each house to the map, and save a reference to it
for (var index in houses) {
	var house = houses[index];
	house.marker = L.marker({lat: house.lat, lng: house.lng}, {title: house.description, icon: blueMarker});
	house.priceRng = Math.floor(+house.price/200) * 200;

	house.index = index;
	house.selectedMarker = L.marker({lat: house.lat, lng: house.lng}, {title: house.description, icon: redMarker, zIndexOffset: 20});
	house.selected = false;
	house.hoverMarker = L.marker({lat: house.lat, lng: house.lng}, {title: house.description, icon: cadetBlueMarker, zIndexOffset: 100});

	house.marker.on('click', selectListing.bind(null, house.index));
	house.hoverMarker.on('click', selectListing.bind(null, house.index));
	house.selectedMarker.on('click', unselectListing.bind(null, house.index));
	house.marker.on("mouseover", mouseEnter.bind(null, house.index));
	//house.selectedMarker.on("mouseover", mouseEnter.bind(null, house.index));
	house.hoverMarker.on("mouseout", mouseLeave.bind(null, house.index));
	//house.marker.on("mouseout", mouseLeave.bind(null, house.index));
	//house.selectedMarker.on("mouseout", mouseLeave.bind(null, house.index));
}

var aptTypes = ["Full", "Sublet", "Room", "Vacation"];
var binTypes = ["None","Allowed"];

var ndx = crossfilter().add(houses),
dimID = ndx.dimension(function(d){return +d.id || 0}),
dimLatLng = ndx.dimension(function(d){return L.latLng(+d.lat, +d.lng)}),
dimPrice = ndx.dimension(function(d){return d.price || 0}),
dimBeds = ndx.dimension(function(d){return +d.beds || 0}),
dimBaths = ndx.dimension(function(d){return +d.baths || 0}),
dimCats = ndx.dimension(function(d){return binTypes[+d.cats || 0]}),
dimDogs = ndx.dimension(function(d){return binTypes[+d.dogs || 0]}),
dimPriceRng = ndx.dimension(function(d){return d.priceRng || 0});

function reduceAddMap(p, v) {

	if(selectedIndexes.indexOf(v.index) >= 0)
		return p + 1;

	var imagelink;
	if(v.images.length == 0) {
		imagelink = 'default_house.png'
	}
	else {
		imageLink = v.images[0];
	}

	var desc;
	if(v.description == ""){
		desc = "[No Description Available]";
	}
	else {
		desc = v.description;
	}

	var template = '<li onmouseenter="mouseEnter('+v.index+')" onmouseleave="mouseLeave('+v.index+')" title="compare listing" onclick="selectListing('+v.index+')" data-id="' + v.id + '"style="display:block">'
		+   '<img src='+ imageLink +' class="circle"></img>'
		+	'<div>'
		+		'<b>' + desc + '</b>'
		+	'</div>'
		+	'<div>'
		+		'$' + v.price + ' | ' + v.beds + ' beds | ' + v.baths + ' baths'
		+		'<span style="float: right; margin-top: 17px">'
		+			'<a href="' + v.url + '" target="_blank">'+v.sourceName+'</a>'
		+		'</span>'
		+	'</div>'
		+	'<hr>'
		+'</li>'

	$("#unselected-list").append(template);

	v.marker.addTo(map);
	return p + 1;
}

function reduceRemoveMap(p, v) {

	$("#unselected-list li[data-id="+v.id +"]").remove();

	map.removeLayer(v.marker);
	return p - 1;
}

function reduceInitialMap() {
	return 0;
}

var grpMap = dimID.group().reduce(reduceAddMap, reduceRemoveMap, reduceInitialMap);
grpMap.all();


var grpPriceRng = dimPriceRng.group().reduceCount();


var chtPrice = dc.lineChart("#price")
 	.width(275)
	.height(150)
	.x(d3.scale.linear().domain([0,5000]))
    .brushOn(true)
    .renderArea(true)
	.xAxisLabel("Price")
	.yAxisLabel("Listings")
	.dimension(dimPriceRng)
	.elasticY(true)
	.group(grpPriceRng);
chtPrice.margins().right = 15;
chtPrice.xAxis().ticks(5).tickFormat(function(d){return "$" + d;});
chtPrice.yAxis().ticks(7);;

var grpBeds = dimBeds.group().reduceCount();

var chtBeds = dc.barChart("#beds")
 	.width(275)
	.height(150)
	.x(d3.scale.ordinal())
	.xUnits(dc.units.ordinal)
	.brushOn(false)
	.centerBar(true)
	.xAxisLabel("Beds")
	.yAxisLabel("Listings")
	.dimension(dimBeds)
	.elasticY(true)
	.group(grpBeds);
chtBeds.margins().right = -20;
chtBeds.yAxis().ticks(5);

var grpBaths = dimBaths.group().reduceCount();

var chtBaths = dc.barChart("#baths")
 	.width(275)
	.height(150)
	.x(d3.scale.ordinal())
	.xUnits(dc.units.ordinal)
	.brushOn(false)
	.centerBar(true)
	.xAxisLabel("Baths")
	.yAxisLabel("Listings")
	.dimension(dimBaths)
	.elasticY(true)
	.group(grpBaths);
chtBaths.margins().right = -30;
chtBaths.yAxis().ticks(5);

var grpCats = dimCats.group().reduceCount();

var chtCats = dc.pieChart("#cats")
 	.width(75)
	.height(75)
	.slicesCap(2)
    .innerRadius(18)
	.dimension(dimCats)
	.label(function (d) {return "";})
	.colors(['#00cc00','#f0390c'])
	.group(grpCats);
	//.legend(dc.legend());

var grpDogs = dimDogs.group().reduceCount();

var chtDogs = dc.pieChart("#dogs")
 	.width(75)
	.height(75)
	.slicesCap(2)
    .innerRadius(18)
	.dimension(dimDogs)
	.label(function (d) {return "";})
	.colors(['#00cc00','#f0390c'])
	.group(grpDogs);
	//.legend(dc.legend());



dc.renderAll();
