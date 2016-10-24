// Used for toggling fields on the signup form.
$(document).ready(function() {
    $("#toggleAllTech").click(function() {
        if ($("#toggleAllTech").is(":checked")) {
            $("#eigenstate").removeAttr("disabled");
            $("#eigen").text("(Currently Enabled)");
        } else {
            $("#eigenstate").attr("disabled", true);
            $("#eigenstate").removeAttr('checked');
            $("#eigen").text("(Currently Disabled)");
        }
    });

    $("#toggleAllVapo").click(function() {
        if ($("#toggleAllVapo").is(":checked")) {
            $("#cme").removeAttr("disabled");
            $("#coronal").text("(Currently Enabled)");
        } else {
            $("#cme").attr("disabled", true);
            $("#cme").attr("checked", false);
            $("#coronal").text("(Currently Disabled)");
        }
    });

    $("#toggleSith").click(function() {
        if ($("#toggleSith").is(":checked")) {
            $("#sith").removeAttr("disabled");
        } else {
            $("#sith").attr("disabled", true);
        }
    });
});

// Used for the validation of the signup form.
$(document).ready(function() {
    $('#signup').validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                rangelength: [8,16]
            },
            confirm_password: {
                equalTo: "#password"
            }
        }, // end rules
        messages: {
            email: {
                required: "Please supply an email address.",
                email: "This is not a valid email address."
            },
            password: {
                required: "Please type a password.",
                rangelength: "Password must be between 8 and 16 characters long."
            },
            confirm_password: {
                equalTo: "The two passwords do not match."
            }
        }, // end messages
        errorPlacement: function(error, element) {
            if (element.is(":radio") || element.is(":checkbox")) {
                error.appendTo(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    }); // end validate
}); // end ready

// Used for drag and drop
$(document).ready(function() {
    $("#draggable").draggable();
    $("#droppable").droppable({
        drop: function(event, ui) {
            $(this).addClass('ui-state-highlight').find('p').html('Dropped!');
            $('body').off();
        }
    });
});