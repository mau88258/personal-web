/**
 * Neil Chen 個人網站 — 內容由 data/content.json（中文）與 data/content-en.json（英文）驅動。
 * 改內容只改那兩個 JSON；改完跑 node scripts/check-translation.js。
 */
(function () {
    'use strict';

    const VERSION = '20261112';
    const SOURCES = { 'zh-TW': 'data/content.json', en: 'data/content-en.json' };
    const store = {
        get(key) { try { return localStorage.getItem(key); } catch (e) { return null; } },
        set(key, value) { try { localStorage.setItem(key, value); } catch (e) { /* 私密視窗等：略過 */ } }
    };

    const content = {};
    let lang = store.get('lang') === 'en' ? 'en' : 'zh-TW';
    let firstRender = true;
    let spy = null;
    let revealer = null;

    const app = document.getElementById('app');

    const esc = (value) => String(value == null ? '' : value)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    const list = (items, fn) => (items || []).map(fn).join('');
    const chips = (items) => `<ul class="chips">${list(items, (s) => `<li>${esc(s)}</li>`)}</ul>`;
    const pad = (n) => String(n).padStart(2, '0');

    function sectionHead(index, label, title, intro) {
        return `
        <header class="sec-head reveal">
            <p class="sec-label"><span>${pad(index)}</span>${esc(label)}</p>
            <h2>${esc(title)}</h2>
            ${intro ? `<p class="sec-intro">${esc(intro)}</p>` : ''}
        </header>`;
    }

    function renderHero(c) {
        const h = c.hero;
        return `
        <section class="hero">
            <div class="hero-bg" aria-hidden="true"></div>
            <div class="wrap hero-grid">
                <div class="hero-copy">
                    <p class="eyebrow">${esc(h.eyebrow)}</p>
                    <p class="hero-name">${esc(h.name)} <span>${esc(h.nameAlt)}</span></p>
                    <h1>${esc(h.headline)}</h1>
                    <p class="lead">${esc(h.lead)}</p>
                    <div class="cta">
                        <a class="btn btn-primary" href="#ai-projects">${esc(h.ctaPrimary)}<span aria-hidden="true">→</span></a>
                        <a class="btn btn-ghost" href="#contact">${esc(h.ctaSecondary)}</a>
                    </div>
                    <p class="status"><i aria-hidden="true"></i>${esc(h.status)}</p>
                </div>
                <figure class="portrait">
                    <img src="images/profile.jpg?v=${VERSION}" alt="${esc(h.name)}" width="560" height="700">
                </figure>
            </div>
            <div class="wrap">
                <dl class="stats">
                    ${list(c.stats, (s) => `
                    <div class="stat">
                        <dt>${esc(s.label)}</dt>
                        <dd class="stat-value">${esc(s.value)}</dd>
                        <dd class="stat-note">${esc(s.note)}</dd>
                    </div>`)}
                </dl>
            </div>
        </section>`;
    }

    function renderAbout(c) {
        const a = c.about;
        const cap = c.capabilities;
        return `
        <section class="sec" id="about">
            <div class="wrap">
                ${sectionHead(1, a.label, a.title, a.intro)}
                <div class="pillars">
                    ${list(a.pillars, (p, i) => `
                    <article class="pillar reveal">
                        <span class="pillar-no">${pad(i + 1)}</span>
                        <h3>${esc(p.title)}</h3>
                        <p>${esc(p.body)}</p>
                        <ul class="ticks">${list(p.points, (x) => `<li>${esc(x)}</li>`)}</ul>
                    </article>`)}
                </div>
                <h3 class="sub-title reveal">${esc(cap.title)}</h3>
                <div class="caps">
                    ${list(cap.groups, (g) => `
                    <div class="cap reveal">
                        <h4>${esc(g.name)}</h4>
                        <p>${esc(g.summary)}</p>
                        ${chips(g.items)}
                    </div>`)}
                </div>
            </div>
        </section>`;
    }

    function fleetDiagram(d) {
        const box = (title, items, cls) => `
            <div class="fd-box ${cls || ''}">
                <strong>${esc(title)}</strong>
                <ul>${list(items, (x) => `<li>${esc(x)}</li>`)}</ul>
            </div>`;
        const arrow = '<span class="fd-arrow" aria-hidden="true"></span>';
        return `
        <div class="diagram fleet-diagram">
            <div class="fd-row">
                ${box(d.inputsTitle, d.inputs)}${arrow}
                ${box(d.supervisorTitle, d.supervisor, 'is-key')}${arrow}
                ${box(d.workersTitle, d.workers, 'is-key')}${arrow}
                ${box(d.outputsTitle, d.outputs)}
            </div>
            <p class="fd-gate">${esc(d.gate)}</p>
        </div>`;
    }

    function pipelineDiagram(p) {
        return `
        <ol class="diagram pipeline">
            ${list(p.steps, (s, i) => `
            <li>
                <span class="pl-no">${pad(i + 1)}</span>
                <strong>${esc(s.name)}</strong>
                <span class="pl-desc">${esc(s.desc)}</span>
            </li>`)}
        </ol>`;
    }

    function renderAI(c) {
        const ai = c.ai;
        const diagrams = {
            fleet: () => fleetDiagram(ai.fleetDiagram),
            pipeline: () => pipelineDiagram(ai.pipeline)
        };
        return `
        <section class="sec sec-alt" id="ai-projects">
            <div class="wrap">
                ${sectionHead(2, ai.label, ai.title, ai.intro)}
                <div class="cases">
                    ${list(ai.featured, (f) => `
                    <article class="case reveal${f.diagram ? ' case-wide' : ''}" id="case-${esc(f.id)}">
                        <div class="case-body">
                            <span class="tag">${esc(f.tag)}</span>
                            <h3>${esc(f.title)}</h3>
                            <p class="case-summary">${esc(f.summary)}</p>
                            <ul class="ticks">${list(f.bullets, (b) => `<li>${esc(b)}</li>`)}</ul>
                            ${f.metrics && f.metrics.length ? `
                            <dl class="metrics">
                                ${list(f.metrics, (m) => `<div><dd>${esc(m.value)}</dd><dt>${esc(m.label)}</dt></div>`)}
                            </dl>` : ''}
                            ${chips(f.stack)}
                        </div>
                        ${f.diagram && diagrams[f.diagram] ? `<div class="case-visual">${diagrams[f.diagram]()}</div>` : ''}
                    </article>`)}
                </div>

                <h3 class="sub-title reveal">${esc(ai.more.title)}</h3>
                <div class="more">
                    ${list(ai.more.items, (m) => `
                    <article class="more-item reveal">
                        <h4>${esc(m.title)}</h4>
                        <p>${esc(m.desc)}</p>
                        ${chips(m.stack)}
                    </article>`)}
                </div>

                <h3 class="sub-title reveal">${esc(ai.timeline.title)}</h3>
                <ol class="timeline">
                    ${list(ai.timeline.items, (t) => `
                    <li class="reveal">
                        <span class="tl-when">${esc(t.when)}</span>
                        <div><strong>${esc(t.title)}</strong><p>${esc(t.desc)}</p></div>
                    </li>`)}
                </ol>
            </div>
        </section>`;
    }

    function renderExperience(c) {
        const e = c.experience;
        return `
        <section class="sec" id="experience">
            <div class="wrap">
                ${sectionHead(3, e.label, e.title)}
                <div class="jobs">
                    ${list(e.jobs, (j) => `
                    <article class="job reveal">
                        <header class="job-head">
                            <div>
                                <h3>${esc(j.company)}</h3>
                                <p class="job-role">${esc(j.role)}</p>
                            </div>
                            <span class="job-period">${esc(j.period)}</span>
                        </header>
                        <p class="job-summary">${esc(j.summary)}</p>
                        ${j.duties.length ? `<ul class="ticks duties">${list(j.duties, (d) => `<li>${esc(d)}</li>`)}</ul>` : ''}
                        ${j.areas.length ? `
                        <h4 class="mini-title">${esc(j.areasTitle)}</h4>
                        <div class="areas">
                            ${list(j.areas, (a) => `<div class="area"><strong>${esc(a.name)}</strong><span>${esc(a.desc)}</span></div>`)}
                        </div>` : ''}
                    </article>`)}
                </div>

                <div class="bg-grid">
                    <div class="bg-col reveal">
                        <h3 class="mini-title">${esc(e.education.title)}</h3>
                        ${list(e.education.items, (s) => `
                        <div class="bg-item">
                            <span class="bg-when">${esc(s.period)}</span>
                            <strong>${esc(s.school)}</strong>
                            <span class="bg-main">${esc(s.degree)}</span>
                            <p>${esc(s.note)}</p>
                        </div>`)}
                    </div>
                    <div class="bg-col reveal">
                        <h3 class="mini-title">${esc(e.awards.title)}</h3>
                        ${list(e.awards.items, (a) => `
                        <div class="bg-item">
                            <span class="bg-when">${esc(a.year)}</span>
                            <strong>${esc(a.name)}</strong>
                            <span class="bg-main">${esc(a.rank)}</span>
                        </div>`)}
                    </div>
                    <div class="bg-col reveal">
                        <h3 class="mini-title">${esc(e.training.title)}</h3>
                        ${list(e.training.items, (t) => `
                        <div class="bg-item">
                            <span class="bg-when">${esc(t.year)}</span>
                            <span class="bg-main">${esc(t.name)}</span>
                        </div>`)}
                    </div>
                </div>
            </div>
        </section>`;
    }

    function renderContact(c) {
        const k = c.contact;
        return `
        <section class="sec sec-alt" id="contact">
            <div class="wrap">
                <div class="contact reveal">
                    <div class="contact-copy">
                        <p class="sec-label"><span>04</span>${esc(k.label)}</p>
                        <h2>${esc(k.title)}</h2>
                        <p class="sec-intro">${esc(k.intro)}</p>
                        <a class="contact-mail" href="mailto:${esc(k.email)}">${esc(k.email)}</a>
                        <div class="cta">
                            <a class="btn btn-primary" href="mailto:${esc(k.email)}">${esc(k.emailLabel)}<span aria-hidden="true">→</span></a>
                            <a class="btn btn-ghost" href="${esc(k.linkedin)}" target="_blank" rel="noopener noreferrer">${esc(k.linkedinLabel)}</a>
                            <a class="btn btn-ghost" href="${esc(k.line)}" target="_blank" rel="noopener noreferrer">${esc(k.lineLabel)}</a>
                        </div>
                    </div>
                    <figure class="qr">
                        <img src="images/line-qr.png" alt="Line QR Code" width="148" height="148">
                        <figcaption>${esc(k.qrHint)}</figcaption>
                    </figure>
                </div>
            </div>
        </section>`;
    }

    function render() {
        const c = content[lang];
        document.documentElement.lang = lang;
        document.title = c.meta.title;
        const desc = document.querySelector('meta[name="description"]');
        if (desc) desc.setAttribute('content', c.meta.description);

        document.querySelectorAll('[data-nav]').forEach((a) => { a.textContent = c.nav[a.dataset.nav]; });
        document.querySelector('[data-bind="brand"]').textContent = c.hero.name;
        document.querySelectorAll('[data-lang]').forEach((b) => {
            b.classList.toggle('active', b.dataset.lang === lang);
            b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
        });
        document.getElementById('footer-copy').textContent = c.footer.copyright;
        document.getElementById('footer-built').textContent = c.footer.built;

        app.innerHTML = renderHero(c) + renderAbout(c) + renderAI(c) + renderExperience(c) + renderContact(c);

        setupReveal();
        setupSpy();
        firstRender = false;
    }

    function setupReveal() {
        if (revealer) revealer.disconnect();
        const items = app.querySelectorAll('.reveal');
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!firstRender || reduce || !('IntersectionObserver' in window)) {
            items.forEach((el) => el.classList.add('in'));
            return;
        }
        revealer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    revealer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
        items.forEach((el) => revealer.observe(el));
    }

    function setupSpy() {
        if (spy) spy.disconnect();
        if (!('IntersectionObserver' in window)) return;
        const links = {};
        document.querySelectorAll('.nav-links a').forEach((a) => { links[a.getAttribute('href').slice(1)] = a; });
        spy = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                Object.values(links).forEach((a) => a.classList.remove('active'));
                const link = links[entry.target.id];
                if (link) link.classList.add('active');
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        app.querySelectorAll('section[id]').forEach((s) => spy.observe(s));
    }

    function scrollToHash() {
        if (location.hash.length < 2) return;
        let target = null;
        try { target = document.querySelector(location.hash); } catch (e) { return; }
        if (target) target.scrollIntoView();
    }

    function setupChrome() {
        const nav = document.getElementById('nav');
        const menuBtn = document.getElementById('menu-btn');
        const closeMenu = () => {
            nav.classList.remove('open');
            menuBtn.setAttribute('aria-expanded', 'false');
        };

        document.querySelectorAll('[data-lang]').forEach((b) => {
            b.addEventListener('click', () => {
                if (b.dataset.lang === lang || !content[b.dataset.lang]) return;
                lang = b.dataset.lang;
                store.set('lang', lang);
                const y = window.scrollY;
                render();
                window.scrollTo(0, y);
            });
        });

        document.getElementById('theme-toggle').addEventListener('click', () => {
            const root = document.documentElement;
            const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            root.setAttribute('data-theme', next);
            store.set('theme', next);
        });

        menuBtn.addEventListener('click', () => {
            const open = nav.classList.toggle('open');
            menuBtn.setAttribute('aria-expanded', String(open));
        });
        document.getElementById('nav-links').addEventListener('click', (e) => {
            if (e.target.closest('a')) closeMenu();
        });

        const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    function loadAll() {
        return Promise.all(Object.keys(SOURCES).map((key) =>
            fetch(`${SOURCES[key]}?v=${VERSION}`, { cache: 'no-cache' })
                .then((res) => {
                    if (!res.ok) throw new Error(`${SOURCES[key]} → HTTP ${res.status}`);
                    return res.json();
                })
                .then((json) => { content[key] = json; })
        ));
    }

    setupChrome();
    loadAll().then(() => {
        render();
        scrollToHash();
    }).catch((err) => {
        console.error(err);
        app.innerHTML = `<p class="loading">內容載入失敗（${esc(err.message)}）。本機預覽請用 HTTP server 開啟，例如 <code>python3 -m http.server 8080</code>。</p>`;
    });
})();
