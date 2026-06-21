/* ============================================================
   THEME.JS — Dark/Light Mode Toggle with localStorage
   ============================================================ */

const ThemeManager = (() => {
  const STORAGE_KEY = 'flight-booking-theme';

  /** Initialize theme from localStorage or system preference */
  function init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setTheme(saved, false);
    } else {
      // Default to dark
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light', false);
    }
    // Build toggle button UI
    renderToggle();
  }

  /** Apply theme to document */
  function setTheme(theme, animate = true) {
    if (animate) {
      document.body.style.transition = 'background 0.5s ease, color 0.5s ease';
    }
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleUI(theme);
  }

  /** Get current theme */
  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  /** Toggle between light and dark */
  function toggle() {
    const current = getTheme();
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  /** Render the toggle switch in the navbar */
  function renderToggle() {
    const toggleWrappers = document.querySelectorAll('.theme-toggle');
    toggleWrappers.forEach(wrapper => {
      wrapper.addEventListener('click', toggle);
      updateToggleUI(getTheme());
    });
  }

  /** Update toggle UI to reflect current theme */
  function updateToggleUI(theme) {
    const toggles = document.querySelectorAll('.theme-toggle');
    toggles.forEach(el => {
      const knob = el.querySelector('.theme-toggle-knob');
      if (theme === 'dark') {
        el.classList.add('dark');
        if (knob) knob.textContent = '🌙';
      } else {
        el.classList.remove('dark');
        if (knob) knob.textContent = '☀️';
      }
    });
  }

  return { init, toggle, getTheme, setTheme };
})();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', ThemeManager.init);
