$(document).ready(function() {
    $('#read-more').click(function(e) {
        e.preventDefault();

        $('html, body').stop().animate({
            scrollTop: $('.pitch').offset().top - 59
        }, 500);
    });

    $('.nav .button').click(function(e) {
        e.preventDefault();

        $('.nav ul').toggleClass('active');
    });

    if (window.location.pathname == '/anvandartjanster') {
        $('.nav [href="/anvandartjanster#mobile"]').click(function(e) {
            e.preventDefault();

            $('.nav ul').removeClass('active');

            $('html, body').stop().animate({
                scrollTop: $('#mobile').offset().top - 59
            }, 500);
        });
    }

    $('.nav .item').not('.dropdown').click(function(e) {
        if (!$(e.target).is('a')) {
            var href = $(this).find('a').attr('href');
            window.location.href = href;
        }
    });

    $('.contact form').submit(function(e) {
        e.preventDefault();

        const $message = $(e.target).find('.success:visible, .error:visible');

        $(this).find('button').addClass('disabled');

        if ($message.length) {
            $message.slideUp().promise().then(function() {
                postForm($(e.target));
            });
        } else {
            postForm($(e.target));
        }
    });

    function postForm($form) {
        $.post($form[0].action, $form.serialize()).then(function(response) {
            $form[0].reset();
            $form.find('.success').html(response).slideDown();
        }).fail(function(err) {
            $form.find('.error').html(err.responseText).slideDown();
        }).done(function() {
            $form.find('button').removeClass('disabled');
        });
    }

    $('.accordion').accordion();
});