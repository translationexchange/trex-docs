(function ($, window, document) {
    var $breadcrumbs = $('.tx-breadcrumbs'),
        $categories = $('.tx-quick-guide-categories'),
        $description = $('.page-description'),
        $platforms = $('.tx-quick-guide-platforms'),
        quickGuideHash = '#quick-guide-';

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

        if (hash && hash.match(new RegExp(quickGuideHash))) {
            var type = window.location.hash.replace(quickGuideHash, '');
            return showPlatforms(type);
        }

        $categories.fadeIn();
    }

    function reset() {
        hidePlatforms();
        $breadcrumbs.hide();
        $categories.fadeIn();
        // remove hash
        window.history.pushState('', document.title, window.location.pathname);
    }

    function wire() {
        $categories.on('click', function (e) {
            var $li = $(e.target).closest('li'),
                type = $li.data('type');

            showPlatforms(type);

            window.location.hash = quickGuideHash + type;
        });

        $breadcrumbs.on('click', function (e) {
            var action = $(e.target).data('action');

            switch (action) {
                case 'home':
                    e.preventDefault();
                    reset();
                    break;
            }
        });

        window.onhashchange = function () {
            if (window.location.hash) return;
            reset();
        };
    }

    init();
    wire();
})(jQuery, window, document);
