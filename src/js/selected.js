var selectedIndexes = [];

function selectListing(index) {

	var v = houses[index];

	selectedIndexes.push(index);

	$("#unselected-list li[data-id="+v.id +"]").remove();
	map.removeLayer(v.marker);

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

	var template = '<li onmouseenter="mouseEnter('+v.index+')" onmouseleave="mouseLeave('+v.index+')" title="unselect listing" onclick="unselectListing('+v.index+')" data-id="' + v.id + '"style="display:block">'
		+   '<img src='+ imageLink +' class="circle"></img>'
		+	'<div>'
		+		'<b>' + desc + '</b>'
		+	'</div>'
		+	'<div>'
		+		'$' + v.price + ' | ' + v.beds + ' beds | ' + v.baths + ' baths'
		+		'<span style="float: right; margin-top: 17px">'
		+			'<a href="' + v.url + '" target="_blank">View Listing</a>'
		+		'</span>'
		+	'</div>'
		+	'<hr>'
		+'</li>'

	$("#selected-list").append(template);

	v.selectedMarker.addTo(map);

	mouseLeave(index)

}

function unselectListing(index) {

	var v = houses[index];

	var i = selectedIndexes.indexOf(index);
	if (i > -1) {
    	selectedIndexes.splice(i, 1);
	}

	$("#selected-list li[data-id="+v.id +"]").remove();
	map.removeLayer(v.selectedMarker);

	mouseLeave(index)

	grpMap.all();
}