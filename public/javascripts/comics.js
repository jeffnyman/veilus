/*$(document).ready(function() {
    $('#comic-list').dataTable( {
        "sPaginationType": "full_numbers"
    }).columnFilter({
        aoColumns: [
            { type: "text" },
            { type: "text" },
            { type: "text" },
            { type: "text" },
            { type: "select", values: [ 'Marvel Comics', 'DC Comics', 'Dark Horse Comics', 'Imagic Comics' ] },
        ]
    });
});*/

$(document).ready(function() {
    $.validator.setDefaults({ errorClass: "val-error" });

    $.validator.addMethod("valid_publisher", (function(value) {
        return value !== "-- Select a Publisher --";
    }), "You must select one of the publishers.");

    $.validator.addMethod("date_format", (function(value) {
        form_date = (/^\d{1,2}\/\d{1,2}\/\d{4}$/);
        if (form_date.test(value)) {
            var date_data = value.split('/');
            var mm = parseInt(date_data[0], 10);
            var dd = parseInt(date_data[1], 10);
            var yyyy = parseInt(date_data[2], 10);
            var new_date = new Date(yyyy,mm-1,dd);
            if ( ( new_date.getFullYear() === yyyy ) && ( new_date.getMonth() === mm - 1 ) && ( new_date.getDate() === dd ) ) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }), "Make sure your date format is in mm/dd/yyyy format.");

    $('#comicForm').validate({
        rules: {
            series: {
                required: true
            },
            volume: {
                required: true,
                digits: true,
                range: [0, 10]
            },
            name: {
                required: true
            },
            issue: {
                required: true,
                number: true
            },
            publisher: {
                valid_publisher: true
            },
            cover_date: {
                date_format: true
            }
        }, // end rules

        messages: {
            series: {
                required: "You must specify a comic series."
            },
            volume: {
                required: "You must specify a comic volume.",
                digits: "The volume can only be numeric.",
                range: "Volumes can be between 0 and 10, inclusive."
            },
            name: {
                required: "You must specify a comic name."
            },
            issue: {
                required: "You must specify an issue number.",
                number: "The issue number can only be a number."
            }
        }, // end messages

        errorPlacement: function(error, element) {
            error.insertAfter(element);
        }
    });
});

$(document).ready(function() {
    $('input.comic-date').datepicker({
        inline: true,
        showOtherMonths: true,
        dayNamesMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    });
});
