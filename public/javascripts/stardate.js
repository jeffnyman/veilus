function calculateTOS() {
    origin = new Date("April 25, 2265 00:00:00");
    stardate = $("#stardateValue").val();

    stardatesPerYear = stardate * 60 * 60 * 24 * 365.2422 / 2.63510833;
    milliseconds = origin.getTime() + stardatesPerYear;

    result = new Date();
    result.setTime(milliseconds);

    return result;
}

function calculateTNG() {
    origin = new Date("July 5, 2318 12:00:00");
    stardate = $("#stardateValue").val();

    stardatesPerYear = stardate * 34367056.4;
    milliseconds = origin.getTime() + stardatesPerYear;

    result = new Date();
    result.setTime(milliseconds);

    return result;
}

function leapYear(year) {
    if ((year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0))) {
        return true;
    }
}

function calculateTNG_WithLeapYear() {
    stardate = $("#stardateValue").val();
    stardate = Math.abs(stardate);

    var staryear = Math.floor(stardate / 1000);
    var startime = stardate % 1000;

    var outyear = 2323 + staryear;
    var length = (leapYear(outyear)) ? 31622400 : 31536000;

    var outtime = startime * length;
    var finalyear = Date.UTC(outyear, 0, 1, 0, 0, 0);
    var finaltime = finalyear + outtime;

    var outdate = new Date();
    outdate.setTime(finaltime);
    outdate = outdate.toGMTString();

    return outdate;
}

$(document).ready(function() {
    $("#computeStardate").submit(function(e) {
        e.preventDefault();
    });

    $.validator.setDefaults({ errorClass: "val-error" });

    $("#computeStardate").validate({
        rules: {
            stardateValue: {
                required: true,
                number: true,
                minlength: 4,
                maxlength: 7
            }
        },
        messages: {
            stardateValue: {
                required: "Please supply a stardate or there is no point.",
                number: "Stardates have to be a number.",
                minlength: "Stardates must be four (TOS) or five (TNG) digits.",
                maxlength: "Stardates cannot be greater than four (TOS) or five (TNG) digits."
            }
        },
        errorLabelContainer: "#stardate-error"
    });

    $('#stardateForm').hide();

    $('#leapYearLabel').hide();
    $('#stardatesWithLeapYear').hide();

    $("#enableForm").click(function() {
        if ($("#enableForm").is(":checked")) {
            $('#stardateForm').show();

            $("#tngEra").prop("disabled", false);
            $("#tosEra").prop("disabled", false);
        } else {
            $('#stardateForm').hide();

            $("#tngEra").prop("disabled", true);
            $("#tosEra").prop("disabled", true);

            $("#tngEra").prop('checked', false);
            $("#tosEra").prop('checked', false);

            $('#leapYearLabel').hide();
            $('#stardatesWithLeapYear').hide();

            $("#stardate-instruct").text("Choose a stardate era.");

            $("#calendarValue").val("");
            $("#stardateValue").val("");
        }
    }); // enableForm.click

    $('#convert').click(function() {
        $("#calendarValue").val("");

        isvalidate = $("#computeStardate").valid();

        if (isvalidate == false) {
            $("#calendarValue").val("Invalid Date");
            return false;
        }

        if ($("#tngEra").is(":checked")) {
            if ($("#stardatesWithLeapYear").is(":checked")) {
                result = calculateTNG_WithLeapYear();
            } else {
                result = calculateTNG();
            }
        } else if ($("#tosEra").is(":checked")) {
            result = calculateTOS();
        }
        $("#calendarValue").val(result);
    }); // convert.click

    $("#tngEra").click(function() {
        $("#stardate-instruct").text("Enter TNG era stardate:");
        $("#stardateValue").val("42353.7");
        $("#calendarValue").val("");

        $('#leapYearLabel').show();
        $('#stardatesWithLeapYear').show();
    }); // tngEra.click

    $("#tosEra").click(function() {
        $("#stardate-instruct").text("Enter TOS era stardate:");
        $("#stardateValue").val("1533.7");
        $("#calendarValue").val("");

        $('#leapYearLabel').hide();
        $('#stardatesWithLeapYear').hide();
    }); // tosEra.click

    $('#addListItem').click(function() {
        var item = $("#listItem").val();
        $('#stardates').append(new Option(item, 'added', true, true));
    });

    $('#clearListItem').click(function() {
        $("#listItem").val("");
    });

    $('#deleteListItem').click(function() {
        $("#stardates option:selected").remove();
    });

    $('#moveListItemUp').click(function() {
        var $op = $('#stardates option:selected');
        if ($op.length) {
            $op.first().prev().before($op);
        }
    });

    $('#moveListItemDown').click(function() {
        var $op = $('#stardates option:selected');
        if ($op.length) {
            $op.last().next().after($op);
        }
    });
});
