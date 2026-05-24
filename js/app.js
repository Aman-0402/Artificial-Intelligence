/**
 * APP INIT — Orchestrator
 * Boots all modules in correct order after DOM ready.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme (must be first — prevents flash of wrong theme)
  ThemeManager.init();

  // 2. Sidebar (renders nav tree + wires events)
  SidebarManager.init();

  // 3. Navigation (iframe loading + message bus + hash routing)
  NavigationManager.init();

  // 4. TTS
  if (typeof TTSManager !== 'undefined') TTSManager.init();

  // 5. Particles (canvas background — low priority)
  if (typeof ParticleManager !== 'undefined') ParticleManager.init();

  // 6. Search overlay toggle
  initSearchOverlay();
});

/* ------------------------------------------------
   SEARCH OVERLAY
   Header search button opens/closes full overlay.
------------------------------------------------ */
function initSearchOverlay() {
  const toggle  = document.getElementById('search-toggle');
  const overlay = document.getElementById('search-overlay');
  const input   = document.getElementById('search-input');

  toggle?.addEventListener('click', () => {
    const isOpen = overlay?.classList.toggle('is-open');
    overlay?.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    if (isOpen) {
      input?.focus();
    }
  });

  // Close on ESC
  input?.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      overlay?.classList.remove('is-open');
      overlay?.setAttribute('aria-hidden', 'true');
      toggle?.focus();
    }
    // Navigate to first result on Enter
    if (e.key === 'Enter') {
      const query = input.value.toLowerCase().trim();
      if (!query) return;
      const match = Array.from(document.querySelectorAll('.nav-leaf'))
        .find(l => l.textContent.toLowerCase().includes(query));
      if (match) {
        match.click();
        overlay?.classList.remove('is-open');
        overlay?.setAttribute('aria-hidden', 'true');
        input.value = '';
      }
    }
  });

  // Also filter sidebar as user types in header search
  input?.addEventListener('input', () => {
    const sidebarInput = document.getElementById('sidebar-search');
    if (sidebarInput) {
      sidebarInput.value = input.value;
      sidebarInput.dispatchEvent(new Event('input'));
    }
  });
}
