// Ce fichier permet d'initialiser les cartes Google et TeFenua
// via OpenLayers.

// Initialise la carte quand le DOM est prêt
document.addEventListener("DOMContentLoaded", function () {
    // Prépare la couche des marqueurs
    // http://openlayers.org/en/master/apidoc/ol.layer.Vector.html
    var markerLayer = new ol.layer.Vector({
        source: new ol.source.Vector(),
        zIndex: 100
    });

    // Prépare la couche Google
    var googleLayer = createGoogleLayer();
    googleLayer.setVisible(true);
    window.googleLayer = googleLayer;

    // Prépare la couche TeFenua:IMAGE_PUBLIQUE
    var imagePubliqueLayer = createImagePubliqueLayer();
    imagePubliqueLayer.setVisible(false);
    window.imagePubliqueLayer = imagePubliqueLayer;

    // Prépare la couche TeFenua:SHOM
    var shomLayer = createShomLayer();
    shomLayer.setVisible(false);
    window.shomLayer = shomLayer;

    // Prépare la couche TeFenua
    var tefenuaLayer = createTeFenuaLayer();
    tefenuaLayer.setVisible(false);
    window.tefenuaLayer = tefenuaLayer;

    // Prépare la vue de la carte
    // http://openlayers.org/en/master/apidoc/ol.View.html
    var mapView = new ol.View({
        center: [-149.544155, -17.526540],
        zoom: 16,
        projection: ol.proj.get("EPSG:4326"),
        // resolutions: tefenuaLayer.getSource().getTileGrid().getResolutions()
    });

    // Prépare la carte OpenLayers
    // http://openlayers.org/en/master/apidoc/ol.Map.html
    var map = new ol.Map({
        // N'afficher aucun contrôle
        controls: [],
        // Couche de la carte
        layers: [
            markerLayer,
            googleLayer,
            tefenuaLayer,
            shomLayer,
            imagePubliqueLayer
        ],
        // ID de l'élément où afficher la carte
        target: "company_map_canvas",
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

    // Affiche l'emplacement cliqué dans la console
    map.on("click", function (ev) {
        console.log("clicked @:", ev.coordinate);
    });
});
