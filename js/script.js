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

        console.log(1, 'Submitting');

        console.log(2.1, 'Slide up visible messages');

        $(e.target).find('.success:visible, .error:visible').text('').slideUp(() => {
            console.log(2.2, 'Slide up visible messages completed');
        });

        console.log(3, 'Post the form');
        $.post(e.target.action, $(e.target).serialize()).then(function(response) {
            console.log(4.1, 'Success, slide down success message', response);
            $(e.target).find('.success').text(response).slideDown(() => {
                console.log(4.1, 'Completed');
            });
        }).fail(function(err) {
            console.log(4.2, 'Error, slide down error message', err);
            $(e.target).find('.error').text(err).slideDown(() => {
                console.log(4.2, 'Completed');
            });
        });
    });
});
