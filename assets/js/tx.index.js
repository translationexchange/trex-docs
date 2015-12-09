(function ($) {
    var $breadcrumbs = $('.tx-breadcrumbs'),
        $categories = $('.tx-quick-guide-categories'),
        $description = $('.page-description'),
        $platforms = $('.tx-quick-guide-platforms');

    function showPlatforms(about) {
        var $selectedPlatforms = $platforms.find('[data-about=' + about + ']'),
            $selectedCategory = $categories.find('li[data-about=' + about + ']'),
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

    function setData() {
        var $li = $(this),
            about = $li.data('tags').match(/about\-[a-z\-]+/)[0];
        $li.attr('data-about', about);
    }

    function init() {
        $categories.find('li').each(setData);

        $platforms.find('li').each(setData);

        if (window.location.hash) {
            var about = window.location.hash.replace('#', '');
            return showPlatforms('about-' + about);
        }

        $categories.fadeIn();
    }

    function wire() {
        $categories.on('click', function (e) {
            var $li = $(e.target).closest('li'),
                about = $li.data('about');

            showPlatforms(about);

            window.location.hash = about.replace('about-', '');
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
