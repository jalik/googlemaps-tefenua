// Ce fichier permet d'initialiser la carte TeFenua
// via OpenLayers.

// Initialise la carte TeFenua quand le DOM est prêt
document.addEventListener("DOMContentLoaded", function () {
    // Prépare la couche des marqueurs
    // http://openlayers.org/en/master/apidoc/ol.layer.Vector.html
    var markerLayer = new ol.layer.Vector({
        source: new ol.source.Vector(),
        zIndex: 100
    });

    // Prépare la couche TeFenua
    var tefenuaLayer = createTeFenuaLayer();

    // Prépare la vue de la carte
    // http://openlayers.org/en/master/apidoc/ol.View.html
    var mapView = new ol.View({
        center: [-149.544155, -17.526540],
        zoom: 16,
        projection: ol.proj.get("EPSG:4326")
    });

    // Prépare la carte OpenLayers
    // http://openlayers.org/en/master/apidoc/ol.Map.html
    var map = new ol.Map({
        // N'afficher aucun contrôle
        controls: [],
        // Couche de la carte
        layers: [
            markerLayer,
            tefenuaLayer
        ],
        // ID de l'élément où afficher la carte
        target: "company_tefenua_canvas",
        // Charger la carte pendant l'animation
        loadTilesWhileAnimating: false,
        // Charger la carte pendant les intéractions
        loadTilesWhileInteracting: false,
        view: mapView
    });

    // Expose la carte TeFenua globalement
    window.tefenuaMap = map;

    // Prépare un marqueur
    // http://openlayers.org/en/master/apidoc/ol.Feature.html
    var marker = new ol.Feature({
        geometry: new ol.geom.Point(map.getView().getCenter())
    });

    // Définit le style du marqueur
    marker.setStyle(new ol.style.Style({
        // http://openlayers.org/en/master/apidoc/ol.style.Icon.html
        image: new ol.style.Icon({
            anchor: [0.5, 1],
            anchorXUnits: "fraction",
            anchorYUnits: "fraction",
            // size: [32, 32],
            scale: 0.15,
            src: "http://www.myiconfinder.com/uploads/iconsets/256-256-6096188ce806c80cf30dca727fe7c237.png"
        })
    }));

    // Ajoute le marqueur sur la couche des marqueurs
    markerLayer.getSource().addFeature(marker);

    // Synchronise la carte Google avec la carte TeFenua
    // quand on déplace/zoome sur la carte TeFenua.
    mapView.on("change", function () {
        if (window.googleMap && window.currentMap === "tefenua") {
            window.googleMap.setCenter(olCoordToGoogleCoord(mapView.getCenter()));
            window.googleMap.setZoom(mapView.getZoom());
        }
    });

    // Affiche l'emplacement cliqué dans la console
    map.on("click", function (ev) {
        console.log("clicked @:", ev.coordinate);
    });
});
