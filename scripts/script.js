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
            offset: '80%',
            handler: function(direction) {
                $('#customers .title').addClass('triggered');
            }
        });

        new Waypoint({
            element: document.getElementById('customers'),
            offset: '70%',
            handler: function(direction) {
                $('#customers .img-container').addClass('triggered');
            }
        });
    }

    configureWaypoints();
});
