$.fn.clickToggle = function (func1, func2) {
    var funcs = [func1, func2];
    this.data('toggleclicked', 0);
    this.click(function () {
        var data = $(this).data();
        var tc = data.toggleclicked;
        $.proxy(funcs[tc], this)();
        data.toggleclicked = (tc + 1) % 2;
    });
    return this;
};

$(document).ready(function() {
    // Handle the login form
    $('#open').clickToggle(
        function () {
            $('#login form').slideDown(300);
            $(this).addClass('close');
        },

        function () {
            $('#login form').fadeOut(600);
            $(this).removeClass('close');
        });
});
