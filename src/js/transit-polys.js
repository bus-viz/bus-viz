map.on('draw:created', function (e) {
    var type = e.layerType,
        layer = e.layer;

    if (type === 'polygon') {
        console.log(e);
    }

    // Do whatever else you need to. (save to db, add to map etc)
    map.addLayer(layer);
});
