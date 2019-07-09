document.addEventListener("DOMContentLoaded", function () {

    // Définit la carte actuellement visible
    window.currentMap = "google";

    var buttons = $(".company-heading-view .button-content button");

    buttons.on("click", function (ev) {
        var button = ev.currentTarget;

        // Définit la carte actuelle, utile pour éviter les cascades d'évènements.
        // ex: on déplace la carte google, ce qui met à jour la carte TeFenua, qui met à jour la carte Google...
        if (button.dataset && button.dataset.map) {
            window.currentMap = button.dataset.map;
        }

        // Simule le comportement du script actuel de zuckoo pour basculer d'une carte à l'autre
        var index = $(ev.currentTarget).index() - 1;
        var slideContent = $(".company-slider-content").children();

        // Met à jour le bouton actif
        buttons.removeClass("active");
        $(ev.currentTarget).addClass("active");

        // Cache les slides
        slideContent.css({
            left: "-100%"
        });

        // Affiche la bonne slide
        slideContent.eq(index).css({
            left: "0"
        });
    });

    // Affiche la carte par défaut
    buttons.filter("[data-map='" + window.currentMap + "']").click();
});
