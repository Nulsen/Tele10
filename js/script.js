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

        $(this).find('.success, .error').text('').slideUp();

        $.post(e.target.action, $(e.target).serialize()).then(function(response) {
            $(this).find('.success').text(response).slideDown();
        }).fail(function(err) {
            $(this).find('.error').text(err).slideDown();
        });
    });
});
