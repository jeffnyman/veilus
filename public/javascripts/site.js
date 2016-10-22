$(document).ready(function() {
    // Position the areas panel
    //$('#areas').show().delay(500).animate({left:'-48em'},250).animate({left:'-51em'},250);
    $('#areas').show().delay(500).animate({left:'-48em'},250).animate({left:'-50em'},250);

    // Allow the areas panel to be opened and closed
    $(".open").clickToggle(
        function () {
            $(this).text('-');
            $("#areas").animate({
                left : 0
            }, 250);
        },
        function() {
            $(this).text('+');
            $("#areas").animate({
                left : '-50em'
            }, 250);
        });
});