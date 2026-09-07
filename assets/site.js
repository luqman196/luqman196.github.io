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

    document.addEventListener('DOMContentLoaded', applyLogos);
})();
