/**
 * PARTICLE / NEURAL NETWORK CANVAS
 * Animated background for hero/welcome page.
 * Called from welcome.html directly (not from shell).
 * Shell exposes ParticleManager as a no-op to avoid errors.
 */

const ParticleManager = (() => {
  function init() {
    // Shell has no canvas — particles live inside welcome.html
    // This stub prevents "ParticleManager is not defined" errors.
  }

  /**
   * Initialize neural network canvas animation.
   * Call from inside a topic page that has <canvas id="particle-canvas">.
   * @param {string} canvasId - canvas element id
   * @param {object} opts     - optional config overrides
   */
  function initCanvas(canvasId = 'particle-canvas', opts = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const config = {
      particleCount: opts.particleCount || 80,
      connectDistance: opts.connectDistance || 130,
      particleSpeed: opts.particleSpeed || 0.4,
      particleRadius: opts.particleRadius || 2,
      lineOpacity: opts.lineOpacity || 0.15,
      color: opts.color || '0, 212, 255',      // RGB for var(--accent-cyan)
      colorSecondary: opts.colorSecondary || '123, 47, 255',
    };

    let particles = [];
    let animationId = null;
    let W, H;

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function createParticle() {
      return {
        x:   Math.random() * W,
        y:   Math.random() * H,
        vx:  (Math.random() - 0.5) * config.particleSpeed,
        vy:  (Math.random() - 0.5) * config.particleSpeed,
        r:   Math.random() * config.particleRadius + 0.5,
        // Alternate between cyan and purple
        color: Math.random() > 0.7 ? config.colorSecondary : config.color,
      };
    }

    function init() {
      resize();
      particles = Array.from({ length: config.particleCount }, createParticle);
      animate();
    }

    function animate() {
      ctx.clearRect(0, 0, W, H);

      particles.forEach(p => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, 0.7)`;
        ctx.fill();
      });

      // Draw connecting lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < config.connectDistance) {
            const opacity = (1 - dist / config.connectDistance) * config.lineOpacity;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${a.color}, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    }

    function destroy() {
      if (animationId) cancelAnimationFrame(animationId);
    }

    window.addEventListener('resize', resize);
    init();

    return { destroy };
  }

  return { init, initCanvas };
})();
