$(document).ready(function(){
    (function($) {
        $(function () {
            $('#nav-toggle').on('click', function() {
                $('body').toggleClass('open');
            });
        });
    })(jQuery);
});