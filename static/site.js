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

  darkQuery.addEventListener('change', () => {
    if (getPref() === 'system') applyTheme('system');
  });

  // Subtle "digital rain" behind the page
  function startRain() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-rain';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');
    const size = 16;
    const chars = 'アイウエオカキクケコサシスセソ0123456789ABCDEF';
    let drops = [];
    let colors = {};

    function readColors() {
      const cs = getComputedStyle(root);
      colors = { rain: cs.getPropertyValue('--rain'), fade: cs.getPropertyValue('--rain-fade') };
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
    setInterval(draw, 70);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const pref = getPref();
    document.querySelectorAll('.theme-switch input').forEach(input => {
      input.checked = input.value === pref;
      input.addEventListener('change', () => setPref(input.value));
    });

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
