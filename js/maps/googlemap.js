// Ce fichier permet d'initialiser la carte Google
// via le SDK de Google.

// Initialise la carte Google quand le DOM est prêt
document.addEventListener("DOMContentLoaded", function () {
    // Prépare la carte Google
    var map = new google.maps.Map(document.getElementById("company_map_canvas"), {
        center: {lat: -17.526540, lng: -149.544155},
        zoom: 16
    });

    // Expose la carte Google globalement
    window.googleMap = map;

    // Ajoute un marqueur sur la carte
    new google.maps.Marker({
        position: map.getCenter(),
        map: map
    });

    // Synchronise la carte TeFenua avec la carte Google
    // quand on déplace la carte Google.
    map.addListener("center_changed", function () {
        if (window.tefenuaMap && window.currentMap === "google") {
            var tefenuaView = window.tefenuaMap.getView();
            tefenuaView.setCenter(googleCoordToOlCoord(map.getCenter()));
        }
    });

    // Synchronise la carte TeFenua avec la carte Google
    // quand on zoome sur la carte Google.
    map.addListener("zoom_changed", function () {
        if (window.tefenuaMap && window.currentMap === "google") {
            var tefenuaView = window.tefenuaMap.getView();
            tefenuaView.setZoom(map.getZoom());
        }
    });

    // Affiche l'emplacement cliqué dans la console
    map.addListener("click", function () {
        var coordinate = googleCoordToOlCoord(map.getCenter());
        console.log("clicked @:", coordinate);
    });
});
