/* ============================================================
   APP.JS — Main Application Logic (UI, Toasts, Forms)
   ============================================================ */

const App = (() => {

  /* ── Toasts / Notifications ────────────────────────────── */
  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = '✓';
    if (type === 'error') icon = '✕';
    if (type === 'warning') icon = '⚠';
    if (type === 'info') icon = 'ℹ';

    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-message">${message}</div>
      <div class="toast-close">&times;</div>
    `;

    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
      closeToast(toast);
    });

    // Auto close
    setTimeout(() => closeToast(toast), 4000);
  }

  function closeToast(toast) {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  }

  /* ── Mobile Menu ───────────────────────────────────────── */
  function initMobileMenu() {
    const hamburger = document.querySelector('.nav-hamburger');
    const menu = document.querySelector('.nav-menu');
    
    if (!hamburger || !menu) return;

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      menu.classList.toggle('active');
      document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    // Handle mobile dropdowns
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      if (item.querySelector('.nav-dropdown')) {
        item.addEventListener('click', (e) => {
          if (window.innerWidth <= 768) {
            // Only toggle if clicked on the link, not the dropdown itself
            if (e.target.closest('.nav-link')) {
              e.preventDefault();
              item.classList.toggle('open');
            }
          }
        });
      }
    });
  }

  /* ── Update Dashboard Stats ────────────────────────────── */
  function updateDashboardStats() {
    const stats = DB.getStats();
    
    const countPassengers = document.getElementById('count-passengers');
    const countFlights = document.getElementById('count-flights');
    const countBookings = document.getElementById('count-bookings');
    const countAgencies = document.getElementById('count-agencies');

    if (countPassengers) countPassengers.setAttribute('data-count', stats.passengers);
    if (countFlights) countFlights.setAttribute('data-count', stats.flights);
    if (countBookings) countBookings.setAttribute('data-count', stats.bookings);
    if (countAgencies) countAgencies.setAttribute('data-count', stats.agencies);

    // If already revealed, re-animate
    if (countPassengers && countPassengers.classList.contains('active')) {
       AnimationEngine.animateCounter(countPassengers);
       AnimationEngine.animateCounter(countFlights);
       AnimationEngine.animateCounter(countBookings);
       AnimationEngine.animateCounter(countAgencies);
    }
  }

  /* ── Form Validations ──────────────────────────────────── */
  function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    let isValid = true;
    const inputs = form.querySelectorAll('input[required], select[required]');
    
    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add('shake');
        input.style.borderColor = 'var(--danger)';
        setTimeout(() => input.classList.remove('shake'), 500);
      } else {
        input.style.borderColor = '';
      }
    });

    return isValid;
  }

  function init() {
    initMobileMenu();
    updateDashboardStats();
  }

  return { init, showToast, validateForm, updateDashboardStats };
})();

document.addEventListener('DOMContentLoaded', App.init);
