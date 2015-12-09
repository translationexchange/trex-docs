(function ($) {
    var $breadcrumbs = $('.tx-breadcrumbs'),
        $categories = $('.tx-quick-guide-categories'),
        $description = $('.page-description'),
        $platforms = $('.tx-quick-guide-platforms');

    function showPlatforms(type) {
        var $selectedPlatforms = $platforms.find('li[data-type=' + type + ']'),
            $selectedCategory = $categories.find('li[data-type=' + type + ']'),
            tip = $selectedCategory.find('meta[name=platform-tip]').attr('content'),
            title = $selectedCategory.find('h5').text();

        $breadcrumbs.find('span').text(title);
        $description.text(tip);

        $categories.hide();
        $breadcrumbs.fadeIn().css('display', 'inline-block');
        $selectedPlatforms.fadeIn();
    }

    function hidePlatforms() {
        $description.text($description.data('default-text'));
        $platforms.find('li').filter(':visible').hide();
    }

    function init() {
        var hash = window.location.hash;
        if (hash && hash.match(/#platform-/)) {
            var type = window.location.hash.replace('#platform-', '');
            return showPlatforms(type);
        }

        $categories.fadeIn();
    }

    function wire() {
        $categories.on('click', function (e) {
            var $li = $(e.target).closest('li'),
                type = $li.data('type');

            showPlatforms(type);

            window.location.hash = 'platform-' + type;
        });

        window.onhashchange = function () {
            if (window.location.hash) return;

            hidePlatforms();
            $breadcrumbs.hide();
            $categories.fadeIn();
        }
    }

    init();
    wire();
})(jQuery);
