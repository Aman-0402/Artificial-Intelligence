/**
 * SIDEBAR SYSTEM
 * Renders accordion nav from TOPICS data.
 * Handles: open/close, active state, search filter, mobile overlay.
 */

const SidebarManager = (() => {
  let activeTopicId = null;

  /* ------------------------------------------------
     RENDER NAV TREE
  ------------------------------------------------ */
  function render() {
    const tree = document.getElementById('nav-tree');
    if (!tree || typeof TOPICS === 'undefined') return;

    tree.innerHTML = TOPICS.map(group => `
      <div class="nav-group" id="group-${group.id}" data-group="${group.id}">
        <button class="nav-group__toggle" aria-expanded="false" aria-controls="children-${group.id}">
          <span class="nav-group__icon" aria-hidden="true">${group.icon}</span>
          <span class="nav-group__label">${group.label}</span>
          <svg class="nav-group__arrow" width="12" height="12" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div class="nav-group__children" id="children-${group.id}" role="list">
          ${group.children.map(leaf => `
            <button
              class="nav-leaf"
              data-id="${leaf.id}"
              data-file="${leaf.file}"
              role="listitem"
              aria-current="false"
            >${leaf.label}</button>
          `).join('')}
        </div>
      </div>
    `).join('');

    attachGroupToggles();
    attachLeafClicks();
  }

  /* ------------------------------------------------
     ACCORDION TOGGLE
  ------------------------------------------------ */
  function attachGroupToggles() {
    document.querySelectorAll('.nav-group__toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.closest('.nav-group');
        const isOpen = group.classList.contains('is-open');

        // Close all groups first
        document.querySelectorAll('.nav-group').forEach(g => {
          g.classList.remove('is-open');
          g.querySelector('.nav-group__toggle')?.setAttribute('aria-expanded', 'false');
        });

        // Open clicked group if it was closed
        if (!isOpen) {
          group.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ------------------------------------------------
     LEAF CLICK → LOAD TOPIC
  ------------------------------------------------ */
  function attachLeafClicks() {
    document.querySelectorAll('.nav-leaf').forEach(leaf => {
      leaf.addEventListener('click', () => {
        const id   = leaf.dataset.id;
        const file = leaf.dataset.file;
        setActive(id);
        NavigationManager.loadTopic(id, file);
        // Close sidebar on mobile
        if (window.innerWidth < 1024) closeSidebar();
      });
    });
  }

  /* ------------------------------------------------
     SET ACTIVE LEAF
  ------------------------------------------------ */
  function setActive(id) {
    activeTopicId = id;

    document.querySelectorAll('.nav-leaf').forEach(leaf => {
      const isActive = leaf.dataset.id === id;
      leaf.classList.toggle('is-active', isActive);
      leaf.setAttribute('aria-current', isActive ? 'page' : 'false');
    });

    // Auto-open the parent group containing this topic
    const activeLeaf = document.querySelector(`.nav-leaf[data-id="${id}"]`);
    if (activeLeaf) {
      const group = activeLeaf.closest('.nav-group');
      if (group) {
        // Close others, open this group
        document.querySelectorAll('.nav-group').forEach(g => {
          g.classList.remove('is-open');
          g.querySelector('.nav-group__toggle')?.setAttribute('aria-expanded', 'false');
        });
        group.classList.add('is-open');
        group.querySelector('.nav-group__toggle')?.setAttribute('aria-expanded', 'true');

        // Scroll active leaf into view
        setTimeout(() => {
          activeLeaf.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
      }
    }
  }

  /* ------------------------------------------------
     MOBILE OPEN / CLOSE
  ------------------------------------------------ */
  function openSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const hamburger = document.getElementById('hamburger');

    sidebar?.classList.add('is-open');
    overlay?.classList.add('is-visible');
    overlay?.removeAttribute('aria-hidden');
    hamburger?.classList.add('is-active');
    hamburger?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const hamburger = document.getElementById('hamburger');

    sidebar?.classList.remove('is-open');
    overlay?.classList.remove('is-visible');
    overlay?.setAttribute('aria-hidden', 'true');
    hamburger?.classList.remove('is-active');
    hamburger?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar?.classList.contains('is-open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }

  /* ------------------------------------------------
     DESKTOP SIDEBAR TOGGLE (collapse/expand)
  ------------------------------------------------ */
  function toggleDesktopSidebar() {
    const sidebar = document.getElementById('sidebar');
    const main    = document.getElementById('main-content');
    sidebar?.classList.toggle('is-hidden');
    main?.classList.toggle('sidebar-hidden');
  }

  /* ------------------------------------------------
     INIT
  ------------------------------------------------ */
  function init() {
    render();

    // Hamburger click
    document.getElementById('hamburger')?.addEventListener('click', () => {
      if (window.innerWidth < 1024) {
        toggleSidebar();
      } else {
        toggleDesktopSidebar();
      }
    });

    // Overlay click → close sidebar
    document.getElementById('sidebar-overlay')?.addEventListener('click', closeSidebar);

    // Sidebar close button (mobile)
    document.getElementById('sidebar-close')?.addEventListener('click', closeSidebar);

    // Close sidebar on ESC
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeSidebar();
    });

    // Open intro group by default
    const introGroup = document.getElementById('group-intro');
    if (introGroup) {
      introGroup.classList.add('is-open');
      introGroup.querySelector('.nav-group__toggle')?.setAttribute('aria-expanded', 'true');
    }
  }

  return { init, setActive, openSidebar, closeSidebar };
})();
