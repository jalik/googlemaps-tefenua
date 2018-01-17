document.addEventListener("DOMContentLoaded", function () {
    var buttons = $(".company-heading-view .button-content button");

    buttons.on("click", function (ev) {
        var button = ev.currentTarget;

        // Simule le comportement du script actuel de zuckoo pour basculer d'une carte à l'autre
        var index = $(ev.currentTarget).index() - 1;
        var slideContent = $(".company-slider-content").children();

        // Met à jour le bouton actif
        buttons.removeClass("active");
        $(ev.currentTarget).addClass("active");

        // Bascule l'affichage d'une couche
        if (button.dataset && button.dataset.map) {
            var layer = button.dataset.map;

            if (layer === "google") {
                // Affiche la couche Google uniquement
                window.googleLayer.setVisible(true);
                window.imagePubliqueLayer.setVisible(false);
                window.shomLayer.setVisible(false);
                window.tefenuaLayer.setVisible(false);
                return;// intercepte le changement de slide
            }
            else if (layer === "image_publique") {
                // Affiche la couche IMAGE_PUBLIQUE uniquement
                window.imagePubliqueLayer.setVisible(true);
                window.googleLayer.setVisible(false);
                window.shomLayer.setVisible(false);
                window.tefenuaLayer.setVisible(false);
                return;// intercepte le changement de slide
            }
            else if (layer === "shom") {
                // Affiche la couche SHOM uniquement
                window.shomLayer.setVisible(true);
                window.googleLayer.setVisible(false);
                window.imagePubliqueLayer.setVisible(false);
                window.tefenuaLayer.setVisible(false);
                return;// intercepte le changement de slide
            }
            else if (layer === "tefenua") {
                // Affiche la couche TeFenua uniquement
                window.tefenuaLayer.setVisible(true);
                window.googleLayer.setVisible(false);
                window.imagePubliqueLayer.setVisible(false);
                window.shomLayer.setVisible(false);
                return;// intercepte le changement de slide
            }
        }

        // Cache les slides
        slideContent.css({
            left: "-100%"
        });

        // Affiche la bonne slide
        slideContent.eq(index).css({
            left: "0"
        });
    });
});
