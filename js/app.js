document.addEventListener('DOMContentLoaded', () => {
  SidebarManager.init();
  NavigationManager.init();
  if (typeof ParticleManager !== 'undefined') ParticleManager.init();
});
