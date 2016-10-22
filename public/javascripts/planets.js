$(document).ready(function() {
    $("#calculate").click(function() {
        weight = $("#wt").val();
        if (weight > 0.0) {
            $("#outputsun").val((10 * weight * 27.072) / 10);
            $("#outputmrc").val((10 * weight * .378) / 10);
            $("#outputvn").val((10 * weight * .907) / 10);
            $("#outputluna").val((10 * weight * .166) / 10);
            $("#outputmars").val((10 * weight * .377) / 10);
            $("#outputjp").val((10 * weight * 2.364) / 10);
            $("#outputsat").val((10 * weight * 1.064) / 10);
            $("#outputur").val((10 * weight * .889) / 10);
            $("#outputnpt").val((10 * weight * 1.125) / 10);
            $("#outputplt").val((10 * weight * .067) / 10);
        }
    });
});

$(document).ready(function() {
    //$('.fancybox').fancybox();

    $('#calculate').click(function() {
        $('#computeWeight').valid();
    });

    $.validator.setDefaults({ errorClass: "val-error" });

    $("#computeWeight").validate({
        rules: {
            wt: {
                required: true,
                number: true,
                min: 0.01
            }
        },
        messages: {
            wt: {
                required: "You must type a weight.",
                number: "You must type a numeric value for weight.",
                min: "The weight value must be positive."
            }
        },
        errorLabelContainer: "#weight-error"
    });
});
