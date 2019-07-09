/**
 * Créé une couche Google Maps
 * @return {*}
 */
function createGoogleLayer() {
    var extent = ol.proj.transformExtent([-180, -85, 180, 85], "EPSG:4326", "EPSG:3857");
    var tileSize = [512, 512];
    var googleApiKey = "AIzaSyCNBWVLIdFsSF27OFGM1tmpDzc5qrz7U6Y";
    var resolutions = [
        156543.03390625,
        78271.516953125,
        39135.7584765625,
        19567.87923828125,
        9783.939619140625,
        4891.9698095703125,
        2445.9849047851562,
        1222.9924523925781,
        611.4962261962891,
        305.74811309814453,
        152.87405654907226,
        76.43702827453613,
        38.218514137268066,
        19.109257068634033,
        9.554628534317017,
        4.777314267158508,
        2.388657133579254,
        1.194328566789627,
        0.5971642833948135,
        0.2986,
        0.1493
    ];

    // http://openlayers.org/en/master/apidoc/ol.layer.Tile.html
    return new ol.layer.Tile({
        maxZoom: 20,
        zIndex: 1,
        source: new ol.source.TileImage({
            projection: "EPSG:3857",
            // attributions: [
            //     new ol.Attribution({html: "© Google"}),
            //     new ol.Attribution({html: "<a href='https://www.google.com/intl/fr_us/help/terms_maps.html'>Conditions</a>"})
            // ],
            tileGrid: new ol.tilegrid.TileGrid({
                extent: extent,
                tileSize: tileSize,
                resolutions: resolutions
            }),
            tileUrlFunction(tileCoord, pixelRatio, projection) {
                var zoom = tileCoord[0];
                var tileGrid = this.getTileGrid();
                var tileExtent = tileGrid.getTileCoordExtent(tileCoord);
                var center = ol.proj.toLonLat(ol.extent.getCenter(tileExtent), projection);
                var lonLat = center[1] + "," + center[0];
                return "https://maps.googleapis.com/maps/api/staticmap?" + [
                    "center=" + encodeURIComponent(lonLat),
                    "zoom=" + zoom,
                    "size=" + encodeURIComponent(tileSize.join('x')),
                    "maptype=" + encodeURIComponent("road"),
                    "key=" + encodeURIComponent(googleApiKey),
                ].join("&");
            }
        })
    });
}

/**
 * Créé une couche TeFenua:IMAGE_PUBLIQUE
 * @return {ol.layer.Tile}
 */
function createImagePubliqueLayer() {
    // Définit les résolutions pour chaque niveau de zoom de la carte
    var resolutions = getTeFenuaMapResolutions();

    // Prépare les IDs des matrices de tuiles
    var matrixIds = [];
    for (var i = 0; i < resolutions.length; i++) {
        matrixIds.push("EPSG:4326:" + i);
    }

    // Prépare la couche TeFenua
    // http://openlayers.org/en/master/apidoc/ol.layer.Tile.html
    return new ol.layer.Tile({
        zIndex: 3,
        // http://openlayers.org/en/master/apidoc/ol.source.WMTS.html
        source: new ol.source.WMTS({
            url: "https://www.tefenua.gov.pf/tefenua/api/wmts",
            format: "image/png8",
            layer: "TEFENUA:IMAGE_PUBLIQUE",
            style: "",
            matrixSet: "EPSG:4326",
            projection: ol.proj.get("EPSG:4326"),
            // Configuration des requêtes WMTS
            tileGrid: new ol.tilegrid.WMTS({
                extent: [
                    -154.733714,
                    -27.677721599999998,
                    -134.8043528,
                    -7.940562
                ],
                matrixIds: matrixIds,
                origin: [-180, 90],
                resolutions: resolutions,
                tileSize: 256
            })
        })
    });
}

/**
 * Créé une couche TeFenua:SHOM
 * @return {ol.layer.Tile}
 */
function createShomLayer() {
    // Définit les résolutions pour chaque niveau de zoom de la carte
    var resolutions = getTeFenuaMapResolutions();

    // Prépare les IDs des matrices de tuiles
    var matrixIds = [];
    for (var i = 0; i < resolutions.length; i++) {
        matrixIds.push("EPSG:4326:" + i);
    }

    // Prépare la couche TeFenua
    // http://openlayers.org/en/master/apidoc/ol.layer.Tile.html
    return new ol.layer.Tile({
        zIndex: 3,
        // http://openlayers.org/en/master/apidoc/ol.source.WMTS.html
        source: new ol.source.WMTS({
            url: "https://www.tefenua.gov.pf/tefenua/api/wmts",
            format: "image/png8",
            layer: "TEFENUA:CarteSHOM",
            "attributions": "© SHOM - 2016 <img src='images/shom.png' alt='© SHOM - 2016' width='36' height='36'> ",
            style: "",
            matrixSet: "EPSG:4326",
            projection: ol.proj.get("EPSG:4326"),
            // Configuration des requêtes WMTS
            tileGrid: new ol.tilegrid.WMTS({
                extent: [
                    -178.7274413804021,
                    -34.251424180642644,
                    -117.94891663814006,
                    0.1772407522678508
                ],
                matrixIds: matrixIds,
                origin: [-180, 90],
                resolutions: resolutions,
                tileSize: 256
            })
        })
    });
}

/**
 * Créé une couche TeFenua
 * @return {ol.layer.Tile}
 */
function createTeFenuaLayer() {
    // Définit les résolutions pour chaque niveau de zoom de la carte
    var resolutions = getTeFenuaMapResolutions();

    // Prépare les IDs des matrices de tuiles
    var matrixIds = [];
    for (var i = 0; i < resolutions.length; i++) {
        matrixIds.push("EPSG:4326:" + i);
    }

    // Prépare la couche TeFenua
    // http://openlayers.org/en/master/apidoc/ol.layer.Tile.html
    return new ol.layer.Tile({
        zIndex: 2,
        // http://openlayers.org/en/master/apidoc/ol.source.WMTS.html
        source: new ol.source.WMTS({
            url: "https://www.tefenua.gov.pf/tefenua/api/wmts",
            format: "image/jpeg",
            layer: "TEFENUA:FOND",
            style: "",
            matrixSet: "EPSG:4326",
            projection: ol.proj.get("EPSG:4326"),
            // Configuration des requêtes WMTS
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
}

/**
 * Retourne les résolutions pour chaque niveau de zoom de la carte Tefenua
 * @return {number[]}
 */
function getTeFenuaMapResolutions() {
    return [
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
}

/**
 * Convertit un objet de coordonnées Google
 * en objet de coordonnées OpenLayers.
 * @param coordinate
 * @return {*[]}
 */
function googleCoordToOlCoord(coordinate) {
    return [
        coordinate.lng(),
        coordinate.lat()
    ];
}

/**
 * Convertit un objet de coordonnées OpenLayers
 * en objet de coordonnées Google.
 * @param coordinate
 * @return {{lat: *, lng: *}}
 */
function olCoordToGoogleCoord(coordinate) {
    return {
        lat: coordinate[1],
        lng: coordinate[0]
    }
}
