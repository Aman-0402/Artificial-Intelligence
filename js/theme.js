/**
 * THEME SYSTEM
 * Manages dark / light mode toggle.
 * Persists choice in localStorage.
 * Notifies topic iframes via storage event.
 */

const ThemeManager = (() => {
  const STORAGE_KEY = 'ai-theme';
  const DARK  = 'dark';
  const LIGHT = 'light';

  let currentTheme = DARK;

  /** Apply theme to <html> element and update toggle button icons */
  function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    const btn      = document.getElementById('theme-toggle');
    const iconMoon = btn?.querySelector('.icon-moon');
    const iconSun  = btn?.querySelector('.icon-sun');

    if (theme === LIGHT) {
      if (iconMoon) iconMoon.style.display = 'none';
      if (iconSun)  iconSun.style.display  = 'flex';
    } else {
      if (iconMoon) iconMoon.style.display = 'flex';
      if (iconSun)  iconSun.style.display  = 'none';
    }

    // Notify iframe of theme change via storage event (same origin on file://)
    // The iframe's own theme.js reads localStorage on 'storage' event.
    // We manually dispatch so same-window storage also fires for iframe.
    try {
      const iframe = document.getElementById('content-frame');
      if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage({ type: 'theme-change', theme }, '*');
      }
    } catch (_) { /* cross-origin guard (shouldn't happen on file://) */ }
  }

  /** Toggle between dark and light */
  function toggle() {
    applyTheme(currentTheme === DARK ? LIGHT : DARK);
  }

  /** Read saved theme from localStorage and apply */
  function init() {
    const saved = localStorage.getItem(STORAGE_KEY) || DARK;
    applyTheme(saved);

    document.getElementById('theme-toggle')?.addEventListener('click', toggle);
  }

  return { init, applyTheme, toggle, get current() { return currentTheme; } };
})();
