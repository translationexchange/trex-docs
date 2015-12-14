(function ($) {
    var $menu = $('#tx-menu');

    $menu.on('click', function (e) {
        var $el = $(e.target),
            $title = $el.closest('.panel-title'),
            $panel = $title.closest('.panel'),
            action = $el.data('action');

        $title.toggleClass('open');

        $panel.siblings().each(function () {
            $(this).find('.panel-title').removeClass('open');
        });

        switch (action) {
            case 'title':
                e.preventDefault();
                break;
        }
    });
})(jQuery);
