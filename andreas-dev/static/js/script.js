$(document).ready(function() {
    $(".show-button").click(function() {
        console.log("TEST");
        $(this).hide();
        $(".hide-button").show();
        $(".menu").show();
    });
    $(".hide-button").click(function() {
        $(this).hide();
        $(".show-button").show();
        $(".menu").hide();
    });
});
