(function ($, window) {
    var $content = $('.content'),
        $pageSubnav = $content.find('.tx-page-nav'),
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
                $pageSubnav.find('a').toggleClass('selected');
                break;
            case 'tutorial-2':
                $tut1Content.hide();
                $tut2Content.show();
                $pageSubnav.find('a').toggleClass('selected');
                break;
        }
    }

    function wire() {
        $pageSubnav.on('click', function (e) {
            e.preventDefault();
            showTutorial($(e.target).data('action'));
        });
    }

    function renderPost(data) {
        if (!data) return;
        if (!data.posts || !data.posts[0]) return;

        var post = data.posts[0];

        $postTitle.text($postTitle.text() + ' + ' + post.title + ' API');
        $tut2Title.text(post.title + ' API');
        $tut2Content.html(post.html);

        if (window.location.hash) showTutorial(window.location.hash);
    }

    function init() {
        var slug = getQueryString('api');

        if (!slug) return;

        var url = ghost.url.api('posts', { filter: 'slug:' + slug });

        var promise = $.get(url);

        promise.done(renderPost);

        promise.always(function () {
            // wire page event handlers
            wire();
            // highlight code blocks
            $('pre code').each(function (i, block) {
                hljs.highlightBlock(block);
            });
        });
    }

    return init();
})(jQuery, window);
