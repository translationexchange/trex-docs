(function ($, window) {
    var $content = $('.content'),
        $pageNav = $content.find('.tx-page-nav'),
        $postTitle = $content.find('.post-title'),
        $tut1Content = $content.find('.tx-tutorial-1-content'),
        $tut2Content = $content.find('.tx-tutorial-2-content'),
        $tut2Title = $content.find('.tx-tutorial-2-title');

    function getQueryString(field, url) {
        var href = url ? url : window.location.href;
        var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
        var string = reg.exec(href);
        return string ? string[1] : null;
    }

    function showTutorial(name) {
        switch (name) {
            case 'tutorial-1':
                $tut1Content.show();
                $tut2Content.hide();
                $pageNav.find('a').toggleClass('selected');
                break;
            case 'tutorial-2':
                $tut1Content.hide();
                $tut2Content.show();
                $pageNav.find('a').toggleClass('selected');
                break;
        }
    }

    function wire() {
        $pageNav.on('click', function (e) {
            e.preventDefault();
            showTutorial($(e.target).data('action'));
        });
    }

    function renderPost(data) {
        if (!data) return;
        if (!data.posts || !data.posts[0]) return;

        var hash = window.location.hash,
            post = data.posts[0];

        $postTitle.find('span').text(' + ' + post.title + ' API');

        $tut2Title.text(post.title + ' API');

        $tut2Content.html(post.html);

        $pageNav.slideDown();

        if (hash) showTutorial(hash);
    }

    function highlightCode() {
        $('pre code').each(function (i, block) {
            hljs.highlightBlock(block);
        });
    }

    function init() {
        var slug = getQueryString('api');

        if (!slug) {
            highlightCode();
            return;
        }

        var url = ghost.url.api('posts', { filter: 'slug:' + slug });

        var promise = $.get(url);

        promise.done(renderPost);

        promise.always(function () {
            // wire page event handlers
            wire();
            highlightCode();
        });
    }

    return init();
})(jQuery, window);
