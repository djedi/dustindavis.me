/* Theme toggle + mobile nav — dustindavis.me */
(() => {
  const root = document.documentElement;

  function setTheme(t) {
    root.setAttribute('data-theme', t);
    try {
      localStorage.setItem('theme', t);
    } catch {
      // localStorage can be unavailable in private/sandboxed contexts
    }
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.textContent = t === 'dark' ? '☀' : '☾';
      btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const current = root.getAttribute('data-theme') || 'light';
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.textContent = current === 'dark' ? '☀' : '☾';
      btn.addEventListener('click', () => {
        setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
      });
    }

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
