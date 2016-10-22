$(document).ready(function() {

    var A = 0.036528749373;
    var n = 1.79522947028;

    function u(x) {
        return ( x <= 0 ) ? 0 : 1;
    }

    function WtoV(w) {
        var uw = u( w - 9 );
        var pw = ( uw == 0 ) ? 0 : (uw * A * Math.pow( -Math.log(10-w), n ));
        return Math.pow( w, 10/3 + pw );
    }

    function VtoW(v) {
        var min =  0;
        var max = 10;
        var epsilon = 0.00001;
        var iterations = 10000;

        for( var count = 1; count <= iterations &&  max - min > epsilon; count++ )
        {
            var test = ( max + min ) / 2;
            var vtest = WtoV( test );

            if( vtest > v ) {
                max = test;
            } else {
                min = test;
            }
        }

        return max;
    }

    function roundTo(n, digits) {
        var mult = Math.pow( 10, digits );
        return Math.round( n * mult ) / mult;
    }

    function formatTime(t) {
        if( t < 60 )
            return roundTo( t, 2 ) + " seconds";
        else if( t < 60*60 )
            return roundTo( t/60, 2 ) + " minutes";
        else if( t < 60*60*24 )
            return roundTo( t/(60*60), 2 ) + " hours";
        else if( t < 60*60*24*365.25 )
            return roundTo( t/(60*60*24), 2 ) + " days";
        else
            return roundTo( t/(60*60*24*365.25), 2 ) + " years";
    }

    function updateTravelTimes(v) {
        var Seconds_Per_Year = 60*60*24*365.25;
        var LY_AU = 1.581281215151339E-5;

        travelAU.textContent     = formatTime(  LY_AU / v * Seconds_Per_Year );
        travelLY.textContent     = formatTime(      1 / v * Seconds_Per_Year );
        travelSector.textContent = formatTime(     20 / v * Seconds_Per_Year );
        travelGalaxy.textContent = formatTime( 100000 / v * Seconds_Per_Year );
        travelUser.textContent   = formatTime( $("#distInput").val() / v * Seconds_Per_Year );
    }

    function distChange() {
        updateTravelTimes($("#velocityInput").val());
    }

    function velocityChange() {
        $("#warpInput").val( Math.round( VtoW( $("#velocityInput").val() ) * 100000 ) / 100000 );
        updateTravelTimes($("#velocityInput").val());
    }

    function warpChange() {
        $("#velocityInput").val( Math.round(WtoV($("#warpInput").val() )) );
        updateTravelTimes($("#velocityInput").val());
    }

    $("#distInput").focusin(function() {
        $(this).select();
    });

    $("#distInput").mouseenter(function() {
        $(this).select();
    });

    $("#distInput").keyup(function() {
        distChange();
    });

    $("#warpInput").focusin(function() {
        $(this).select();
    });

    $("#warpInput").mouseenter(function() {
        $(this).select();
    });

    $("#warpInput").keyup(function() {
        warpChange();
    });

    $("#velocityInput").focusin(function() {
        $(this).select();
    });

    $("#velocityInput").mouseenter(function() {
        $(this).select();
    });

    $("#velocityInput").keyup(function() {
        velocityChange();
    });

    $("#warpFactor").tablesorter();
});
