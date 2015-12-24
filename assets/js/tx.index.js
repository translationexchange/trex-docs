(function ($, window, document) {
    var $breadcrumbs = $('.tx-breadcrumbs'),
        $categories = $('.tx-quick-guide-categories'),
        $description = $('.tx-page-description'),
        $platforms = $('.tx-quick-guide-platforms'),
        cache = { categories: [], platforms: [] },
        quickGuideHash = '#quick-guide-';

    var breadcrumbs = {
        separator: '<i>></i>',
        add: function (title, link, type) {
            var item = link
                ? '<a href="' + link + '" data-type="' + type + '">' + title + '</a>'
                : '<span data-type="' + type + '">' + title + '</span>';

            $breadcrumbs.append(breadcrumbs.separator + item);
        },
        addCategory: function (category) {
            var type = 'category';
            breadcrumbs.reset();
            breadcrumbs.add(categories.getTitle(category), quickGuideHash + category, type);
        },
        addPlatform: function (category, platform) {
            var type = 'platform';
            breadcrumbs.addCategory(category);
            breadcrumbs.add(platforms.getTitle(platform), hash.addSlug(platform), type);
        },
        hide: function () {
            $breadcrumbs.hide();
        },
        show: function () {
            $breadcrumbs.show().css('display', 'inline-block');
        },
        remove: function ($el) {
            // remove icon
            $el.prev().remove();
            // remove element
            $el.remove();
        },
        reset: function () {
            $breadcrumbs.find('a,span').each(function () {
                var $el = $(this);
                if ($el.data('type') !== 'home') breadcrumbs.remove($el);
            });
        },
        wire: function () {
            $breadcrumbs.on('click', function (e) {
                var type = $(e.target).data('type');

                switch (type) {
                    case 'category':
                        break;
                    case 'home':
                        e.preventDefault();
                        ui.reset();
                        break;
                    case 'platform':
                        break;
                }
            });
        }
    };

    var categories = {
        $active: null,
        activeSlug: null,
        cache: function () {
            $categories.find('li').each(function () {
                cache.categories.push($(this).data('slug'));
            });
        },
        getActive: function (slug) {
            if (!categories.$active || categories.activeSlug !== slug) categories.update(slug);
            return categories.$active;
        },
        getPlatformTip: function(slug) {
            return categories.getActive(slug).data('platform-tip');
        },
        getTitle: function (slug) {
            return categories.getActive(slug).find('.tx-label').text();
        },
        hide: function () {
            $categories.hide();
        },
        show: function () {
            // hide skip button
            description.hideSkip();
            // show cats
            $categories.show();
        },
        update: function (slug) {
            categories.$active = $categories.find('[data-slug=' + slug + ']');
            categories.activeSlug = slug;
        },
        wire: function () {
            $categories.on('click', function (e) {
                var slug = $(e.target).closest('li').data('slug');
                hash.replace(quickGuideHash + slug);
            });
        }
    };

    var platforms = {
        $active: null,
        activeSlug: null,
        cache: function () {
            $platforms.find('li').each(function () {
                cache.platforms.push($(this).data('slug'));
            });
        },
        getActive: function (slug) {
            if (!platforms.$active || platforms.activeSlug !== slug) platforms.update(slug);
            return platforms.$active;
        },
        getApiPreference: function (slug) {
            return platforms.getActive(slug).data('api-preference');
        },
        getTitle: function (slug) {
            return platforms.getActive(slug).find('.tx-label').text();
        },
        hide: function () {
            $platforms.find('li').filter(':visible').hide();
        },
        show: function (category) {
            var $selectedPlatforms = $platforms.find('[data-category-slug=' + category + ']');

            // hide categories
            categories.hide();
            // update breadcrumbs
            breadcrumbs.addCategory(category);
            // update page description
            description.update(categories.getPlatformTip(category));
            // update url hush
            hash.replace(quickGuideHash + category);
            // hide skip button
            description.hideSkip();
            // show breadcrumbs
            breadcrumbs.show();
            // show platforms container if hidden
            if (!$platforms.is(':visible')) $platforms.show();
            // hide all visible platforms
            platforms.hide();
            // show selected platforms
            $selectedPlatforms.show();
        },
        showApi: function (category, platform) {
            var $selectedPlatforms = $platforms.find('[data-api]');

            // hide categories
            categories.hide();
            // update breadcrumbs
            breadcrumbs.addPlatform(category, platform);
            // update page description
            description.update(null, 'api-tip');
            // update url hush
            hash.replace(hash.addSlug(platform));
            // show skip button if required
            if (platforms.getApiPreference(platform) === 'optional') description.showSkip(platform);
            // show breadcrumbs
            breadcrumbs.show();
            // show platforms container if hidden
            if (!$platforms.is(':visible')) $platforms.show();
            // hide all visible platforms
            platforms.hide();
            // show selected platforms
            $selectedPlatforms.each(function () {
                var $el = $(this);

                $el.find('a').attr('href', '/' + platform + '?api=' + $el.data('slug'));
                $el.show();
            });
        },
        update: function (slug) {
            platforms.$active = $platforms.find('[data-slug=' + slug + ']');
            platforms.activeSlug = slug;
        },
        wire: function () {
            $platforms.on('click', function (e) {
                var $platform = $(e.target).closest('li'),
                    apiPreference = $platform.data('api-preference'),
                    slug = $platform.data('slug');

                switch (apiPreference) {
                    case 'optional':
                    case 'required':
                        e.preventDefault();
                        hash.replace(hash.addSlug(slug));
                        break;
                }
            });
        }
    };

    var hash = {
        addSlug: function (slug) {
            var _hash = window.location.hash;
            if (_hash && _hash.match(new RegExp(slug))) return _hash;
            return _hash + '-' + slug;
        },
        parse: function () {
            // #quick-guide-native-mobile-ios
            var _hash = window.location.hash,
                result = { category: null, platform: null, other: Boolean(_hash) };

            if (!_hash) return result;
            if (!_hash.match(new RegExp(quickGuideHash))) return result;

            cache.categories.forEach(function (name) {
                if (_hash.match(new RegExp(name))) result.category = name;
            });

            cache.platforms.forEach(function (name) {
                if (_hash.match(new RegExp(name))) result.platform = name;
            });

            return result;
        },
        remove: function () {
            window.history.pushState('', document.title, window.location.pathname);
        },
        replace: function (hash) {
            window.location.hash = hash;
        },
        wire: function () {
            window.onhashchange = function () {
                ui.setup();
            };
        }
    };

    var ui = {
        setup: function () {
            var parsed = hash.parse();

            // has has both category and platform
            if (parsed.category && parsed.platform) {
                platforms.showApi(parsed.category, parsed.platform);
                return;
            }

            // hash has category only
            if (parsed.category) {
                platforms.show(parsed.category);
                return;
            }

            // hash has some other value
            if (parsed.other) return;

            // no hash
            ui.reset();
        },
        reset: function () {
            breadcrumbs.hide();
            breadcrumbs.reset();
            categories.show();
            hash.remove();
            platforms.hide();
            description.update(null, 'start-tip');
        }
    };

    var description = {
        $skipBtn: $description.find('.tx-btn-skip'),
        update: function (text, label) {
            if (label) text = $description.data(label);
            $description.find('span').text(text);
        },
        showSkip: function (slug) {
            console.info('attempting to show skip button...');
            console.info(description.$skipBtn);
            description.$skipBtn.attr('href', slug).show();
        },
        hideSkip: function () {
            console.info('attempting to hide skip button...');
            description.$skipBtn.hide();
        }
    };

    function init() {
        // cache categories and platforms
        categories.cache();
        platforms.cache();

        // wire shit
        breadcrumbs.wire();
        categories.wire();
        hash.wire();
        platforms.wire();

        // setup ui
        ui.setup();
    }

    return init();
})
(jQuery, window, document);
