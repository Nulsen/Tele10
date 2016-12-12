$(document).ready(function() {
    function configureWaypoints() {
        var waypoint = new Waypoint({
            element: document.body,
            offset: 0,
            handler: function(direction) {
                $('#hero .caption, #hero .discover').addClass('triggered');
            }
        });
    }

    configureWaypoints();
});
