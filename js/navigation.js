/**
 * NAVIGATION MANAGER
 * Handles iframe topic loading, loading state, history.
 * Communicates prev/next info to loaded topic pages via postMessage.
 */

const NavigationManager = (() => {
  let currentTopicId = 'welcome';

  const frame  = () => document.getElementById('content-frame');
  const loader = () => document.getElementById('frame-loader');

  /* ------------------------------------------------
     LOAD TOPIC INTO IFRAME
  ------------------------------------------------ */
  function loadTopic(id, file) {
    if (currentTopicId === id) return;

    currentTopicId = id;
    showLoader();

    const iframe = frame();
    if (!iframe) return;

    // Update browser history (hash-based, works on file://)
    history.pushState({ id, file }, '', `#${id}`);

    iframe.onload = () => {
      hideLoader();
      updateProgressBar(0);

      // Send context to topic page after it loads
      try {
        const adjacent = getAdjacentTopics(id);
        iframe.contentWindow.postMessage({
          type:  'topic-context',
          id,
          theme: localStorage.getItem('ai-theme') || 'dark',
          prev:  adjacent.prev,
          next:  adjacent.next,
        }, '*');
      } catch (_) {}
    };

    iframe.src = file;
    SidebarManager.setActive(id);
  }

  /* ------------------------------------------------
     LOAD BY ID (used by topic pages for prev/next)
  ------------------------------------------------ */
  function loadById(id) {
    const topic = getTopicById(id);
    if (topic) loadTopic(topic.id, topic.file);
  }

  /* ------------------------------------------------
     LOADER VISIBILITY
  ------------------------------------------------ */
  function showLoader() {
    loader()?.classList.add('is-loading');
  }

  function hideLoader() {
    loader()?.classList.remove('is-loading');
  }

  /* ------------------------------------------------
     PROGRESS BAR (receives scroll % from iframe)
  ------------------------------------------------ */
  function updateProgressBar(percent) {
    const bar = document.getElementById('progress-bar');
    if (bar) {
      bar.style.width = `${percent}%`;
      bar.setAttribute('aria-valuenow', Math.round(percent));
    }
  }

  /* ------------------------------------------------
     MESSAGE BUS — receive from topic iframes
  ------------------------------------------------ */
  function initMessageListener() {
    window.addEventListener('message', (e) => {
      const { type, data } = e.data || {};

      switch (type) {
        case 'scroll-progress':
          updateProgressBar(data.percent);
          break;

        case 'navigate':
          loadById(data.id);
          break;

        default:
          break;
      }
    });
  }

  /* ------------------------------------------------
     HASH ROUTING — on page load / back-forward
  ------------------------------------------------ */
  function initHashRouting() {
    function routeFromHash() {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const topic = getTopicById(hash);
        if (topic && topic.id !== currentTopicId) {
          loadTopic(topic.id, topic.file);
        }
      }
    }

    window.addEventListener('popstate', routeFromHash);
    routeFromHash(); // run on initial load
  }

  /* ------------------------------------------------
     FULLSCREEN READING MODE
  ------------------------------------------------ */
  function initFullscreen() {
    document.getElementById('fullscreen-toggle')?.addEventListener('click', () => {
      const sidebar = document.getElementById('sidebar');
      const main    = document.getElementById('main-content');

      sidebar?.classList.toggle('is-hidden');
      main?.classList.toggle('sidebar-hidden');
    });
  }

  /* ------------------------------------------------
     INIT
  ------------------------------------------------ */
  function init() {
    initMessageListener();
    initHashRouting();
    initFullscreen();

    // Welcome page loads by default via iframe src in HTML
    frame()?.addEventListener('load', () => {
      hideLoader();
      // Send initial theme to welcome page
      try {
        frame().contentWindow.postMessage({
          type:  'topic-context',
          id:    'welcome',
          theme: localStorage.getItem('ai-theme') || 'dark',
          prev:  null,
          next:  getAdjacentTopics('welcome').next,
        }, '*');
      } catch (_) {}
    });
  }

  return { init, loadTopic, loadById, updateProgressBar };
})();
