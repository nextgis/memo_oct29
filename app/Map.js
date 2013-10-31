define([
    "dojo/_base/declare",
    "dojo/Stateful",
    "dojo/_base/lang",
    "app/Popup",
    "app/widget/HouseWidget",
    "app/widget/ChurchWidget",
    "app/widget/POIWidget",
    "dojo/store/Memory",
    //layers
    "dojo/json",
    "dojo/text!app/data/houses/houses.geojson",
    "dojo/text!app/data/churches/churches.geojson",
    "dojo/text!app/data/poi/poi.geojson"
], function (
    declare,
    Stateful,
    lang,
    Popup,
    HouseWidget,
    ChurchWidget,
    POIWidget,
    Memory,
    JSON,
    house,
    church,
    poi
) {
    return declare(Stateful, {

        constructor: function (div, options) {

            this.llmap = L.map(div, options);      
            L.tileLayer('http://api.tiles.mapbox.com/v3/nextgis.map-con61p5p/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.llmap);

            // 1. Церкви
            L.geoJson(JSON.parse(church), {
                style: function(feature) {
                    return {fill: true, fillOpacity: 0, color: '#00bfff', opacity: 1, weight: 2, dashArray: "4, 3"}
                },
                onEachFeature: lang.hitch(this, function (feature, layer) {
                    layer.on('click', lang.hitch(this, function(e) {
                        var widget = new ChurchWidget({
                            style: "width: 320px",
                            desc: feature.properties['name']
                        });
                        var p = new Popup({offset: [0, 0], title: "Церкви и монастыри"})
                            .setLatLng(e.latlng)
                            .openOn(this.llmap)
                            .setContent(widget);
                    }));
                })
            }).addTo(this.llmap);

            // 2. "Расстрельные" дома
            L.geoJson(JSON.parse(house), {
                style: function(feature) {
                    var attr = feature.properties['kill'];
                    if (attr < 6) {
                        return {fillColor: "#b05e60", fillOpacity: 0.8, stroke: false}
                    } else if (attr < 10) {
                        return {fillColor: "#aa262e", fillOpacity: 0.8, stroke: false}
                    } else if (attr < 20) {
                        return {fillColor: "#81171b", fillOpacity: 0.8, stroke: false}
                    } else {
                        return {fillColor: "#461417", fillOpacity: 0.8, stroke: false}
                    }
                },
                onEachFeature: lang.hitch(this, function (feature, layer) {
                    layer.on('click', lang.hitch(this, function(e) {
                        // Сортировка
                        var store = new Memory({data: feature.properties['people']});
                        var sorted = store.query(null, {
                            sort:[{ attribute: "name", descending: false }]
                        });
                        var widget = new HouseWidget({style:"width: 320px", people: sorted});                       
                        var p = new Popup({
                                offset: [0, 0],
                                title: feature.properties['address'] + " " + "(Расстреляно человек: " + feature.properties['kill'] + ")"
                            })
                            .setLatLng(e.latlng)
                            .openOn(this.llmap)
                            .setContent(widget);
                    }));
                })
            }).addTo(this.llmap);

            // 3. POI
            L.geoJson(JSON.parse(poi), {
                onEachFeature: lang.hitch(this, function (feature, layer) {
                    layer.on('click', lang.hitch(this, function(e) {
                        var widget = new ChurchWidget({
                            style: "width: 320px",
                            doLayout: false,
                            poiid: feature.properties['id'],
                            desc: feature.properties['desc'],
                            photo: feature.properties['photo']
                        });
                        var p = new Popup({offset: [0, 0], title: feature.properties['name']})
                            .setLatLng(e.latlng)
                            .openOn(this.llmap)
                            .setContent(widget);
                    }));
                }),
                pointToLayer: function (feature, latlng) {
                    return new L.Marker(latlng, {
                        icon: new L.Icon({
                            iconSize: [16, 16],
                            iconUrl: 'app/img/poi.png'
                        })
                    })
                }
            }).addTo(this.llmap);

        }

    });
});