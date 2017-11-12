$.fn.accordion = function() {
    const $items = $(this).find('.item');

    $items.each((i, el) => {
        const $item = $(el);
        const $title = $item.find('.title');
        const $content = $item.find('.content');

        $title.click((e) => {
            if ($(e.target).data('modal')) {
                return;
            }
            
            $items.not($item).removeClass('active');
            $items.not($item).find('.content').each((index, element) => {
                $(element).stop().animate({
                    height: 0
                }, 300);
            });

            if ($item.hasClass('active')) {
                $item.removeClass('active');
                $content.stop().animate({
                    height: 0
                }, 300);
            } else {
                $item.addClass('active');
                $content.stop().animate({
                    height: $content.actualSize().height
                }, 300);
            }
        });
    });
}
