$(document).ready(function() {
    function is_touch_device() {
        return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
    }

    function configureWaypoints() {
        new Waypoint({
            element: document.getElementById('products-services'),
            offset: $('#hero').outerHeight() - 100,
            handler: function() {
                $('#navbar').toggleClass('active');
            }
        });

        new Waypoint({
            element: document.body,
            offset: 0,
            handler: function() {
                $('#hero .caption, #hero .discover').addClass('triggered');
            }
        });

        new Waypoint({
            element: document.getElementById('customers'),
            offset: '90%',
            handler: function() {
                $('#customers .img-container').addClass('triggered');
            }
        });
    }

    function initSkrollr() {
        var s = null;

        if (window.outerWidth >= 992 && !is_touch_device()) {
            s = skrollr.init();
        }

        $(window).on('resize', function() {
            if (is_touch_device() && s) {
                s.destroy();
                s = null;
            } else if (window.outerWidth >= 992 && !is_touch_device() && !s)
                s = skrollr.init();
        });
    }

    function initScrollTo() {
        var navHeight = $('#navbar').outerHeight();

        $('#navbar [data-scroll]').click(function(e) {
            e.preventDefault();

            var $el = $(this);
            var data = $(this).data('scroll');
            var offset = $(data).offset().top - navHeight;

            $('html, body').stop().animate({
                scrollTop: offset
            }, 500);
        });
    }

    function initNavScrollSpy() {
        var navHeight = $('#navbar').outerHeight();

        $('#navbar .scrollspy').each(function(index, el) {
            var data = $(this).data('scroll');
            var offset = $(data).offset().top - navHeight;

            $(this).scrollspy({
                min: offset ,
                max: offset + $(data).outerHeight() - 1,
                onEnter: function() {
                    $(el).addClass('active');
                },
                onLeave: function() {
                    $(el).removeClass('active');
                }
            });
        });

        $(window).trigger('scroll');
    }

    configureWaypoints();
    initSkrollr();
    initScrollTo();
    initNavScrollSpy();
});
