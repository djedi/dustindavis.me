/* Theme switcher, digital rain + mobile nav — dustindavis.me */
(() => {
  const root = document.documentElement;
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function getPref() {
    try {
      const t = localStorage.getItem('theme');
      return t === 'light' || t === 'dark' ? t : 'system';
    } catch {
      return 'system';
    }
  }

  function applyTheme(pref) {
    const t = pref === 'system' ? (darkQuery.matches ? 'dark' : 'light') : pref;
    root.setAttribute('data-theme', t);
    document.dispatchEvent(new Event('themechange'));
  }

  function setPref(pref) {
    try {
      if (pref === 'system') localStorage.removeItem('theme');
      else localStorage.setItem('theme', pref);
    } catch {
      // localStorage can be unavailable in private/sandboxed contexts
    }
    applyTheme(pref);
  }

  // Seasonal theme (Matrix, Halloween, ...). Helpers come from the inline
  // head script (_includes/theme-head.njk) that applies the theme before paint.
  let holidayRequest = 0;
  function applyHoliday(name) {
    const request = ++holidayRequest;
    const done = () => {
      // ignore a slow stylesheet if the visitor has since picked another theme
      if (request !== holidayRequest) return;
      root.setAttribute('data-holiday', name);
      document.dispatchEvent(new Event('themechange'));
    };
    document.getElementById('holiday-css')?.remove();
    if (name === 'matrix') return done();
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.id = 'holiday-css';
    link.href = window.siteThemes.cssHref(name);
    link.onload = done;
    link.onerror = done;
    document.head.appendChild(link);
  }

  function setHoliday(choice) {
    const themes = window.siteThemes;
    try {
      // A pick lasts until the season changes, then the calendar takes over again
      if (choice === 'auto') localStorage.removeItem('holiday');
      else localStorage.setItem('holiday', JSON.stringify({ name: choice, until: themes.nextBoundary() }));
    } catch {
      // localStorage can be unavailable in private/sandboxed contexts
    }
    // apply the pick directly so it still works for this page if storage failed
    applyHoliday(choice === 'auto' ? themes.auto() : choice);
  }

  darkQuery.addEventListener('change', () => {
    if (getPref() === 'system') applyTheme('system');
  });

  // Background effects (rain + scanlines) can be switched off per visitor
  function effectsOn() {
    return root.getAttribute('data-effects') !== 'off';
  }
  function setEffects(on) {
    try {
      if (on) localStorage.removeItem('effects');
      else localStorage.setItem('effects', 'off');
    } catch {
      // localStorage can be unavailable in private/sandboxed contexts
    }
    if (on) root.removeAttribute('data-effects');
    else root.setAttribute('data-effects', 'off');
    if (on) startRain();
  }

  // Subtle "digital rain" in the page margins
  let rainStarted = false;
  function startRain() {
    if (rainStarted || !effectsOn()) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    rainStarted = true;
    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-rain';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');
    const size = 16;
    const defaultChars = 'アイウエオカキクケコサシスセソ0123456789ABCDEF';
    let chars = Array.from(defaultChars);
    let drops = [];
    let colors = {};

    function readColors() {
      const cs = getComputedStyle(root);
      colors = { rain: cs.getPropertyValue('--rain'), fade: cs.getPropertyValue('--rain-fade') };
      // Themes can swap the glyphs via --rain-chars: "...";
      const custom = cs
        .getPropertyValue('--rain-chars')
        .trim()
        .replace(/^["']|["']$/g, '');
      chars = Array.from(custom || defaultChars);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drops = Array.from({ length: Math.ceil(canvas.width / size) }, () => Math.random() * -100);
    }
    function draw() {
      if (document.hidden) return;
      ctx.fillStyle = colors.fade;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = colors.rain;
      ctx.font = `${size}px monospace`;
      drops.forEach((d, i) => {
        ctx.fillText(chars[(Math.random() * chars.length) | 0], i * size, d * size);
        drops[i] = d * size > canvas.height && Math.random() > 0.975 ? 0 : d + 1;
      });
    }

    resize();
    readColors();
    window.addEventListener('resize', resize);
    document.addEventListener('themechange', readColors);
    setInterval(draw, 85);

    // On article pages, dim the rain a little once the reader settles in
    if (document.body.dataset.rain === 'intro') {
      setTimeout(() => canvas.classList.add('matrix-rain--settled'), 6000);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const pref = getPref();
    document.querySelectorAll('.theme-switch input').forEach(input => {
      input.checked = input.value === pref;
      input.addEventListener('change', () => setPref(input.value));
    });

    const holidaySelect = document.getElementById('holiday-select');
    if (holidaySelect && window.siteThemes) {
      holidaySelect.value = window.siteThemes.saved() || 'auto';
      holidaySelect.addEventListener('change', () => setHoliday(holidaySelect.value));
    }

    const fxToggle = document.getElementById('fx-toggle');
    if (fxToggle) {
      fxToggle.setAttribute('aria-pressed', effectsOn() ? 'true' : 'false');
      fxToggle.addEventListener('click', () => {
        const on = !effectsOn();
        setEffects(on);
        fxToggle.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }

    startRain();

    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
        const open = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }
  });
})();
