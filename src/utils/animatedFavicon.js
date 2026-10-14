/**
 * Animated Favicon for BharatNivas
 * Renders the blue gradient badge with the white building icon and animates
 * a smooth floating motion and light shine effect across all browser tabs.
 */
export function startAnimatedFavicon() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let faviconLink = document.querySelector("link[rel~='icon']");
  if (!faviconLink) {
    faviconLink = document.createElement('link');
    faviconLink.rel = 'icon';
    document.head.appendChild(faviconLink);
  }

  let step = 0;
  let animationInterval = null;

  function drawRoundedRect(c, x, y, width, height, radius) {
    c.beginPath();
    c.moveTo(x + radius, y);
    c.lineTo(x + width - radius, y);
    c.quadraticCurveTo(x + width, y, x + width, y + radius);
    c.lineTo(x + width, y + height - radius);
    c.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    c.lineTo(x + radius, y + height);
    c.quadraticCurveTo(x, y + height, x, y + height - radius);
    c.lineTo(x, y + radius);
    c.quadraticCurveTo(x, y, x + radius, y);
    c.closePath();
  }

  function renderFrame() {
    ctx.clearRect(0, 0, 64, 64);

    // 1. Blue gradient background badge
    const bgGrad = ctx.createLinearGradient(4, 60, 60, 4);
    bgGrad.addColorStop(0, '#1e40af'); // brand blue deep
    bgGrad.addColorStop(0.45, '#2563eb'); // vibrant royal blue
    bgGrad.addColorStop(1, '#38bdf8'); // sky blue shine

    ctx.save();
    drawRoundedRect(ctx, 3, 3, 58, 58, 17);
    ctx.fillStyle = bgGrad;
    ctx.fill();

    // 2. Moving light shimmer across badge
    const shimmerPos = ((step * 1.2) % 160) - 50;
    const shimmerGrad = ctx.createLinearGradient(shimmerPos - 20, 0, shimmerPos + 20, 64);
    shimmerGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
    shimmerGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.18)');
    shimmerGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = shimmerGrad;
    ctx.fill();
    ctx.restore();

    // 3. Smooth floating animation for the building
    const floatY = Math.sin(step * 0.08) * 2.2;
    const pulseScale = 1 + Math.sin(step * 0.08) * 0.03;

    ctx.save();
    ctx.translate(32, 33 + floatY);
    ctx.scale(pulseScale, pulseScale);
    ctx.translate(-32, -33);

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3.2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Left Wing
    ctx.beginPath();
    ctx.moveTo(15, 47);
    ctx.lineTo(15, 28);
    ctx.quadraticCurveTo(15, 24.5, 18.5, 24.5);
    ctx.quadraticCurveTo(22, 24.5, 22, 28);
    ctx.lineTo(22, 47);
    ctx.stroke();

    // Right Wing
    ctx.beginPath();
    ctx.moveTo(42, 47);
    ctx.lineTo(42, 28);
    ctx.quadraticCurveTo(42, 24.5, 45.5, 24.5);
    ctx.quadraticCurveTo(49, 24.5, 49, 28);
    ctx.lineTo(49, 47);
    ctx.stroke();

    // Center Main Tower
    ctx.beginPath();
    ctx.moveTo(22, 47);
    ctx.lineTo(22, 20);
    ctx.quadraticCurveTo(22, 14.5, 28, 14.5);
    ctx.lineTo(36, 14.5);
    ctx.quadraticCurveTo(42, 14.5, 42, 20);
    ctx.lineTo(42, 47);
    ctx.stroke();

    // Upper Window Bar
    ctx.beginPath();
    ctx.moveTo(28, 23);
    ctx.lineTo(36, 23);
    ctx.stroke();

    // Middle Window Bar
    ctx.beginPath();
    ctx.moveTo(28, 31);
    ctx.lineTo(36, 31);
    ctx.stroke();

    // Arched Entrance Doorway
    ctx.beginPath();
    ctx.moveTo(28.5, 47);
    ctx.lineTo(28.5, 41);
    ctx.quadraticCurveTo(28.5, 37.5, 32, 37.5);
    ctx.quadraticCurveTo(35.5, 37.5, 35.5, 41);
    ctx.lineTo(35.5, 47);
    ctx.stroke();

    ctx.restore();

    // Update browser tab favicon
    try {
      faviconLink.href = canvas.toDataURL('image/png');
    } catch {
      // Fallback
    }

    step++;
  }

  // Initial draw
  renderFrame();

  // Run smooth animation loop (approx 15 fps for buttery movement with zero CPU strain)
  const startLoop = () => {
    if (!animationInterval) {
      animationInterval = setInterval(renderFrame, 70);
    }
  };

  const stopLoop = () => {
    if (animationInterval) {
      clearInterval(animationInterval);
      animationInterval = null;
    }
  };

  startLoop();

  // Pause when tab is hidden to conserve power and CPU
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopLoop();
    } else {
      renderFrame();
      startLoop();
    }
  });
}
