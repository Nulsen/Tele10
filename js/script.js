$(document).ready(function() {
    $('#read-more').click(function(e) {
        e.preventDefault();

        $('html, body').stop().animate({
            scrollTop: $('.pitch').offset().top
        }, 500);
    });

    $('.clients .logos img').click(function() {
        if ($(this).hasClass('active') || window.innerWidth < 768) {
            return;
        }

        $('.clients .logos .active').removeClass('active');
        $(this).parent().addClass('active');

        const index = parseInt($(this).data('quote'), 10);

        $('.clients .quotes .active').stop().fadeOut(function() {
            $('.clients .quotes .active').removeClass('active');
            $('.clients .quote').eq(index - 1).addClass('active').stop().fadeIn();
        });
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
});
