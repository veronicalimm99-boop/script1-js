
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
            <a href="https://vuata.link/rtpslot-dptoto"><img src="https://imgstorage.site/view/plotwis/rtp-kilau.gif" alt="RTP SLOT"></a>
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
            <a href="https://vuata.link/wa-dptoto" target="_blank"><img src="https://imgstorage.site/view/berlin/wa-dptoto.png" height="100%" width="100%" style="display:block;"></a>
            <a href="https://vuata.link/facebook-dptoto" target="_blank"><img src="https://imgstorage.site/view/plotwis/fb-dptoto.png" height="100%" width="100%" style="display:block;"></a>
        </div>
        <div style="margin-bottom:5px;display:flex;">
            <a href="https://vuata.link/livechat-dptoto" target="_blank"><img src="https://imgstorage.site/view/berlin/livechat-dptoto.png" alt="LIVECHAT DPTOTO" height="100%" width="100%" style="display:block;"></a>
            <a href="https://vuata.link/tele-dptoto" target="_blank"><img src="https://imgstorage.site/view/berlin/telegram-dptoto.png" alt="TELEGRAM DPTOTO" height="100%" width="100%" style="display:block;"></a>
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
        const linkTujuan = 'https://carilink.link/'; // GANTI LINK TUJUAN DI SINI

    gif.innerHTML = `
  <a href="${linkTujuan}" target="_blank" rel="noopener noreferrer">
    <img 
      src="https://imgstorage.site/view/plotwis/carilink-dptoto.png" 
      alt="dptoto" 
      style="width:100%" 
      loading="lazy"
    >
  </a>
`;

        login.insertAdjacentElement('afterend', gif);
    }


    setTimeout(run, 500);
    setTimeout(run, 1500);
    setTimeout(run, 3000);
    window.__rt_gif_run = run;
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

    if (!document.getElementById('desktop-long-banner-dptoto')) {
    const longBanner = document.createElement('div');
    longBanner.id = 'desktop-long-banner-dptoto';
    longBanner.innerHTML = `
        <a href="https://carilink.link/" target="_blank" rel="noopener noreferrer">
            <img src="https://imgstorage.site/view/plotwis/carilink-dptoto.png" alt="Banner Panjang DPTOTO" loading="lazy">
        </a>
    `;

    anchor.insertAdjacentElement('beforebegin', longBanner);
}

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
                "https://imgstorage.site/view/plotwis/singapore-pools.gif",
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
            background: url('https://imgstorage.site/view/plotwis/dptoto-1920x79-navbar-png.png') bottom center no-repeat !important;
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

(function() {
    function tambahMenuSidebarDesktop() {
        if (document.getElementById('extra-sidebar-livescore')) return;

        const allItems = document.querySelectorAll('.beforesidebar__menu-item');
        if (!allItems.length) return;

        let promosiItem = null;

        allItems.forEach(function(item) {
            const text = (item.innerText || item.textContent || '').toLowerCase();
            if (text.includes('promosi')) {
                promosiItem = item;
            }
        });

        if (!promosiItem) return;

        const menus = [
            {
                id: 'extra-sidebar-livescore',
                text: 'Livescore',
                link: 'https://vuata.link/livescore',
                icon: '▥'
            },
            {
                id: 'extra-sidebar-rtp',
                text: 'Rtp Slot Hari Ini',
                link: 'https://vuata.link/rtpslot-dptoto',
                icon: '◉'
            },
            {
                id: 'extra-sidebar-bukti',
                text: 'Bukti Kemenangan',
                link: 'https://vuata.link/buktijp',
                icon: '♛'
            }
        ];

        let posisi = promosiItem;

        menus.forEach(function(menu) {
            const a = document.createElement('a');

            a.id = menu.id;
            a.href = menu.link;
            a.target = '_blank';
            a.className = promosiItem.className || 'beforesidebar__menu-item';

            a.innerHTML = `
                <span style="font-size:16px;min-width:24px;text-align:center;">${menu.icon}</span>
                <span>${menu.text}</span>
            `;

            posisi.insertAdjacentElement('afterend', a);
            posisi = a;
        });
    }

    const obs = new MutationObserver(tambahMenuSidebarDesktop);
    obs.observe(document.documentElement, { childList: true, subtree: true });

    tambahMenuSidebarDesktop();
    setTimeout(tambahMenuSidebarDesktop, 500);
    setTimeout(tambahMenuSidebarDesktop, 1500);
    setTimeout(tambahMenuSidebarDesktop, 3000);
})();


