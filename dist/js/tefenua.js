// Initialise la carte Google quand le DOM est prêt
document.addEventListener("DOMContentLoaded", function () {
    // Définit les résolutions de la carte
    var resolutions = [
        0.703125,
        0.3515625,
        0.17578125,
        0.087890625,
        0.0439453125,
        0.02197265625,
        0.010986328125,
        0.0054931640625,
        0.00274658203125,
        0.001373291015625,
        0.0006866455078125,
        0.0003433227539062,
        0.0001716613769531,
        0.0000858306884766,
        0.0000429153442383,
        0.0000214576721191,
        0.0000107288360596,
        0.0000053644180298,
        0.0000026822090149
    ];

    // Prépare les IDs des matrices de tuiles
    var matrixIds = [];
    for (var i = 0; i < resolutions.length; i++) {
        matrixIds.push("EPSG:4326:" + i);
    }

    // Couche des marqueurs
    var markerLayer = new ol.layer.Vector({
        source: new ol.source.Vector(),
        zIndex: 100
    });

    // Couche TeFenua
    var tefenuaLayer = new ol.layer.Tile({
        zIndex: 1,
        source: new ol.source.WMTS({
            url: "https://www.tefenua.gov.pf/tefenua/api/wmts",
            format: "image/jpeg",
            layer: "TEFENUA:FOND",
            style: "",
            matrixSet: "EPSG:4326",
            projection: ol.proj.get("EPSG:4326"),
            tileGrid: new ol.tilegrid.WMTS({
                extent: [
                    -180,
                    -70.20625,
                    0,
                    52.70855
                ],
                matrixIds: matrixIds,
                origin: [-180, 90],
                resolutions: resolutions,
                tileSize: 256
            })
        })
    });

    // Prépare la carte TeFenua
    var mapView = new ol.View({
        center: [-149.544155, -17.526540],
        zoom: 15,
        projection: ol.proj.get("EPSG:4326"),
        resolutions: resolutions,
    });
    var map = new ol.Map({
        controls: [],
        layers: [
            markerLayer,
            tefenuaLayer
        ],
        target: "company_tefenua_canvas",
        loadTilesWhileAnimating: false,
        loadTilesWhileInteracting: false,
        view: mapView
    });

    // Expose la variable globalement
    window.tefenuaMap = map;

    // Ajoute le marqueur sur la carte
    var marker = new ol.Feature({
        geometry: new ol.geom.Point(map.getView().getCenter())
    });
    marker.setStyle(new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 1],
            anchorXUnits: "fraction",
            anchorYUnits: "fraction",
            // size: [32, 32],
            scale: 0.15,
            src: "http://www.myiconfinder.com/uploads/iconsets/256-256-6096188ce806c80cf30dca727fe7c237.png"
        })
    }));
    markerLayer.getSource().addFeature(marker);

    // Synchronise la carte Google quand on déplace ou zoome sur la carte TeFenua
    mapView.on("change", function () {
        var center = mapView.getCenter();
        console.log("moved tefenua map to:", center);

        if (window.googleMap) {
            window.googleMap.setCenter({lat: center[1], lng: center[0]});
            window.googleMap.setZoom(mapView.getZoom() + 1);
        }
    });

    // Affiche l'emplacement cliqué
    map.on("click", function (ev) {
        console.log("clicked @:", ev.coordinate);
    });
});
