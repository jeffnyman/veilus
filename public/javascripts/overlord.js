timer = {
    time : 0,

    timeDisplay : function() {
        //var minutes = Math.floor(this.time / 60);
        //var seconds = this.time % 60;

        var minutes = this.padTime(Math.floor(this.time / 60), 2, '0');
        var seconds = this.padTime(this.time % 60, 2, '0');

        return minutes + ":" + seconds;
    },

    updateDisplay : function() {
        $('#timer-output').val(this.timeDisplay());
    },

    updateTimeDisplay : function(time) {
        this.time = time;
        if (time < 0) {
            window.location.reload();
        }
        this.updateDisplay();
    },

    start : function() {
        setInterval(function() {
            timer.updateTimeDisplay(timer.time - 1)
        }, 1000);
    },

    padTime : function(value, count, fill) {
        var buffer = '' + value;
        for(var idx = buffer.length; idx < count; idx++) {
            buffer = fill + buffer;
        }
        return buffer;
    }
};

trigger = {
    stack : [],

    activated_code : function() {
        return this.stack.join('');
    },

    update_display : function() {
        $('#trigger-code').val(this.activated_code());
        if (this.stack.length < 4) {
            $('#trigger-code-display').addClass('has-error');
        } else {
            $('#trigger-code-display').removeClass('has-error');
        }
    },

    activate : function() {
        code = this.activated_code();

        if (!code || 0 === code.length) {
            code = $('#trigger-code').val();
        }

        $.post('/set/' + timer.time, function() {
            window.location = '/enter/' + code;
        });
    },

    keypad : function(code) {
        if (this.stack.length < 4) {
            this.stack.push(code);
            this.update_display();
        }
    },

    delete : function() {
        this.stack.pop();
        this.update_display();
    }
};

$(document).ready(function() {
    $('#change-bomb-state').click(function(e) {
        trigger.activate();
    });

    // Why is this line here?
    //$.validator.setDefaults({ errorClass: "val-error" });

    $('#trigger button').click(function(e) {
        var code = e.target.getAttribute('data-value');
        trigger.keypad(code);
    });

    $('#trigger-delete').click(function(e) {
        trigger.delete();
    });

    $('#provision_bomb').validate({
        rules: {
            activation_code: {
                digits: true,
                minlength: 4,
                maxlength: 4
            },
            deactivation_code: {
                digits: true,
                minlength: 4,
                maxlength: 4
            },
            countdown_value: {
                digits: true
            }
        },
        messages: {
            activation_code: 'The activation code must be four numeric characters.',
            deactivation_code: 'The deactivation code must be four numeric characters.',
            countdown_value: 'The countdown value must be a whole number.'
        },
        errorLabelContainer: "#provision-error"
    });

    $('#provision-error').hide();

    var time_remaining = parseInt($('#timer-countdown').val());
    timer.updateTimeDisplay(time_remaining);
    if ($('#timer-started').val() == "true") {
        timer.start();
    }
});