(function() {
    /* HAPUS STYLE LAMA BIAR GA BENTROK */
    [
        'sidebar-animated-glow-css',
        'sidebar-simple-glow-css',
        'sidebar-lampu-bergerak-css',
        'lampu-keliling-sidebar-css',
        'sidebar-important-menu-css',
        'sidebar-final-border-glow-css',
        'sidebar-running-border-final-css'
    ].forEach(function(id) {
        const old = document.getElementById(id);
        if (old) old.remove();
    });

    const cssId = 'sidebar-border-color-js-css';
    if (!document.getElementById(cssId)) {
        const style = document.createElement('style');
        style.id = cssId;
        style.textContent = `
            #extra-sidebar-livescore,
            #extra-sidebar-rtp,
            #extra-sidebar-bukti,          
            #mobile-extra-bukti {
                position: relative !important;
                overflow: hidden !important;
                border-radius: 35px !important;
                background-color: inherit !important;
                transition: border-color .35s ease, box-shadow .35s ease !important;
            }

            #extra-sidebar-livescore::before,
            #extra-sidebar-rtp::before,
            #extra-sidebar-bukti::before,
            #mobile-extra-livescore::before,
            #mobile-extra-rtp::before,
            #mobile-extra-bukti::before,
            #extra-sidebar-livescore::after,
            #extra-sidebar-rtp::after,
            #extra-sidebar-bukti::after,
            #mobile-extra-livescore::after,
            #mobile-extra-rtp::after,
            #mobile-extra-bukti::after {
                content: none !important;
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    const colors = [
        {
            border: 'rgba(255, 230, 40, 1)',
            shadow1: 'rgba(255, 230, 40, 0.95)',
            shadow2: 'rgba(255, 180, 0, 0.65)'
        },
        {
            border: 'rgba(0, 255, 255, 1)',
            shadow1: 'rgba(0, 255, 255, 0.95)',
            shadow2: 'rgba(0, 170, 255, 0.70)'
        },
        {
            border: 'rgba(35, 120, 255, 1)',
            shadow1: 'rgba(35, 120, 255, 0.95)',
            shadow2: 'rgba(0, 220, 255, 0.60)'
        },
        {
            border: 'rgba(190, 80, 255, 1)',
            shadow1: 'rgba(190, 80, 255, 0.95)',
            shadow2: 'rgba(120, 80, 255, 0.70)'
        },
        {
            border: 'rgba(0, 255, 170, 1)',
            shadow1: 'rgba(0, 255, 170, 0.95)',
            shadow2: 'rgba(0, 220, 150, 0.65)'
        }
    ];

    let index = 0;

    function applySidebarGlow() {
        const targets = document.querySelectorAll(
            '#extra-sidebar-livescore, ' +
            '#extra-sidebar-rtp, ' +
            '#extra-sidebar-bukti, ' +
            '#mobile-extra-livescore, ' +
            '#mobile-extra-rtp, ' +
            '#mobile-extra-bukti'
        );

        if (!targets.length) return;

        const c = colors[index % colors.length];

        targets.forEach(function(el) {
            el.style.setProperty('border', '2px solid ' + c.border, 'important');
            el.style.setProperty(
                'box-shadow',
                '0 0 7px ' + c.shadow1 + ', ' +
                '0 0 15px ' + c.shadow2 + ', ' +
                '0 0 22px ' + c.shadow1 + ', ' +
                'inset 0 0 0 1px rgba(255,255,255,0.08)',
                'important'
            );
        });

        index++;
    }

    applySidebarGlow();

    if (window.__sidebarGlowColorInterval) {
        clearInterval(window.__sidebarGlowColorInterval);
    }

    window.__sidebarGlowColorInterval = setInterval(applySidebarGlow, 600);

    const obs = new MutationObserver(applySidebarGlow);
    obs.observe(document.documentElement, { childList: true, subtree: true });
})();



(function() {
    function tambahFloatingMenuKiri() {
        if (document.getElementById('floating-menu-kiri-dptoto')) return;

        const style = document.createElement('style');
        style.id = 'floating-menu-kiri-style';
        style.textContent = `
                #floating-menu-kiri-dptoto {
                 position: fixed !important;
                 left: 8px !important;
                top: auto !important;
                bottom: 82px !important;
                transform: none !important;
                z-index: 999999 !important;
                display: flex !important;
                flex-direction: column !important;
                gap: 8px !important;
                align-items: flex-start !important;
                transition: all .25s ease !important;
            }

            #floating-menu-kiri-dptoto.floating-hidden .floating-menu-item {
                display: none !important;
            }

            #floating-menu-kiri-dptoto .floating-menu-item {
                width: 46px !important;
                height: 46px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                border-radius: 12px !important;
                overflow: hidden !important;
                background: linear-gradient(180deg, #35d8ff 0%, #007cff 45%, #001b5c 100%) !important;
                border: 2px solid #4de6ff !important;
                box-shadow:
                    0 0 8px rgba(0, 170, 255, .75),
                    inset 0 1px 0 rgba(255,255,255,.65) !important;
            }

            #floating-menu-kiri-dptoto .floating-menu-item img {
                width: 100% !important;
                height: 100% !important;
                object-fit: contain !important;
                display: block !important;
            }

            #floating-menu-kiri-dptoto .floating-close {
                width: 50px !important;
                height: 50px !important;
                border-radius: 12px !important;
                border: 2px solid #4de6ff !important;
                background: linear-gradient(180deg, #35d8ff 0%, #008cff 45%, #003a9c 100%) !important;
                color: #ffffff !important;
                font-size: 34px !important;
                font-weight: 900 !important;
                line-height: 1 !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                cursor: pointer !important;
                box-shadow:
                    0 0 10px rgba(0, 170, 255, .9),
                    inset 0 1px 0 rgba(255,255,255,.7) !important;
                text-shadow: 0 1px 3px rgba(0,0,0,.75) !important;
            }

            #floating-menu-kiri-dptoto.floating-hidden .floating-close {
            font-size: 0 !important;
            }

            #floating-menu-kiri-dptoto.floating-hidden .floating-close::before {
             content: "☰" !important;
             font-size: 30px !important;
            color: #ffffff !important;
            line-height: 1 !important;
            font-weight: 900 !important;
             text-shadow: 0 1px 3px rgba(0,0,0,.75) !important;
            }

                 @media (max-width: 768px) {
                #floating-menu-kiri-dptoto {
                 left: 6px !important;
                 top: auto !important;
                bottom: 75px !important;
                 transform: none !important;
                gap: 6px !important;
             }

                #floating-menu-kiri-dptoto .floating-menu-item {
                    width: 42px !important;
                    height: 42px !important;
                }

                #floating-menu-kiri-dptoto .floating-close {
                    width: 45px !important;
                    height: 45px !important;
                    font-size: 30px !important;
                }
            }
        `;
        document.head.appendChild(style);

        const menu = document.createElement('div');
        menu.id = 'floating-menu-kiri-dptoto';
        menu.classList.add('floating-hidden');

        menu.innerHTML = `
            <a class="floating-menu-item" href="https://vuata.link/tele-dptoto" target="_blank">
                <img src="https://imgstorage.site/view/plotwis/wired-lineal-2559-logo-telegram_transparent.gif" alt="TELEGRAM DPTOTO">
            </a>

            <a class="floating-menu-item" href="https://vuata.link/facebook-dptoto" target="_blank">
                <img src="https://imgstorage.site/view/plotwis/fb.gif" alt="FACEBOOK DPTOTO">
            </a>

            <a class="floating-menu-item" href="https://vuata.link/rtpslot-dptoto" target="_blank">
                <img src="https://imgstorage.site/view/plotwis/202603071957230000001b84888ddabacadai__300x300.webp" alt="RTP SLOT DPTOTO">
            </a>

            <button type="button" class="floating-close"></button>
        `;

        document.body.appendChild(menu);

const closeBtn = menu.querySelector('.floating-close');

closeBtn.addEventListener('click', function() {
    menu.classList.toggle('floating-hidden');

    if (menu.classList.contains('floating-hidden')) {
        closeBtn.innerHTML = '';
    } else {
        closeBtn.innerHTML = '×';
    }
});
    }

    tambahFloatingMenuKiri();
    setTimeout(tambahFloatingMenuKiri, 500);
    setTimeout(tambahFloatingMenuKiri, 1500);
    setTimeout(tambahFloatingMenuKiri, 3000);
})();

(function() {
    const LINK_PROMOSI = 'https://vuata.link/promodptoto'; // GANTI LINK PROMO DI SINI

    function fixPromosiMobile() {
        const isMobile = window.innerWidth <= 768 ||
            document.querySelector('.mobile-before-layout__container') ||
            document.querySelector('.mobile-before-layout__content');

        if (!isMobile) return;

        const allEl = document.querySelectorAll('a, button, div, span');

        allEl.forEach(function(el) {
            const text = (el.innerText || el.textContent || '').trim().toLowerCase();

            if (text === 'promosi') {
                el.style.setProperty('cursor', 'pointer', 'important');
                el.style.setProperty('pointer-events', 'auto', 'important');

                el.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = LINK_PROMOSI;
                };

                if (el.tagName.toLowerCase() === 'a') {
                    el.setAttribute('href', LINK_PROMOSI);
                    el.setAttribute('target', '_self');
                }
            }
        });
    }

    const obs = new MutationObserver(fixPromosiMobile);
    obs.observe(document.documentElement, { childList: true, subtree: true });

    fixPromosiMobile();
    setTimeout(fixPromosiMobile, 500);
    setTimeout(fixPromosiMobile, 1500);
    setTimeout(fixPromosiMobile, 3000);
})();


/* ===== TOTAL DIMENANGKAN DESKTOP + GLOW + ANGKA BERJALAN ===== */
(function() {
    const BOX_ID = 'desktop-total-winner-dptoto';
    const STYLE_ID = 'desktop-total-winner-dptoto-css';

    let warnaIndex = 0;

    let totalMenang = 783421607;
    let pemainAktif = 18437;

    /* ANGKA AWAL TOTAL DEPOSIT DAN TOTAL WD */
    let totalDeposit = 583726419;
    let totalWd = 914305782;

    /* BATAS ACAK TOTAL DEPOSIT */
    const MIN_DEPOSIT = 500000000;
    const MAX_DEPOSIT = 700000000;

    /* BATAS ACAK TOTAL WD */
    const MIN_WD = 750000000;
    const MAX_WD = 1000000000;

    const warnaGlow = [
        {
            border: '#ffe628',
            glow1: 'rgba(255,230,40,.95)',
            glow2: 'rgba(255,180,0,.65)'
        },
        {
            border: '#00ffff',
            glow1: 'rgba(0,255,255,.95)',
            glow2: 'rgba(0,170,255,.70)'
        },
        {
            border: '#2378ff',
            glow1: 'rgba(35,120,255,.95)',
            glow2: 'rgba(0,220,255,.60)'
        },
        {
            border: '#be50ff',
            glow1: 'rgba(190,80,255,.95)',
            glow2: 'rgba(120,80,255,.70)'
        },
        {
            border: '#00ffaa',
            glow1: 'rgba(0,255,170,.95)',
            glow2: 'rgba(0,220,150,.65)'
        }
    ];

    function formatID(angka) {
        return Math.floor(angka).toLocaleString('id-ID');
    }

    function hapusBox() {
        const box = document.getElementById(BOX_ID);
        if (box) box.remove();
    }

    function pasangStyle() {
        const styleLama = document.getElementById(STYLE_ID);
        if (styleLama) styleLama.remove();

        const style = document.createElement('style');
        style.id = STYLE_ID;

        style.textContent = `
            #${BOX_ID} {
                display: none !important;
            }

            @media screen and (min-width: 769px) {
                #${BOX_ID} {
                    display: block !important;
                    position: relative !important;
                    width: 100% !important;
                    max-width: 345px !important;
                    margin: 14px 0 0 !important;
                    padding: 0 !important;
                    box-sizing: border-box !important;
                    overflow: hidden !important;
                    background: #05143d !important;
                    border: 3px solid #00ffff !important;
                    border-radius: 16px !important;
                    box-shadow:
                        0 0 8px rgba(0,255,255,.95),
                        0 0 17px rgba(0,170,255,.70),
                        0 0 25px rgba(0,255,255,.45),
                        inset 0 0 8px rgba(255,255,255,.06) !important;
                    font-family: Arial, sans-serif !important;
                    transition:
                        border-color .3s ease,
                        box-shadow .3s ease !important;
                }

                #${BOX_ID} .silver-bar {
                    display: block !important;
                    width: 100% !important;
                    height: 8px !important;
                    background:
                        linear-gradient(
                            180deg,
                            #f7f9fc 0%,
                            #bec8d5 35%,
                            #778496 65%,
                            #dce3ec 100%
                        ) !important;
                    box-shadow:
                        0 0 6px rgba(235,242,252,.70) !important;
                }

                #${BOX_ID} .stats-wrap {
                display: grid !important;
                grid-template-columns:
                minmax(0, 1.15fr)
                minmax(0, .85fr) !important;
                align-items: start !important;
                column-gap: 8px !important;
                row-gap: 8px !important;
                padding: 11px 12px 12px !important;
                box-sizing: border-box !important;
                }

                #${BOX_ID} .stats-col {
                    min-width: 0 !important;
                }

                #${BOX_ID} .stats-col.right {
                    text-align: right !important;
                }

                #${BOX_ID} .stats-second-row {
                margin-top: 3px !important;
                padding-top: 8px !important;
                border-top:
                1px solid rgba(255,255,255,.14) !important;
                align-self: stretch !important;
                }

                #${BOX_ID} .stats-second-row .stats-label {
                margin-bottom: 5px !important;
                line-height: 1.15 !important;
                }

                #${BOX_ID} .stats-second-row .stats-value {
                display: block !important;
                margin: 0 !important;
                font-size: 12px !important;
                line-height: 1.15 !important;
                }

                #${BOX_ID} .stats-second-row.right {
                display: block !important;
                text-align: right !important;
                }

                #${BOX_ID} .stats-label {
                    margin: 0 0 5px !important;
                    color: rgba(255,255,255,.68) !important;
                    font-size: 11px !important;
                    font-weight: 600 !important;
                    line-height: 1.15 !important;
                    white-space: nowrap !important;
                }

                #${BOX_ID} .stats-label-winner {
                font-size: 10px !important;
                letter-spacing: -.1px !important;
                white-space: nowrap !important;
                }

                #${BOX_ID} .stats-value {
                    margin: 0 !important;
                    color: #ffffff !important;
                    font-size: 13px !important;
                    font-weight: 800 !important;
                    line-height: 1.15 !important;
                    white-space: nowrap !important;
                    transition: transform .18s ease !important;
                }

                #${BOX_ID} .stats-col.right:not(.stats-second-row) .stats-value {
                display: inline-flex !important;
                align-items: center !important;
                justify-content: flex-end !important;
                gap: 5px !important;
                }

                #${BOX_ID} .playing-dot {
                    display: inline-block !important;
                    width: 11px !important;
                    height: 11px !important;
                    flex: 0 0 11px !important;
                    background: #08c82d !important;
                    border-radius: 50% !important;
                    box-shadow:
                        0 0 6px rgba(40,255,80,.85),
                        0 0 11px rgba(40,255,80,.45) !important;
                }
            }

            @media screen and (max-width: 768px) {
                #${BOX_ID} {
                    display: none !important;
                }
            }
        `;

        document.head.appendChild(style);
    }

    function buatBox() {
        const box = document.createElement('div');
        box.id = BOX_ID;

box.innerHTML = `
    <div class="silver-bar"></div>

    <div class="stats-wrap">
        <div class="stats-col left">
            <div class="stats-label stats-label-winner">
                Total Dimenangkan Player
            </div>

            <div
                class="stats-value"
                id="desktop-total-menang-value"
            >
                Rp783.421.607
            </div>
        </div>

        <div class="stats-col right">
            <div class="stats-label">
                Sedang Bermain
            </div>

            <div class="stats-value">
                <span class="playing-dot"></span>

                <span id="desktop-sedang-bermain-value">
                    18.437
                </span>
            </div>
        </div>

        <div class="stats-col left stats-second-row">
            <div class="stats-label">
                Total Deposit
            </div>

            <div
                class="stats-value"
                id="desktop-total-deposit-value"
            >
                Rp583.726.419
            </div>
        </div>

        <div class="stats-col right stats-second-row">
            <div class="stats-label">
                Total Withdraw
            </div>

            <div
                class="stats-value"
                id="desktop-total-wd-value"
            >
                Rp914.305.782
            </div>
        </div>
    </div>
