// Simule le comportement du script actuel de zuckoo pour basculer d'une carte à l'autre
document.addEventListener("DOMContentLoaded", function () {
    var buttons = $(".company-heading-view .button-content button");

    buttons.on("click", function (ev) {
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
});
