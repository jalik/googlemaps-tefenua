// Initialise la carte Google quand le DOM est prêt
document.addEventListener("DOMContentLoaded", function () {
    // Prépare la carte Google
    var map = new google.maps.Map(document.getElementById("company_map_canvas"), {
        center: {lat: -17.526540, lng: -149.544155},
        zoom: 16,
    });

    // Expose la variable globalement
    window.googleMap = map;

    // Ajoute le marqueur sur la carte
    new google.maps.Marker({
        position: map.getCenter(),
        map: map
    });

    // Synchronise la carte Google quand on déplace ou zoome sur la carte TeFenua
    map.addListener("dragend", function () {
        var center = [
            map.getCenter().lng(),
            map.getCenter().lat()
        ];
        console.log("moved google map to:", center);

        if (window.tefenuaMap) {
            window.tefenuaMap.getView().setCenter(center);
            window.tefenuaMap.getView().setZoom(map.getZoom() - 1);
        }
    });

    // Affiche l'emplacement cliqué
    map.addListener("click", function () {
        var coordinate = map.getCenter();
        var lonLat = [coordinate.lng(), coordinate.lat()];
        console.log("clicked @:", lonLat);
    });
});
