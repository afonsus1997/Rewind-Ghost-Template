(function () {
    // Welcome banner: remember when it's dismissed
    var banner = document.querySelector('[data-welcome]');
    var close = document.querySelector('[data-welcome-close]');
    if (banner && close) {
        close.addEventListener('click', function () {
            banner.hidden = true;
            try { localStorage.setItem('rewind-welcome-dismissed', '1'); } catch (e) {}
        });
    }

    // Review sidebar: move the first music embed and the "Standout tracks" list
    // from the post body into the sidebar. Without JS they simply stay in the body.
    var content = document.querySelector('[data-review-content]');
    if (content) {
        var listenBox = document.querySelector('[data-aside-listen]');
        var tracksBox = document.querySelector('[data-aside-tracks]');

        var embed = content.querySelector('.kg-embed-card');
        if (embed && listenBox) {
            listenBox.appendChild(embed);
            listenBox.hidden = false;
        }

        var headings = content.querySelectorAll('h2, h3, h4');
        Array.prototype.some.call(headings, function (h) {
            if (!/^\s*standout tracks\s*$/i.test(h.textContent)) { return false; }
            var list = h.nextElementSibling;
            if (list && (list.tagName === 'OL' || list.tagName === 'UL') && tracksBox) {
                list.classList.add('track-list');
                // Real track numbers: "3 Track x", "3. Track x" or "3 - Track x" shows as 03
                Array.prototype.forEach.call(list.children, function (li) {
                    var walker = document.createTreeWalker(li, NodeFilter.SHOW_TEXT);
                    var node = walker.nextNode();
                    while (node && !node.nodeValue.trim()) { node = walker.nextNode(); }
                    if (!node) { return; }
                    var m = node.nodeValue.match(/^\s*(\d{1,3})\s*(?:[.):\-–—]\s*|\s+)/);
                    if (!m) { return; }
                    node.nodeValue = node.nodeValue.slice(m[0].length);
                    li.setAttribute('data-n', m[1].length < 2 ? '0' + m[1] : m[1]);
                    li.classList.add('has-number');
                });
                tracksBox.appendChild(list);
                h.parentNode.removeChild(h);
                tracksBox.hidden = false;
            }
            return true;
        });
    }

    // Reviews index: filter and sort
    var list = document.querySelector('[data-review-list]');
    if (list) {
        var items = Array.prototype.slice.call(list.children);
        var filter = document.querySelector('[data-review-filter]');
        var empty = document.querySelector('[data-review-empty]');
        var sortButtons = document.querySelectorAll('[data-review-sort]');
        var typeButtons = document.querySelectorAll('[data-review-type]');
        var type = 'all';

        var applyFilter = function () {
            var q = filter ? (filter.value || '').trim().toLowerCase() : '';
            var shown = 0;
            items.forEach(function (li) {
                var match = (!q || li.getAttribute('data-search').toLowerCase().indexOf(q) !== -1) &&
                    (type === 'all' || li.getAttribute('data-type') === type);
                li.hidden = !match;
                if (match) { shown++; }
            });
            if (empty) { empty.hidden = shown !== 0; }
        };

        var applySort = function (key) {
            var sorted = items.slice().sort(function (a, b) {
                if (key === 'title') {
                    return a.getAttribute('data-title').localeCompare(b.getAttribute('data-title'), undefined, {sensitivity: 'base'});
                }
                return b.getAttribute('data-date').localeCompare(a.getAttribute('data-date'));
            });
            sorted.forEach(function (li) { list.appendChild(li); });
            Array.prototype.forEach.call(sortButtons, function (btn) {
                var on = btn.getAttribute('data-review-sort') === key;
                btn.classList.toggle('is-active', on);
                btn.setAttribute('aria-pressed', on ? 'true' : 'false');
            });
        };

        if (filter) { filter.addEventListener('input', applyFilter); }
        Array.prototype.forEach.call(typeButtons, function (btn) {
            btn.addEventListener('click', function () {
                type = btn.getAttribute('data-review-type');
                Array.prototype.forEach.call(typeButtons, function (b) {
                    var on = b === btn;
                    b.classList.toggle('is-active', on);
                    b.setAttribute('aria-pressed', on ? 'true' : 'false');
                });
                applyFilter();
            });
        });
        // Open pre-filtered with /reviews/#letters or /reviews/#reviews
        var hashType = {'#letters': 'letter', '#reviews': 'review'}[window.location.hash];
        if (hashType) {
            var pre = document.querySelector('[data-review-type="' + hashType + '"]');
            if (pre) { pre.click(); }
        }
        Array.prototype.forEach.call(sortButtons, function (btn) {
            btn.addEventListener('click', function () { applySort(btn.getAttribute('data-review-sort')); });
        });
    }

    // Genre chips: highlight the one for the current page
    var path = window.location.pathname.replace(/page\/\d+\/?$/, '');
    var chips = document.querySelectorAll('[data-chip]');
    Array.prototype.forEach.call(chips, function (chip) {
        var chipPath = new URL(chip.href, window.location.origin).pathname;
        if (chipPath === path) {
            chip.classList.add('is-active');
            chip.setAttribute('aria-current', 'page');
        }
    });
})();
