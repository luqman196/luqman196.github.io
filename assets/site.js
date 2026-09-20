/* Kredit Lab — shared site behavior: theme toggle + logo swap + mobile nav */
(function () {
    var saved;
    try { saved = localStorage.getItem('kl-theme'); } catch (e) {}
    if (saved === 'dark' || saved === 'light') {
        document.documentElement.setAttribute('data-theme', saved);
    }

    function applyLogos() {
        var theme = document.documentElement.getAttribute('data-theme') || 'light';
        document.querySelectorAll('img.theme-logo').forEach(function (img) {
            var src = theme === 'dark' ? img.getAttribute('data-logo-dark') : img.getAttribute('data-logo-light');
            if (src) img.src = src;
        });
        var btn = document.querySelector('.toggle-btn[data-theme-toggle]');
        if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    window.toggleTheme = function () {
        var cur = document.documentElement.getAttribute('data-theme') || 'light';
        var next = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        try { localStorage.setItem('kl-theme', next); } catch (e) {}
        applyLogos();
    };

    window.toggleMenu = function () {
        var links = document.querySelector('.nav-links');
        if (links) links.classList.toggle('open');
    };

    /* Click-to-load YouTube: nothing is requested from Google until the
       visitor actually presses play. */
    document.addEventListener('click', function (e) {
        var btn = e.target.closest && e.target.closest('.video-play');
        if (!btn) return;
        var wrap = btn.closest('.video');
        var id = wrap && wrap.getAttribute('data-yt');
        if (!id) return;
        var f = document.createElement('iframe');
        f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
        f.title = wrap.getAttribute('data-title') || 'Video';
        f.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        f.setAttribute('allowfullscreen', '');
        btn.parentNode.replaceChild(f, btn);
    });

    document.addEventListener('DOMContentLoaded', applyLogos);
})();
