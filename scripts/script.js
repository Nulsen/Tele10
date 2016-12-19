$(document).ready(function() {
    function configureWaypoints() {
        new Waypoint({
            element: document.body,
            offset: 0,
            handler: function(direction) {
                $('#hero .caption, #hero .discover').addClass('triggered');
            }
        });

        new Waypoint({
            element: document.getElementById('customers'),
            offset: '90%',
            handler: function(direction) {
                $('#customers .img-container').addClass('triggered');
            }
        });

        new Waypoint({
            element: document.getElementById('products'),
            offset: '70%',
            handler: function(direction) {

            }
        });
    }

    function initSkrollr() {
        var s = null;

        if (window.outerWidth > 991)
            s = skrollr.init();

        $(window).on('resize', function() {
            if (window.outerWidth < 990 && s) {
                s.destroy();
                s = null;
            } else if (window.outerWidth > 991 && !s)
                s = skrollr.init();
        });
    }

    configureWaypoints();
    initSkrollr();
});
