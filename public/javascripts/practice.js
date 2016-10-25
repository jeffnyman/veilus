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

// Used for the target button JavaScript events
$(document).ready(function() {
    function hide() {
        document.getElementById("target").style.display="none";
    }

    function unhide() {
        document.getElementById("target").style.display="inline";
    }

    function addDiv() {
        var button = document.createElement("input");
        button.setAttribute("type", "button");
        button.setAttribute("value", "New Button");
        button.setAttribute("id", "new_button");
        document.getElementById("dynamic_buttons").appendChild(button)
    }

    function removeDiv() {
        var button = document.getElementById("new_button");
        document.getElementById("dynamic_buttons").removeChild(button)
    }

    $("#hideButton").click(function() {
        setTimeout(function() {hide();}, 2000);
    });

    $("#unhideButton").click(function() {
        setTimeout(function() {unhide();}, 2000);
    });

    $("#createButton").click(function() {
        setTimeout(function() {addDiv();}, 2000);
    });

    $("#removeButton").click(function() {
        setTimeout(function() {removeDiv();}, 2000);
    });
});

// Used for the DOM buttons.
$(document).ready(function() {
    $("#long").click(function(){
        modifySubtree('container1', 5, 1000);
    });

    $("#quick").click(function(){
        modifySubtree('container1', 20, 100);
    });

    $("#stale").click(function(){
        modifySubtree('container2', 20, 100); staleDiv('container1', 'container2');
    });

    $("#fade").click(function(){
        fadeIn('spanContainer', 0);
    });

    function modifySubtree(id, number, timeout) {
        var timer = setInterval(function() {
            var div = document.getElementById(id);
            var span = document.createElement("span");
            span.innerHTML = "Hail Hydra";
            div.appendChild(span);
            div.appendChild(document.createElement("br"));
        }, timeout);

        setTimeout(function() {
            clearInterval(timer);
        }, number * timeout);
    }

    function staleDiv(parent_id, child_id) {
        var parent  = document.getElementById(parent_id);
        var child   = document.getElementById(child_id);
        var new_div = document.createElement("div");
        new_div.id    = child_id;
        new_div.style = 'display: block;';

        setTimeout(function() {
            parent.removeChild(child);
            parent.appendChild(new_div);
        }, 1000);
    }

    function fadeIn(id, value) {
        var el = document.getElementById(id);
        el.style.opacity = '0.' + value;
        if (value < 9) {
            value++;
            setTimeout(function() { fadeIn(id, value) }, 400);
        } else {
            el.innerHTML = 'Faded';
            return;
        }
    }
});