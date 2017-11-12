$.fn.actualSize = function() {
    const previousCss = $(this).attr('style');

    $(this).css({
        position: 'absolute',
        visibility: 'hidden',
        height: 'auto',
        width: 'auto',
        display: 'block'
    });

    const size = {
        width: $(this).width(),
        cssWidth: parseFloat($(this).css('width')),
        outerWidth: $(this).outerWidth(),
        innerWidth: $(this).innerWidth(),
        height: $(this).height(),
        cssHeight: parseFloat($(this).css('height')),
        outerHeight: $(this).outerHeight(),
        innerHeight: $(this).innerHeight()
    }

    $(this).attr('style', previousCss ? previousCss : '');

    return size;
}
