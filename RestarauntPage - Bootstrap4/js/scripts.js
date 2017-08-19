$(document).ready(function() {
    $("#mycarousel").carousel({interval: 2000});
    $("#carousel-button").click(function() {
        if ($("#carousel-button").children("span").hasClass("fa-pause")) {
            $("#mycarousel").carousel('pause');
            $("#carousel-button").children("span").removeClass("fa-pause").addClass("fa-play");
        } else {
            $("#mycarousel").carousel('cycle');
            $("#carousel-button").children("span").removeClass("fa-play").addClass("fa-pause");
        }
    });
    $("#login").click(function() {
        $("#loginModal").modal("show");
    });

    $("#reserveTable").click(function() {
        $("#reserveModal").modal("show");
    });
});