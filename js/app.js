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

  function renderSearchResults(results, searchInfo) {
    const container = document.getElementById('flight-search-results');
    if (!container) return;

    if (!results || results.length === 0) {
      container.innerHTML = `
        <div class="search-results-empty">
          No flights found for ${searchInfo.origin} → ${searchInfo.destination} on ${searchInfo.departDate}.
        </div>
      `;
      container.classList.remove('hidden');
      return;
    }

    const cards = results.map(flight => `
      <div class="result-card">
        <div class="result-card-top">
          <div>${flight.id}</div>
          <div>${flight.time}</div>
        </div>
        <div class="result-route">${flight.source} → ${flight.destination}</div>
        <div class="result-date">Date: ${flight.date}</div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="search-results-header">
        Showing ${results.length} matching flight${results.length > 1 ? 's' : ''} for ${searchInfo.origin} → ${searchInfo.destination} on ${searchInfo.departDate}
      </div>
      <div class="search-results-grid">
        ${cards}
      </div>
    `;
    container.classList.remove('hidden');
  }

  function searchFlights() {
    const origin = document.getElementById('origin-input')?.value.trim();
    const destination = document.getElementById('destination-input')?.value.trim();
    const departDate = document.getElementById('depart-date-input')?.value;
    const travelClass = document.getElementById('travel-class-select')?.value;

    if (!origin || !destination || !departDate || !travelClass) {
      showToast('Please complete all required search fields.', 'warning');
      return;
    }

    const flights = DB.getTable('flights') || [];
    const results = flights.filter(flight =>
      flight.source.toLowerCase() === origin.toLowerCase() &&
      flight.destination.toLowerCase() === destination.toLowerCase()
    );

    if (results.length) {
      showToast(`${results.length} flight${results.length > 1 ? 's' : ''} found. Showing results.`, 'success');
    } else {
      showToast('No flights found. Try a different route.', 'error');
    }

    renderSearchResults(results, { origin, destination, departDate, travelClass });
  }

  function init() {
    initMobileMenu();
    updateDashboardStats();
  }

  return { init, showToast, validateForm, updateDashboardStats, searchFlights };
})();

document.addEventListener('DOMContentLoaded', App.init);