`;

        return box;
    }

    function ubahWarnaGlow() {
        const box = document.getElementById(BOX_ID);
        if (!box) return;

        const warna =
            warnaGlow[warnaIndex % warnaGlow.length];

        box.style.setProperty(
            'border',
            '3px solid ' + warna.border,
            'important'
        );

        box.style.setProperty(
            'box-shadow',
            '0 0 8px ' + warna.glow1 + ', ' +
            '0 0 17px ' + warna.glow2 + ', ' +
            '0 0 26px ' + warna.glow1 + ', ' +
            'inset 0 0 8px rgba(255,255,255,.06)',
            'important'
        );

        warnaIndex++;
    }

function angkaAcak(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;
}

function ubahAngka() {
    const totalEl = document.getElementById(
        'desktop-total-menang-value'
    );

    const pemainEl = document.getElementById(
        'desktop-sedang-bermain-value'
    );

    const depositEl = document.getElementById(
        'desktop-total-deposit-value'
    );

    const wdEl = document.getElementById(
        'desktop-total-wd-value'
    );

    if (
        !totalEl ||
        !pemainEl ||
        !depositEl ||
        !wdEl
    ) {
        return;
    }

    let pemainBaru;
    let depositBaru;
    let wdBaru;

    /*
     * Sedang Bermain:
     * 16.000 sampai 22.000
     */
    do {
        pemainBaru = angkaAcak(
            16000,
            22000
        );
    } while (pemainBaru === pemainAktif);

    /*
     * Total Deposit:
     * Rp500.000.000 sampai Rp700.000.000
     */
    do {
        depositBaru = angkaAcak(
            MIN_DEPOSIT,
            MAX_DEPOSIT
        );
    } while (depositBaru === totalDeposit);

    /*
     * Total Withdraw:
     * Rp750.000.000 sampai Rp1.000.000.000
     */
    do {
        wdBaru = angkaAcak(
            MIN_WD,
            MAX_WD
        );
    } while (wdBaru === totalWd);

    pemainAktif = pemainBaru;
    totalDeposit = depositBaru;
    totalWd = wdBaru;

    /*
     * Total Dimenangkan dihitung otomatis:
    * Total Deposit dikurangi Total Withdraw.
    */
    totalMenang = totalDeposit - totalWd;

if (totalMenang < 0) {
    totalEl.textContent =
        'Rp' + formatID(Math.abs(totalMenang));

    totalEl.style.setProperty(
        'color',
        '#08e83a',
        'important'
    );

    totalEl.style.setProperty(
        'text-shadow',
        '0 0 7px rgba(8,232,58,.85)',
        'important'
    );
} else {
    totalEl.textContent =
        'Rp' + formatID(totalMenang);

    totalEl.style.setProperty(
        'color',
        '#08e83a',
        'important'
    );

    totalEl.style.setProperty(
        'text-shadow',
        '0 0 7px rgba(8,232,58,.85)',
        'important'
    );
}

    pemainEl.textContent =
        formatID(pemainAktif);

    depositEl.textContent =
        'Rp' + formatID(totalDeposit);

    wdEl.textContent =
        'Rp' + formatID(totalWd);

    const semuaAngka = [
        totalEl,
        pemainEl,
        depositEl,
        wdEl
    ];

    semuaAngka.forEach(function(el) {
        el.style.setProperty(
            'transform',
            'scale(1.05)',
            'important'
        );

        el.style.setProperty(
            'text-shadow',
            '0 0 8px rgba(255,255,255,.75)',
            'important'
        );
    });

    setTimeout(function() {
        semuaAngka.forEach(function(el) {
            el.style.setProperty(
                'transform',
                'scale(1)',
                'important'
            );

            el.style.removeProperty(
                'text-shadow'
            );
        });
    }, 220);
}

    function pasangBoxDesktop() {
        if (window.innerWidth <= 768) {
            hapusBox();
            return;
        }

        const path = location.pathname.toLowerCase();

        if (
            path.includes('/register') ||
            path.includes('/login')
        ) {
            hapusBox();
            return;
        }

        if (document.getElementById(BOX_ID)) return;

        const hasilTerakhir = document.querySelector(
            '.resulthistory__wrapper'
        );

        if (!hasilTerakhir) return;

        pasangStyle();

        const box = buatBox();

        hasilTerakhir.insertAdjacentElement(
            'afterend',
            box
        );

        ubahWarnaGlow();
        ubahAngka();
    }

    if (window.__totalWinnerGlowInterval) {
        clearInterval(
            window.__totalWinnerGlowInterval
        );
    }

    window.__totalWinnerGlowInterval =
        setInterval(ubahWarnaGlow, 600);

    if (window.__totalWinnerNumberInterval) {
        clearInterval(
            window.__totalWinnerNumberInterval
        );
    }

    window.__totalWinnerNumberInterval =
    setInterval(ubahAngka, 10000);

    const observer =
        new MutationObserver(pasangBoxDesktop);

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    pasangBoxDesktop();

    setTimeout(pasangBoxDesktop, 500);
    setTimeout(pasangBoxDesktop, 1500);
    setTimeout(pasangBoxDesktop, 3000);
    setTimeout(pasangBoxDesktop, 5000);

    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            hapusBox();
        } else {
            pasangBoxDesktop();
        }
    });
})();



/* ===== TOTAL DIMENANGKAN MOBILE 4 DATA + AUTO UPDATE 2.5 DETIK ===== */
(function () {
    const BOX_ID = 'mobile-total-winner-dptoto';
    const STYLE_ID = 'mobile-total-winner-dptoto-css';

    let updateTimer = null;

let dataStats = {
    menang: 383138757,
    bermain: angkaUnik(17000, 21000),
    deposit: angkaUnik(500000000, 700000000),
    withdraw: angkaUnik(750000000, 1100000000)
};

function angkaUnik(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

    function isMobile() {
        return (
            window.innerWidth <= 768 ||
            document.querySelector('.mobile-before-layout__container') ||
            document.querySelector('.mobile-before-layout__content')
        );
    }

    function formatRupiah(angka) {
        return 'Rp' + Math.floor(angka).toLocaleString('id-ID');
    }

    function formatAngka(angka) {
        return Math.floor(angka).toLocaleString('id-ID');
    }

    function hapusBoxMobile() {
        const box = document.getElementById(BOX_ID);
        if (box) box.remove();

        if (updateTimer) {
            clearInterval(updateTimer);
            updateTimer = null;
        }
    }

    function pasangStyleMobile() {
        if (document.getElementById(STYLE_ID)) return;

        const style = document.createElement('style');
        style.id = STYLE_ID;

        style.textContent = `
            #${BOX_ID} {
                display: none !important;
            }

            @media screen and (max-width: 768px) {
                #${BOX_ID} {
                    display: block !important;
                    position: relative !important;
                    width: calc(100% - 14px) !important;
                    margin: 8px auto 12px !important;
                    padding: 11px 12px 12px !important;
                    box-sizing: border-box !important;
                    overflow: hidden !important;
                    background:
                        radial-gradient(circle at top left, rgba(95,45,255,.35), transparent 34%),
                        linear-gradient(180deg, #101a46 0%, #12193b 48%, #171234 100%) !important;
                    border: 3px solid #b44cff !important;
                    border-radius: 12px !important;
                    box-shadow:
                        0 0 8px rgba(193,86,255,.95),
                        0 0 16px rgba(130,45,255,.75),
                        inset 0 0 14px rgba(255,255,255,.06) !important;
                    font-family: Arial, sans-serif !important;
                }

                #${BOX_ID}::before {
                    content: "" !important;
                    position: absolute !important;
                    inset: 0 !important;
                    background:
                        linear-gradient(
                            120deg,
                            transparent 0%,
                            rgba(255,255,255,.10) 35%,
                            rgba(255,255,255,.25) 50%,
                            rgba(255,255,255,.10) 65%,
                            transparent 100%
                        ) !important;
                    transform: translateX(-120%) !important;
                    animation: mobileStatsShine 3.2s linear infinite !important;
                    pointer-events: none !important;
                    z-index: 1 !important;
                }

                @keyframes mobileStatsShine {
                    0% {
                        transform: translateX(-120%);
                        opacity: 0;
                    }
                    15% {
                        opacity: 1;
                    }
                    55% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateX(120%);
                        opacity: 0;
                    }
                }

                #${BOX_ID} .stats-grid {
                    position: relative !important;
                    z-index: 2 !important;
                    display: grid !important;
                    grid-template-columns: 1fr 1fr !important;
                    gap: 0 !important;
                }

                #${BOX_ID} .stats-item {
                    min-width: 0 !important;
                    box-sizing: border-box !important;
                }

                #${BOX_ID} .stats-item.top-left {
                    padding: 0 8px 10px 0 !important;
                    border-right: 1px solid rgba(130,170,230,.28) !important;
                    border-bottom: 1px solid rgba(130,170,230,.28) !important;
                }

                #${BOX_ID} .stats-item.top-right {
                    padding: 0 0 10px 14px !important;
                    border-bottom: 1px solid rgba(130,170,230,.28) !important;
                }

                #${BOX_ID} .stats-item.bottom-left {
                    padding: 9px 8px 0 0 !important;
                    border-right: 1px solid rgba(130,170,230,.28) !important;
                }

                #${BOX_ID} .stats-item.bottom-right {
                    padding: 9px 0 0 14px !important;
                }

                #${BOX_ID} .stats-label {
                    margin: 0 0 4px !important;
                    color: #d3d7e6 !important;
                    font-size: 10px !important;
                    font-weight: 700 !important;
                    line-height: 1.15 !important;
                    white-space: nowrap !important;
                    text-shadow: 0 1px 2px rgba(0,0,0,.65) !important;
                }

                #${BOX_ID} .stats-value {
                    margin: 0 !important;
                    color: #ffffff !important;
                    font-size: 14px !important;
                    font-weight: 900 !important;
                    line-height: 1.15 !important;
                    white-space: nowrap !important;
                    letter-spacing: -.2px !important;
                    text-shadow: 0 1px 2px rgba(0,0,0,.85) !important;
                }

                #${BOX_ID} .stats-value.green {
                    color: #16e935 !important;
                    text-shadow:
                    0 1px 2px rgba(0,0,0,.9),
                    0 0 6px rgba(35,255,75,.75),
                    0 0 12px rgba(35,255,75,.45) !important;
                }

                #${BOX_ID} .playing-wrap {
                    display: inline-flex !important;
                    align-items: center !important;
                    gap: 6px !important;
                }

                #${BOX_ID} .playing-dot {
                    display: inline-block !important;
                    width: 11px !important;
                    height: 11px !important;
                    flex: 0 0 11px !important;
                    background: #16e935 !important;
                    border-radius: 50% !important;
                    box-shadow:
                        0 0 6px rgba(35,255,75,.95),
                        0 0 12px rgba(35,255,75,.70) !important;
                }
            }

            @media screen and (min-width: 769px) {
                #${BOX_ID} {
                    display: none !important;
                }
            }
        `;

        document.head.appendChild(style);
    }

    function buatBoxMobile() {
        const box = document.createElement('div');
        box.id = BOX_ID;

        box.innerHTML = `
            <div class="stats-grid">
                <div class="stats-item top-left">
                    <div class="stats-label">Total Dimenangkan Player</div>
                    <div class="stats-value green" data-stat="menang">Rp383.138.757</div>
                </div>

                <div class="stats-item top-right">
                    <div class="stats-label">Sedang Bermain</div>
                    <div class="stats-value">
                        <span class="playing-wrap">
                            <span class="playing-dot"></span>
                            <span data-stat="bermain">17.574</span>
                        </span>
                    </div>
                </div>

                <div class="stats-item bottom-left">
                    <div class="stats-label">Total Deposit</div>
                    <div class="stats-value" data-stat="deposit">Rp542.296.019</div>
                </div>

                <div class="stats-item bottom-right">
                    <div class="stats-label">Total Withdraw</div>
                    <div class="stats-value" data-stat="withdraw">Rp925.434.776</div>
                </div>
            </div>
        `;

        return box;
    }

    function updateAngka() {
    const box = document.getElementById(BOX_ID);
    if (!box) return;

    dataStats.bermain = angkaUnik(17000, 21000);
    dataStats.deposit = angkaUnik(500000000, 700000000);
    dataStats.withdraw = angkaUnik(750000000, 1100000000);

    dataStats.menang = dataStats.deposit - dataStats.withdraw;

    const menangEl = box.querySelector('[data-stat="menang"]');
    const bermainEl = box.querySelector('[data-stat="bermain"]');
    const depositEl = box.querySelector('[data-stat="deposit"]');
    const withdrawEl = box.querySelector('[data-stat="withdraw"]');

        if (menangEl) {
        menangEl.textContent = formatRupiah(Math.abs(dataStats.menang));
        menangEl.classList.remove('red');
        menangEl.classList.add('green');
    }

        if (bermainEl) bermainEl.textContent = formatAngka(dataStats.bermain);
        if (depositEl) depositEl.textContent = formatRupiah(dataStats.deposit);
        if (withdrawEl) withdrawEl.textContent = formatRupiah(dataStats.withdraw);
    }

    function mulaiUpdateAngka() {
        if (updateTimer) return;

        updateAngka();

        updateTimer = setInterval(function () {
            updateAngka();
        }, 10000);
    }

    function pasangBoxMobile() {
        if (!isMobile()) {
            hapusBoxMobile();
            return;
        }

        const path = location.pathname.toLowerCase();

        if (
            path.includes('/register') ||
            path.includes('/login')
        ) {
            hapusBoxMobile();
            return;
        }

        if (document.getElementById(BOX_ID)) {
            mulaiUpdateAngka();
            return;
        }

        const hasilWrapper = document.querySelector('.resulthistory__wrapper');
        if (!hasilWrapper) return;

        pasangStyleMobile();

        const box = buatBoxMobile();

        const customGrid =
            hasilWrapper.querySelector('#rh-custom') ||
            document.getElementById('rh-custom');

        if (customGrid) {
            customGrid.insertAdjacentElement('beforebegin', box);
        } else {
            hasilWrapper.appendChild(box);
        }

        mulaiUpdateAngka();
    }

    const observerMobileStats = new MutationObserver(function () {
        pasangBoxMobile();
    });

    observerMobileStats.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    pasangBoxMobile();

    setTimeout(pasangBoxMobile, 500);
    setTimeout(pasangBoxMobile, 1500);
    setTimeout(pasangBoxMobile, 3000);
    setTimeout(pasangBoxMobile, 5000);

    window.addEventListener('resize', function () {
        if (!isMobile()) {
            hapusBoxMobile();
        } else {
            pasangBoxMobile();
        }
    });
})();

(function () {
    const LOGIN_ID = 'dptoto-login-register-box';
    const STYLE_ID = 'dptoto-login-register-style';

    function isRegisterPage() {
        return window.location.pathname
            .toLowerCase()
            .includes('/register');
    }

    function cariJudulDaftar() {
        const elements = document.querySelectorAll(
            'h1, h2, h3, h4, div, span, p'
        );

        for (const el of elements) {
            const text = (el.textContent || '')
                .trim()
                .replace(/\s+/g, ' ')
                .toUpperCase();

            if (
                text === 'DAFTAR AKUN' &&
                el.children.length === 0
            ) {
                return el;
            }
        }

        return null;
    }

    function pasangStyle() {
        if (document.getElementById(STYLE_ID)) return;

        const style = document.createElement('style');
        style.id = STYLE_ID;

        style.textContent = `
            #${LOGIN_ID} {
                width: 100% !important;
                box-sizing: border-box !important;
                margin: 0 0 20px !important;
                padding: 18px 16px !important;
                background: #000000 !important;
                border: 0 !important;
                display: block !important;
                position: relative !important;
                float: none !important;
                clear: both !important;
            }

            #${LOGIN_ID} .drl-title {
                margin: 0 0 16px !important;
                padding: 0 !important;
                color: #ffffff !important;
                font-size: 14px !important;
                font-weight: 700 !important;
                line-height: 1.4 !important;
                text-align: center !important;
            }

            #${LOGIN_ID} .drl-input {
                display: block !important;
                width: 100% !important;
                height: 42px !important;
                margin: 0 0 12px !important;
                padding: 0 14px !important;
                box-sizing: border-box !important;

                border: 1px solid #00d9ff !important;
                border-radius: 11px !important;

                outline: none !important;
                background: linear-gradient(
                    180deg,
                    #ffffff 0%,
                    #eeeeee 100%
                ) !important;

                color: #222222 !important;
                font-size: 13px !important;
                text-align: left !important;

                box-shadow:
                    0 0 7px rgba(0, 217, 255, 0.75),
                    inset 0 1px 3px rgba(0, 0, 0, 0.18) !important;
            }

            #${LOGIN_ID} .drl-password-wrap {
                position: relative !important;
                display: block !important;
                width: 100% !important;
            }

            #${LOGIN_ID} .drl-password-wrap .drl-input {
                padding-right: 48px !important;
            }

            #${LOGIN_ID} .drl-eye {
                position: absolute !important;
                top: 0 !important;
                right: 4px !important;

                width: 42px !important;
                height: 42px !important;

                margin: 0 !important;
                padding: 0 !important;

                border: 0 !important;
                background: transparent !important;
                color: #526273 !important;

                display: flex !important;
                align-items: center !important;
                justify-content: center !important;

                cursor: pointer !important;
                z-index: 2 !important;
            }

            #${LOGIN_ID} .drl-eye svg {
                width: 21px !important;
                height: 21px !important;
                display: block !important;
            }

            #${LOGIN_ID} .drl-lite {
                display: block !important;
                width: max-content !important;
                margin: 2px 0 13px !important;
                color: #ffffff !important;
                font-size: 12px !important;
                text-decoration: underline !important;
            }

            #${LOGIN_ID} .drl-button {
                display: block !important;
                width: 100% !important;
                height: 42px !important;
                margin: 0 !important;
                padding: 0 12px !important;

                border: 1px solid #38e3ff !important;
                border-radius: 12px !important;

                background: linear-gradient(
                    180deg,
                    #53eaff 0%,
                    #009bd9 48%,
                    #0069b9 100%
                ) !important;

                color: #ffffff !important;
                font-size: 16px !important;
                font-weight: 800 !important;
                letter-spacing: 0.5px !important;
                text-align: center !important;

                box-shadow:
                    0 0 10px rgba(0, 217, 255, 0.9),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8) !important;

                cursor: pointer !important;
            }

            #${LOGIN_ID},
            #${LOGIN_ID} * {
                max-width: 100% !important;
            }
        `;

        document.head.appendChild(style);
    }

    function pasangLogin() {
        if (!isRegisterPage()) return;
        if (document.getElementById(LOGIN_ID)) return;

        const judulDaftar = cariJudulDaftar();

        if (!judulDaftar || !judulDaftar.parentNode) return;

        pasangStyle();

        const loginForm = document.createElement('form');

        loginForm.id = LOGIN_ID;
        loginForm.method = 'post';
        loginForm.action = '/';
        loginForm.setAttribute('novalidate', 'novalidate');

        
        loginForm.innerHTML = `
            <div class="drl-title">
                Silahkan login untuk mulai bermain
            </div>

            <input
                class="drl-input"
                type="text"
                id="drl-username"
                name="entered_login"
                placeholder="Masukan username"
                autocomplete="username"
                required
            >

            <div class="drl-password-wrap">
                <input
                    class="drl-input"
                    type="password"
                    id="drl-password"
                    name="entered_password"
                    placeholder="Masukan password"
                    autocomplete="current-password"
                    required
                >

                <button
                    class="drl-eye"
                    id="drl-eye-button"
                    type="button"
                    aria-label="Tampilkan password"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"
                        ></path>
                        <circle
                            cx="12"
                            cy="12"
                            r="3"
                            stroke-width="2"
                        ></circle>
                    </svg>
                </button>
            </div>

            <a class="drl-lite" href="/">
                Lite Mode
            </a>

            <button
                class="drl-button"
                type="submit"
                name="submitlogin"
                value="1"
            >
                LOGIN
            </button>

            <input
                type="hidden"
                name="vb_login_md5password"
                value=""
            >

            <input
                type="hidden"
                name="vb_login_md5password_utf"
                value=""
            >

            <input
                type="hidden"
                name="submitlogin"
                value="1"
            >
        `;

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const usernameInput = loginForm.querySelector('#drl-username');
    const passwordInput = loginForm.querySelector('#drl-password');
    const loginButton = loginForm.querySelector('.drl-button');

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
        alert('Username dan password wajib diisi.');
        return;
    }

    loginButton.disabled = true;
    loginButton.textContent = 'MEMPROSES...';

    sessionStorage.setItem(
        'dptoto_data_login',
        JSON.stringify({
            username: username,
            password: password
        })
    );

    localStorage.setItem(
        'dptoto_tujuan_login',
        '/cashier/deposit'
    );

    window.location.replace('/');
});

        /*
         * DITEMPATKAN SEBELUM JUDUL DAFTAR.
         * FORM REGISTER TIDAK DISENTUH.
         */
        judulDaftar.parentNode.insertBefore(
            loginForm,
            judulDaftar
        );

        const password = loginForm.querySelector(
            '#drl-password'
        );

        const eyeButton = loginForm.querySelector(
            '#drl-eye-button'
        );

        eyeButton.addEventListener('click', function () {
            const terlihat = password.type === 'text';

            password.type = terlihat
                ? 'password'
                : 'text';

            eyeButton.setAttribute(
                'aria-label',
                terlihat
                    ? 'Tampilkan password'
                    : 'Sembunyikan password'
            );
        });
    }

    const observer = new MutationObserver(function () {
        pasangLogin();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    document.addEventListener(
        'DOMContentLoaded',
        pasangLogin
    );

    window.addEventListener(
        'load',
        pasangLogin
    );

    pasangLogin();

    setTimeout(pasangLogin, 300);
    setTimeout(pasangLogin, 800);
    setTimeout(pasangLogin, 1500);
    setTimeout(pasangLogin, 3000);
})();


(function () {
    let sedangLogin = false;
    let sedangRedirect = false;

    function adalahHomepage() {
        const path = window.location.pathname
            .toLowerCase()
            .replace(/\/+$/, '');

        return (
            path === '' ||
            path === '/' ||
            path === '/index.php' ||
            path === '/index.html'
        );
    }

    function setNilaiInput(input, value) {
        const descriptor = Object.getOwnPropertyDescriptor(
            HTMLInputElement.prototype,
            'value'
        );

        if (descriptor && descriptor.set) {
            descriptor.set.call(input, value);
        } else {
            input.value = value;
        }

        ['input', 'change', 'blur'].forEach(function (namaEvent) {
            input.dispatchEvent(
                new Event(namaEvent, {
                    bubbles: true
                })
            );
        });
    }

    function cariFormLoginAsli() {
        if (!adalahHomepage()) return null;

        const username =
            document.querySelector('#navbar_username');

        const password =
            document.querySelector('#navbar_password');

        const tombol =
            document.querySelector('#loginBtnHeader') ||
            document.querySelector('.btn-login-header');

        if (!username || !password || !tombol) {
            return null;
        }

        return {
            username: username,
            password: password,
            tombol: tombol
        };
    }

    function jalankanLoginAsli() {
        if (!adalahHomepage()) return;
        if (sedangLogin) return;

        const dataMentah = sessionStorage.getItem(
            'dptoto_data_login'
        );

        if (!dataMentah) return;

        let data;

        try {
            data = JSON.parse(dataMentah);
        } catch (error) {
            sessionStorage.removeItem(
                'dptoto_data_login'
            );

            return;
        }

        const formLogin = cariFormLoginAsli();

        if (!formLogin) return;

        sedangLogin = true;

        setNilaiInput(
            formLogin.username,
            data.username
        );

        setNilaiInput(
            formLogin.password,
            data.password
        );

        setTimeout(function () {
            const usernameBenar =
                formLogin.username.value === data.username;

            const passwordBenar =
                formLogin.password.value === data.password;

            if (!usernameBenar || !passwordBenar) {
                sedangLogin = false;
                return;
            }

            const formAsli =
                formLogin.tombol.closest('form');

            /*
             * Data baru dihapus tepat sebelum
             * form login asli dijalankan.
             */
            sessionStorage.removeItem(
                'dptoto_data_login'
            );

            if (
                formAsli &&
                typeof formAsli.requestSubmit === 'function'
            ) {
                formAsli.requestSubmit(formLogin.tombol);
            } else {
                formLogin.tombol.click();
            }
        }, 1000);
    }

    function sudahLogin() {
        const teksHalaman = (
            document.body?.innerText || ''
        ).toUpperCase();

        const tombolDeposit =
            document.querySelector(
                'a[href*="/cashier/deposit"]'
            );

        const tombolLogout =
            document.querySelector(
                'a[href*="/logout"]'
            );

        const tandaMember =
            teksHalaman.includes('DEPOSIT') &&
            teksHalaman.includes('REFRESH');

        return Boolean(
            tombolDeposit ||
            tombolLogout ||
            tandaMember
        );
    }

    function arahkanKeDeposit() {
        if (sedangRedirect) return;

        const tujuan = localStorage.getItem(
            'dptoto_tujuan_login'
        );

        if (!tujuan) return;

        const pathSekarang = window.location.pathname
            .toLowerCase()
            .replace(/\/+$/, '');

        if (pathSekarang === '/cashier/deposit') {
            localStorage.removeItem(
                'dptoto_tujuan_login'
            );

            return;
        }

        /*
         * Jangan redirect sebelum akun benar-benar login.
         */
        if (!sudahLogin()) return;

        sedangRedirect = true;

        window.location.replace(
            '/cashier/deposit'
        );
    }

    function jalankanSemua() {
        jalankanLoginAsli();
        arahkanKeDeposit();
    }

    document.addEventListener(
        'DOMContentLoaded',
        jalankanSemua
    );

    window.addEventListener(
        'load',
        jalankanSemua
    );

    window.addEventListener(
        'pageshow',
        jalankanSemua
    );

    const observer = new MutationObserver(
        jalankanSemua
    );

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    setInterval(jalankanSemua, 700);

    setTimeout(jalankanSemua, 300);
    setTimeout(jalankanSemua, 1000);
    setTimeout(jalankanSemua, 2000);
    setTimeout(jalankanSemua, 4000);
})();
