
(function() {
    function fixHeader() {
        const btnSection = document.querySelector('.header__button-section');
        const logoSection = document.querySelector('.header__logo-section');
        const logo = document.querySelector('.header__logo-link, .header-before__logo-link');
        if (!btnSection && !logo) return;

        if (btnSection) {
            btnSection.style.setProperty('pointer-events', 'none', 'important');
            btnSection.querySelectorAll('a, button, .btn').forEach(function(el) {
                el.style.setProperty('pointer-events', 'auto', 'important');
            });
        }
        if (logoSection) {
            logoSection.style.setProperty('position', 'relative', 'important');
            logoSection.style.setProperty('z-index', '5', 'important');
        }
        if (logo) {
            logo.style.setProperty('position', 'relative', 'important');
            logo.style.setProperty('z-index', '5', 'important');
            logo.style.setProperty('pointer-events', 'auto', 'important');
        }
    }

    const obs = new MutationObserver(fixHeader);
    obs.observe(document.documentElement, { childList: true, subtree: true });
    fixHeader();
})();

(function() {
    const isMobile = (
        window.innerWidth <= 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        document.querySelector('.mobile-before-layout__container') !== null ||
        document.querySelector('.mobile-before-layout__content') !== null
    );
    if (!isMobile) return;

    const hideChatMobile = setInterval(() => {
            const chatWidget = document.getElementById('chat-widget-container');
            if (chatWidget) {
                chatWidget.style.setProperty('display', 'none', 'important');
                clearInterval(hideChatMobile);
            }
        }, 500);
    setTimeout(() => clearInterval(hideChatMobile), 10000);
        
    const PER_PAGE = 16;
    const LOAD_MORE = 4;
    let shown = PER_PAGE;
    let allData = [];
    let filtered = [];
    let done = false;
    window.__rt_rh_reset = function() { done = false; shown = PER_PAGE; observer.observe(document.documentElement, { childList: true, subtree: true }); };

    function parseData() {
        const items = document.querySelectorAll('.resulthistory__item');
        if (!items.length) return false;
        allData = Array.from(items).map(el => ({
            name: el.querySelector('.resulthistory__game-name')?.textContent.trim() || '',
            date: el.querySelector('.resulthistory__game-date')?.textContent.trim() || '',
            result: el.querySelector('.resulthistory__game-result')?.textContent.trim() || ''
        }));
        filtered = [...allData];
        return true;
    }

    function updateGrid() {
        const grid = document.getElementById('rh-cards');
        const btn = document.getElementById('rh-showmore');
        if (!grid) return;
        const slice = filtered.slice(0, shown);
        grid.innerHTML = slice.length === 0
            ? '<div class="resulthistory-empty">Pasaran tidak ditemukan</div>'
            : slice.map(d => `
                <div class="resulthistory-card">
                    <div class="resulthistory-card__name">${d.name}</div>
                    <div class="resulthistory-card__body">
                        <span class="resulthistory-card__result">${d.result}</span>
                        <span class="resulthistory-card__date">${d.date}</span>
                    </div>
                </div>
            `).join('');
        btn.style.display = shown >= filtered.length ? 'none' : 'block';
        // Simpan state ke localStorage
        localStorage.setItem('rh_shown', shown);
    }

    function insertGrid() {
        if (done) return;
        if (document.getElementById('rh-custom')) { done = true; return; }
        const wrapper = document.querySelector('.resulthistory__wrapper');
        if (!wrapper) return;
        if (!parseData()) return;
        done = true;

        wrapper.style.setProperty('background', 'transparent', 'important');
        wrapper.style.setProperty('background-color', 'transparent', 'important');

        const container = document.createElement('div');
        container.id = 'rh-custom';

        const search = document.createElement('input');
        search.className = 'resulthistory-search';
        search.placeholder = 'Cari pasaran...';
        // Restore search value dari localStorage
        const savedSearch = localStorage.getItem('rh_search') || '';
        search.value = savedSearch;
        search.addEventListener('input', () => {
            const q = search.value.toLowerCase();
            filtered = allData.filter(d => d.name.toLowerCase().includes(q));
            shown = PER_PAGE;
            // Simpan search state
            localStorage.setItem('rh_search', search.value);
            updateGrid();
        });

        const grid = document.createElement('div');
        grid.className = 'resulthistory-grid';
        grid.id = 'rh-cards';

        const btn = document.createElement('button');
        btn.className = 'resulthistory-showmore';
        btn.id = 'rh-showmore';
        btn.textContent = 'Lihat Lebih Banyak';
        btn.addEventListener('click', () => {
            shown += LOAD_MORE;
            updateGrid();
        });

        container.appendChild(search);
        container.appendChild(grid);
        container.appendChild(btn);
        wrapper.appendChild(container);

        // Restore shown value dari localStorage
        const savedShown = localStorage.getItem('rh_shown');
        if (savedShown) shown = parseInt(savedShown);

        // Restore filter hasil search
        const q = search.value.toLowerCase();
        if (q) filtered = allData.filter(d => d.name.toLowerCase().includes(q));

        updateGrid();
    }

    const observer = new MutationObserver(function() {
        if (!done && document.querySelectorAll('.resulthistory__item').length > 0) {
            insertGrid();
            if (done) observer.disconnect();
        }
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
    insertGrid();
})();

(function() {
    if (!document.querySelector('.mobile-before-layout__container')) return;

    function run() {
        if (document.querySelector('.list-menu-mobile')) return;
        const content = document.querySelector('.mobile-before-layout__content');
        if (!content) return;

        const menu = document.createElement('div');
        menu.className = 'list-menu-mobile';
        menu.innerHTML = `
            <a href="##"><img src="https://imgstorage.site/view/plotwis/prediksi-togel-kilau.gif" alt="PREDIKSI TOGEL"></a>
            <a href="https://vuata.link/rtpslot"><img src="https://imgstorage.site/view/plotwis/rtp-kilau.gif" alt="RTP SLOT"></a>
            <a href="https://vuata.link/promodptoto"><img src="https://imgstorage.site/view/plotwis/promosi-kilau.gif" alt="PROMOSI"></a>
            <a href="https://vuata.link/buktijp"><img src="https://imgstorage.site/view/plotwis/bukti-jp-kilau.gif" alt="BUKTI JP"></a>
            <a href="https://vuata.link/teledptoto"><img src="https://imgstorage.site/view/plotwis/keluhan-member-kilau.gif" alt="KELUHAN MEMBER"></a>
        `;
        content.appendChild(menu);
    }

    const obs = new MutationObserver(run);
    obs.observe(document.documentElement, { childList: true, subtree: true });
    run();
    setTimeout(run, 500);
    setTimeout(run, 2000);
})();

(function() {
    function run() {
        if (document.getElementById('social_network_mobile')) return;

        const anchor = document.getElementById('banner_gif_mobile') || document.querySelector('.home-page__login');
        if (!anchor) return;

        const el = document.createElement('div');
        el.id = 'social_network_mobile';
        el.className = 'social-network-dptoto-';
        el.innerHTML = `
            <p style="margin-top:5px;text-align:center;margin-bottom:18px;">
                <span style="font-weight:bolder;color:white;text-shadow:0px 0px 10px #000,0px 0px 20px #000;font-size:15px;font-family:verdana;">KLIK UNTUK MENGHUBUNGI CS DPTOTO:</span>
            </p>
            <div class="buttoncontact">
                <div style="margin-bottom:5px;display:flex;">
                    <a href="/" target="_blank"><img src="https://imgstorage.site/view/berlin/wa-dptoto.png" height="100%" width="100%" style="display:block;"></a>
                    <a href="/" target="_blank"><img src="https://imgstorage.site/view/plotwis/wa-dptoto.png" height="100%" width="100%" style="display:block;"></a>
                </div>
                <div style="margin-bottom:5px;display:flex;">
                    <a href="/" target="_blank"><img src="https://imgstorage.site/view/berlin/livechat-dptoto.png" alt="LIVECHAT DPTOTO" height="100%" width="100%" style="display:block;"></a>
                    <a href="/" target="_blank"><img src="https://imgstorage.site/view/berlin/telegram-dptoto.png" alt="TELEGRAM DPTOTO" height="100%" width="100%" style="display:block;"></a>
                </div>
            </div>
        `;

        anchor.insertAdjacentElement('afterend', el);
    }

    setTimeout(run, 1000);
    setTimeout(run, 2000);
    setTimeout(run, 4000);
    window.__rt_social_run = run;
})();

(function() {
    function injectStyle() {
        if (document.getElementById('jackpot-css')) return;
        const style = document.createElement('style');
        style.id = 'jackpot-css';
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap');

            #jackpot-counter {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 10px 0 6px;
            }

            #jackpot-counter .jp-label {
                font-family: 'Orbitron', monospace;
                font-size: 11px;
                font-weight: 700;
                letter-spacing: 3px;
                color: #00bfff;
                text-transform: uppercase;
                text-shadow: 0 0 8px #00bfff;
                margin-bottom: 6px;
            }

            #jackpot-counter .jp-panel {
                width: 90%;
                position: relative;
                border-radius: 8px;
                overflow: hidden;
            }

            #jackpot-counter .jp-panel img {
                width: 100%;
                display: block;
            }

            #jackpot-counter .jp-number {
                font-family: 'Orbitron', monospace;
                font-size: 20px;
                font-weight: 900;
                letter-spacing: 2px;
                color: #00e5ff;
                text-shadow:
                    0 0 6px #00e5ff,
                    0 0 14px #00bfff,
                    0 0 28px #007fff;
                animation: jp-pulse 2s ease-in-out infinite;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                white-space: nowrap;
            }

            #jackpot-counter .jp-number .jp-idr {
                font-size: 13px;
                font-weight: 700;
                color: #ffffff;
                text-shadow: 0 0 8px #fff, 0 0 16px #00bfff;
                margin-right: 8px;
                letter-spacing: 1px;
            }

            @keyframes jp-pulse {
                0%, 100% { text-shadow: 0 0 6px #00e5ff, 0 0 14px #00bfff, 0 0 28px #007fff; }
                50%       { text-shadow: 0 0 10px #00e5ff, 0 0 24px #00bfff, 0 0 50px #007fff; }
            }
        `;
        document.head.appendChild(style);
    }

    function formatNumber(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    function run() {
        if (document.getElementById('jackpot-counter')) return;

        const anchor = document.getElementById('social_network_mobile')
            || document.querySelector('.social-network');
        if (!anchor) return;

        injectStyle();

        const el = document.createElement('div');
        el.id = 'jackpot-counter';
        el.innerHTML = `
            <div class="jp-label">&#9889; Progressive Jackpot &#9889;</div>
            <div class="jp-panel">
                <img src="https://imgstorage.site/view/yuyu/dptoto-progressive-700x141-gif.gif" alt="" loading="lazy">
                <div class="jp-number">
                    <span class="jp-idr">IDR</span><span class="jp-value">1.166.508.394</span>
                </div>
            </div>
        `;

        anchor.insertAdjacentElement('afterend', el);

        let current = 1166508394;
        if (window.__rt_jp_iv) clearInterval(window.__rt_jp_iv);
        window.__rt_jp_iv = setInterval(function() {
            current += Math.floor(Math.random() * 5000) + 1;
            const val = el.querySelector('.jp-value');
            if (val) val.textContent = formatNumber(current);
        }, 100);
    }

    setTimeout(run, 2000);
    setTimeout(run, 3500);
    setTimeout(run, 5500);
    window.__rt_jp_run = run;
})();

(function() {
    function run() {
        if (document.getElementById('banner_gif_mobile')) return;
        const login = document.querySelector('.home-page__login');
        if (!login) return;

        const gif = document.createElement('div');
        gif.id = 'banner_gif_mobile';
        gif.className = 'gif-dptoto-mobile';
        gif.innerHTML = `<a href="/"><img src="https://imgstorage.site/view/yuyu/dptoto-800x106-gif.gif" alt="dptoto" style="width:100%" loading="lazy"></a>`;

        login.insertAdjacentElement('afterend', gif);
    }


    setTimeout(run, 500);
    setTimeout(run, 1500);
    setTimeout(run, 3000);
    window.__rt_gif_run = run;
})();

(function() {
    let closed = false;

    function run() {
        if (closed) return;
        if (document.getElementById('smart_banner_custom')) return;
        if (!document.querySelector('.mobile-before-layout__container')) return;

        const banner = document.createElement('div');
        banner.id = 'smart_banner_custom';
        banner.style.cssText = 'position:relative;width:100%;height:63px;padding:10px;font-family:Verdana,arial,sans-serif;color:#fff;background:linear-gradient(to right,#1b1b1b,#1b1b1b);display:flex;align-items:center;box-sizing:border-box;z-index:400;';
        banner.innerHTML = `
            <span class="banner-close" style="cursor:pointer;color:#fff;font-size:18px;margin-right:8px;line-height:1;">x</span>
            <img src="https://imgstorage.site/view/berlin/favicon-dptoto-hd.png" alt="App Icon" style="width:43px;height:43px;object-fit:contain;border-radius:8px;margin-right:10px;">
            <div style="flex:1;">
                <div style="font-size:14px;font-weight:bold;color:#11B5DE;">APLIKASI DPTOTO</div>
                <div style="font-size:11px;color:#FFF;">Kini telah tersedia Aplikasi Android</div>
            </div>
            <a href="#" target="_blank" style="font-size:12px;padding:8px 12px;color:#fff;background:linear-gradient(135deg,#00d0ff 0%,#0072ff 100%);border-radius:8px;border:none;text-decoration:none;white-space:nowrap;font-weight:700;animation:pulse-blue-glow 1.5s infinite ease-in-out;"><strong>DOWNLOAD</strong></a>
        `;

        banner.querySelector('.banner-close').addEventListener('click', function() {
            closed = true;
            banner.remove();
        });

        document.body.insertAdjacentElement('afterbegin', banner);
    }

    if (document.body) {
        run();
    }

    const obs = new MutationObserver(run);
    obs.observe(document.documentElement, { childList: true, subtree: false });

    setTimeout(run, 500);
    setTimeout(run, 2000);
})();

(function() {
    if (!document.querySelector('.before-layout__main')) {
        var wait = new MutationObserver(function() {
            if (document.querySelector('.before-layout__main')) {
                wait.disconnect();
                init();
            }
        });
        wait.observe(document.documentElement, { childList: true, subtree: true });
        return;
    }
    init();

    function init() {
        injectStyle();
        setTimeout(run, 1000);
        setTimeout(run, 2500);
        setTimeout(run, 4500);
    }

    function injectStyle() {
        if (document.getElementById('desktop-inject-css')) return;

        if (!document.getElementById('owl-carousel-css')) {
            const link = document.createElement('link');
            link.id = 'owl-carousel-css';
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css';
            document.head.appendChild(link);
        }

        const style = document.createElement('style');
        style.id = 'desktop-inject-css';
        style.textContent = `
            .item.box-middle.post-card3 {
                display: flex !important;
                gap: 16px !important;
                width: 100% !important;
                margin-top: 0 !important;
                margin-bottom: 4px !important;
                border: none !important;
                padding: 0 !important;
                transition: none !important;
                transform: none !important;
                box-shadow: none !important;
            }
            .item.box-middle.post-card3:hover {
                transform: none !important;
                box-shadow: none !important;
            }
            .item.box-middle.post-card3 a {
                flex: 1;
                display: block;
                overflow: hidden;
                border-radius: 10px;
                border: 2px solid #003f7f;
                box-shadow: 0 2px 10px rgba(0,0,0,0.5);
                transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
            }
            .item.box-middle.post-card3 a:hover {
                transform: scale(1.04);
                border-color: #00bfff;
                box-shadow: 0 0 16px 4px rgba(0,191,255,0.6), 0 4px 20px rgba(0,0,0,0.4);
            }
            .item.box-middle.post-card3 img {
                width: 100%;
                display: block;
                border-radius: 10px;
            }
            .custom-game-slider {
                width: 100%;
                margin-top: 0;
                margin-bottom: 12px;
                position: relative;
            }
            .dptoto-pasaran-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 8px;
                padding: 0;
                background: transparent !important;
            }
            .dptoto-pasaran-grid .grid-item img {
                width: 100%;
                display: block;
                border-radius: 8px;
            }
            .custom-game-slider .owl-stage-outer,
            .custom-game-slider .owl-stage,
            .custom-game-slider .owl-item,
            .custom-game-slider .owl-item > div {
                background: transparent !important;
            }
            .custom-game-slider .owl-nav button {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(0,0,0,0.5) !important;
                color: #fff !important;
                border-radius: 4px !important;
                padding: 8px 12px !important;
                font-size: 18px !important;
                line-height: 1 !important;
            }
            .custom-game-slider .owl-prev { left: 4px; }
            .custom-game-slider .owl-next { right: 4px; }
            .custom-game-slider .owl-dot span {
                background: #555 !important;
            }
            .custom-game-slider .owl-dot.active span {
                background: #00bfff !important;
            }
            .custom-game-slider .owl-dots {
                text-align: center;
                padding: 6px 0;
            }
        `;
        document.head.appendChild(style);
    }

    function run() {
        const anchor = document.querySelector('.banklist__wrapper');
        if (!anchor) return;

        if (!document.querySelector('.item.box-middle.post-card3')) {
            const menu = document.createElement('div');
            menu.className = 'item box-middle post-card3';
            menu.innerHTML = `
                <a href="/" target="_blank"><img title="DPTOTO" src="https://imgstorage.site/view/plotwis/dptoto-togel.gif" alt="DPTOTO"></a>
                <a href="/" target="_blank"><img title="DPTOTO" src="https://imgstorage.site/view/plotwis/dptoto-live-games.gif" alt="DPTOTO"></a>
                <a href="/" target="_blank"><img title="DPTOTO" src="https://imgstorage.site/view/plotwis/dptoto-slot.gif" alt="DPTOTO"></a>
            `;
            anchor.insertAdjacentElement('beforebegin', menu);
        }

        if (!document.querySelector('.custom-game-slider')) {
            const images = [
                "https://imgstorage.site/view/plotwis/5d-toto-macau-pools.gif",
                "https://imgstorage.site/view/plotwis/4d-toto-macau-pools.gif",
                "https://imgstorage.site/view/plotwis/king-kong-4d.gif",
                "https://imgstorage.site/view/plotwis/sydney-pools.gif",
                "https://imgstorage.site/view/plotwis/hongkong-pools.gif",
                "https://imgstorage.site/view/plotwis/jowo-pools.gif",
                "https://imgstorage.site/view/plotwis/jakarta-pools.gif",
            ];

            const sliderContainer = document.createElement('div');
            sliderContainer.className = 'owl-carousel custom-game-slider';

            for (let i = 0; i < images.length; i += 4) {
                const slideDiv = document.createElement('div');
                const gridDiv = document.createElement('div');
                gridDiv.className = 'dptoto-pasaran-grid';
                for (let j = 0; j < 4; j++) {
                    if (images[i + j]) {
                        const itemDiv = document.createElement('div');
                        itemDiv.className = 'grid-item';
                        itemDiv.innerHTML = `<a href="/" target="_blank"><img src="${images[i + j]}" loading="lazy"></a>`;
                        gridDiv.appendChild(itemDiv);
                    }
                }
                slideDiv.appendChild(gridDiv);
                sliderContainer.appendChild(slideDiv);
            }

            anchor.insertAdjacentElement('beforebegin', sliderContainer);

            $(sliderContainer).owlCarousel({
                loop: true,
                autoplay: true,
                autoplayTimeout: 3000,
                autoplayHoverPause: true,
                items: 1,
                dots: true,
                nav: true,
                navText: ['&#10094;', '&#10095;']
            });
        }
    }
    window.__rt_desktop_run = run;
})();

(function() {
    if (document.getElementById('custom-cursor-css')) return;
    const style = document.createElement('style');
    style.id = 'custom-cursor-css';
    style.textContent = `
        *, *::before, *::after {
            cursor: url('https://imgstorage.site/view/berlin/cursor-dptoto.png'), auto !important;
        }
    `;
    document.head.appendChild(style);
})();

(function() {
    if (document.getElementById('header-bg-css')) return;
    const style = document.createElement('style');
    style.id = 'header-bg-css';
    style.textContent = `
        .header-before {
            position: sticky !important;
            top: 0 !important;
            z-index: 1000 !important;
            background: transparent !important;
            box-shadow: none !important;
            overflow: visible !important;
        }

        .header-before::before {
            content: '' !important;
            position: absolute !important;
            top: 0 !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: 100vw !important;
            height: 100% !important;
            background: url('https://imgstorage.site/view/plotwis/bg-web-desktop-header.png') bottom center no-repeat !important;
            z-index: 0 !important;
            pointer-events: none !important;
        }

        .header-before__wrapper {
            position: relative !important;
            z-index: 2 !important;
        }

        .header-before__background {
            display: none !important;
        }

        /* FIX ALERT LOGIN DESKTOP: DI BAWAH HEADER */
        .alert,
        .alert-danger,
        .toast,
        .toast-container,
        div[role="alert"] {
            position: fixed !important;
            top: 72px !important;
            right: 18px !important;
            left: auto !important;
            bottom: auto !important;
            transform: none !important;
            width: auto !important;
            min-width: 380px !important;
            max-width: 520px !important;
            z-index: 9999999 !important;
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
            pointer-events: auto !important;
        }

        /* MOBILE BIAR TETAP RAPI DI BAWAH HEADER */
        @media (max-width: 768px) {
            .alert,
            .alert-danger,
            .toast,
            .toast-container,
            div[role="alert"] {
                top: 68px !important;
                left: 10px !important;
                right: 10px !important;
                width: auto !important;
                min-width: 0 !important;
                max-width: none !important;
                transform: none !important;
            }
        }
    `;
    document.head.appendChild(style);
})();

(function() {
    if (window.innerWidth <= 768) return;

    var done = false;
    var items = [];
    window.__rt_wd_reset = function() { done = false; items = []; };

    function injectStyle() {
        if (document.getElementById('wd-card-css')) return;
        var style = document.createElement('style');
        style.id = 'wd-card-css';
        style.textContent = `
            @font-face {
                font-display: swap;
                font-family: "Open Sans";
                font-stretch: 100%;
                font-style: normal;
                font-weight: 400;
                src: url(https://fonts.gstatic.com/s/opensans/v44/memvYaGs126MiZpBA-UvWbX2vVnXBbObj2OVTVOmu0SC55K5gw.woff2) format("woff2");
            }
            #wd-live-card {
                margin: 8px 0;
                background: #295dd5;
                border-radius: 12px;
                padding: 8px;
                width: 100%;
                box-sizing: border-box;
                font-family: "Open Sans", ui-sans-serif, sans-serif;
            }
            #wd-live-card .wd-title {
                color: #fff;
                font-size: 13px;
                font-weight: 700;
                margin-bottom: 6px;
                text-align: center;
                letter-spacing: 1px;
                font-family: "Open Sans", ui-sans-serif, sans-serif;
            }
            #wd-live-card .wd-list {
                display: flex;
                flex-direction: column;
                gap: 4px;
                overflow: hidden;
                height: 175px;
            }
            #wd-live-card .wd-item {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 6px 8px;
                background: linear-gradient(to bottom, #05143d 0%, #05143d 100%);
                border-radius: 6px;
                font-size: 13px;
                font-family: "Open Sans", ui-sans-serif, sans-serif;
                color: #fff;
                flex-shrink: 0;
                transition: opacity 0.4s ease, transform 0.4s ease;
            }
            #wd-live-card .wd-item.wd-entering {
                opacity: 0;
                transform: translateY(-16px);
            }
            #wd-live-card .wd-item.wd-exiting {
                opacity: 0;
                transform: translateY(10px);
            }
            #wd-live-card .wd-amount {
                color: color-mix(in oklab, #feb302 var(--un-text-opacity, 100%), transparent);
                font-weight: 700;
                font-size: 16px;
                line-height: 24px;
                margin-left: auto;
            }
        `;
        document.head.appendChild(style);
    }

    var names = ['Agus','Budi','Citra','Dedi','Eka','Fajar','Gita','Hani','Indra','Joko','Kartika','Lina','Mono','Nanda','Putri','Reza','Sari','Tono','Vera','Yuda'];
    var amounts = [500000,750000,1000000,1500000,2000000,2500000,3000000,5000000,7500000,10000000,15000000,20000000];
    var suffixes = ['1','2','3','4','5','6','7','8','9','x','z','q','r','s'];

    function rndUser() {
        var n = names[Math.floor(Math.random() * names.length)].toLowerCase();
        var tail = Math.random() > 0.5
            ? n[n.length - 1]
            : suffixes[Math.floor(Math.random() * suffixes.length)];
        return n[0] + '***' + tail;
    }

    function rndAmt() {
        var a = amounts[Math.floor(Math.random() * amounts.length)];
        return 'Rp ' + a.toLocaleString('id-ID');
    }

    function makeEl(x) {
        var el = document.createElement('div');
        el.className = 'wd-item wd-entering';
        el.innerHTML =
            '<img src="https://imgstorage.site/view/berlin/favicon-dptoto-hd.png" width="16" height="16" style="border-radius:3px;flex-shrink:0;">' +
            '<span>' + x.u + '</span>' +
            '<span class="wd-amount">' + x.a + '</span>';
        return el;
    }

    function initialRender() {
        var list = document.querySelector('#wd-live-card .wd-list');
        if (!list) return;
        items.forEach(function(x, i) {
            var el = makeEl(x);
            list.appendChild(el);
            setTimeout(function() {
                el.classList.remove('wd-entering');
            }, i * 200);
        });
    }

    function addNewItem() {
        var list = document.querySelector('#wd-live-card .wd-list');
        if (!list) {
            if (window.__rt_wd_iv) { clearInterval(window.__rt_wd_iv); window.__rt_wd_iv = null; }
            done = false;
            items = [];
            setTimeout(run, 500);
            return;
        }

        var newData = { u: rndUser(), a: rndAmt() };
        items.unshift(newData);

        var newEl = makeEl(newData);
        list.insertBefore(newEl, list.firstChild);
        setTimeout(function() { newEl.classList.remove('wd-entering'); }, 30);

        if (items.length > 5) {
            items.pop();
            var last = list.lastChild;
            if (last) last.parentNode.removeChild(last);
        }
    }

    function run() {
        if (done) return;
        if (document.getElementById('wd-live-card')) { done = true; return; }

        var target = document.querySelector('.resulthistory__wrapper');
        if (!target) return;

        done = true;
        injectStyle();

        for (var i = 0; i < 5; i++) items.push({ u: rndUser(), a: rndAmt() });

        var card = document.createElement('div');
        card.id = 'wd-live-card';
        card.innerHTML = '<div class="wd-title">WD TERBARU MEMBER</div><div class="wd-list"></div>';
        target.insertAdjacentElement('beforebegin', card);

        initialRender();
        if (window.__rt_wd_iv) clearInterval(window.__rt_wd_iv);
        window.__rt_wd_iv = setInterval(addNewItem, 3000);
    }
    window.__rt_wd_run = run;

    if (!document.querySelector('.before-layout__main')) {
        var wait = new MutationObserver(function() {
            if (document.querySelector('.before-layout__main')) {
                wait.disconnect();
                setTimeout(run, 1000);
                setTimeout(run, 2500);
                setTimeout(run, 4500);
            }
        });
        wait.observe(document.documentElement, { childList: true, subtree: true });
    } else {
        setTimeout(run, 1000);
        setTimeout(run, 2500);
        setTimeout(run, 4500);
    }
})();

(function() {
    var _lastPath = location.pathname;

    function sched(fn) {
        if (!fn) return;
        setTimeout(fn, 800);
        setTimeout(fn, 2200);
        setTimeout(fn, 4200);
    }

    function onRouteChange() {
        var newPath = location.pathname;
        if (newPath === _lastPath) return;
        _lastPath = newPath;

        if (window.__rt_jp_iv) { clearInterval(window.__rt_jp_iv); window.__rt_jp_iv = null; }
        if (window.__rt_wd_iv) { clearInterval(window.__rt_wd_iv); window.__rt_wd_iv = null; }
        if (window.__rt_rh_reset) window.__rt_rh_reset();
        if (window.__rt_wd_reset) window.__rt_wd_reset();
        sched(window.__rt_social_run);
        sched(window.__rt_jp_run);
        sched(window.__rt_gif_run);
        sched(window.__rt_desktop_run);
        sched(window.__rt_wd_run);
        sched(window.__rt_promo_run);
    }

    var _orig = history.pushState;
    history.pushState = function() {
        _orig.apply(this, arguments);
        setTimeout(onRouteChange, 300);
    };
    window.addEventListener('popstate', function() { setTimeout(onRouteChange, 300); });
})();

(function() {
    const LOGO_GIF_BARU = 'https://imgstorage.site/view/plotwis/gif-LOGO-ANIMATION-Dptoto.gif';

    function replaceLogoAllDevice() {
        const isMobile = window.innerWidth <= 768 ||
            document.querySelector('.mobile-before-layout__container') ||
            document.querySelector('.mobile-before-layout__content');

        const selectors = isMobile ? [
            '.mobile-before-header__logo-link',
            '.mobile-header__logo-link',
            '.mobile-before-layout__header a',
            '.mobile-before-header a',
            '.mobile-header a',
            '.header-before__logo-link',
            '.header__logo-link',
            '.header-before__logo-section a',
            '.header__logo-section a'
        ] : [
            '.header-before__logo-link',
            '.header__logo-link',
            '.header-before__logo-section a',
            '.header__logo-section a',
            '.header-before__logo-section',
            '.header__logo-section'
        ];

        let target = null;

        for (const sel of selectors) {
            const el = document.querySelector(sel);
            if (el) {
                target = el;
                break;
            }
        }

        if (!target) return;

        const logoBox = target.tagName.toLowerCase() === 'a' ? target : target.querySelector('a') || target;

        logoBox.style.setProperty('display', 'flex', 'important');
        logoBox.style.setProperty('align-items', 'center', 'important');
        logoBox.style.setProperty('justify-content', 'center', 'important');
        logoBox.style.setProperty('position', 'relative', 'important');
        logoBox.style.setProperty('z-index', '99999', 'important');
        logoBox.style.setProperty('overflow', 'visible', 'important');
        logoBox.style.setProperty('background', 'transparent', 'important');

        if (isMobile) {
            logoBox.style.setProperty('width', '175px', 'important');
            logoBox.style.setProperty('height', '48px', 'important');
            logoBox.style.setProperty('margin-left', '-22px', 'important');
        } else {
            logoBox.style.setProperty('width', '270px', 'important');
            logoBox.style.setProperty('height', '72px', 'important');
        }

        const oldImgs = logoBox.querySelectorAll('img:not(#custom-header-logo-gif)');
        oldImgs.forEach(function(img) {
            img.style.setProperty('display', 'none', 'important');
            img.style.setProperty('opacity', '0', 'important');
            img.style.setProperty('visibility', 'hidden', 'important');
        });

        let newLogo = logoBox.querySelector('#custom-header-logo-gif');

        if (!newLogo) {
            newLogo = document.createElement('img');
            newLogo.id = 'custom-header-logo-gif';
            newLogo.alt = 'DPTOTO';
            newLogo.src = LOGO_GIF_BARU;
            logoBox.appendChild(newLogo);
        }

        newLogo.style.setProperty('display', 'block', 'important');
        newLogo.style.setProperty('height', 'auto', 'important');
        newLogo.style.setProperty('object-fit', 'contain', 'important');
        newLogo.style.setProperty('position', 'relative', 'important');
        newLogo.style.setProperty('z-index', '100000', 'important');
        newLogo.style.setProperty('pointer-events', 'none', 'important');

        if (isMobile) {
            newLogo.style.setProperty('width', '165px', 'important');
            newLogo.style.setProperty('max-height', '50px', 'important');
        } else {
            newLogo.style.setProperty('width', '205px', 'important');
            newLogo.style.setProperty('max-height', '60px', 'important');
        }
    }

    const obs = new MutationObserver(replaceLogoAllDevice);
    obs.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    replaceLogoAllDevice();
    setTimeout(replaceLogoAllDevice, 500);
    setTimeout(replaceLogoAllDevice, 1500);
    setTimeout(replaceLogoAllDevice, 3000);
    setTimeout(replaceLogoAllDevice, 5000);

    window.__replaceLogoAllDevice = replaceLogoAllDevice;
})();
