/* ===== STAR CANVAS ===== */
(function () {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const container = document.getElementById('starsCanvas');
  container.appendChild(canvas);

  let stars = [];
  let animFrame;

  function resize() {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    createStars();
  }

  function createStars() {
    stars = [];
    const count = Math.floor((canvas.width * canvas.height) / 3000);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.2,
        alpha: Math.random(),
        speed: Math.random() * 0.008 + 0.002,
        phase: Math.random() * Math.PI * 2,
        color: randomStarColor(),
      });
    }
  }

  function randomStarColor() {
    const colors = [
      'rgba(255,255,255,',
      'rgba(200,220,255,',
      'rgba(255,230,200,',
      'rgba(180,200,255,',
      'rgba(255,255,220,',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function drawShootingStar() {
    if (Math.random() > 0.997) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height * 0.5;
      const len = Math.random() * 120 + 60;
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3;
      const grad = ctx.createLinearGradient(x, y, x + Math.cos(angle) * len, y + Math.sin(angle) * len);
      grad.addColorStop(0, 'rgba(255,255,255,0)');
      grad.addColorStop(0.3, 'rgba(255,255,255,0.8)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  function drawNebula() {
    const grad = ctx.createRadialGradient(
      canvas.width * 0.3, canvas.height * 0.4, 0,
      canvas.width * 0.3, canvas.height * 0.4, canvas.width * 0.35
    );
    grad.addColorStop(0, 'rgba(108, 143, 255, 0.04)');
    grad.addColorStop(0.5, 'rgba(167, 139, 250, 0.02)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const grad2 = ctx.createRadialGradient(
      canvas.width * 0.7, canvas.height * 0.6, 0,
      canvas.width * 0.7, canvas.height * 0.6, canvas.width * 0.28
    );
    grad2.addColorStop(0, 'rgba(240, 192, 96, 0.03)');
    grad2.addColorStop(1, 'transparent');
    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  let t = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawNebula();
    t += 0.016;

    stars.forEach((s) => {
      const alpha = (Math.sin(t * s.speed * 60 + s.phase) + 1) / 2;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.color + (alpha * 0.9 + 0.1) + ')';
      ctx.fill();

      if (s.r > 1.2) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = s.color + (alpha * 0.12) + ')';
        ctx.fill();
      }
    });

    drawShootingStar();
    animFrame = requestAnimationFrame(animate);
  }

  resize();
  animate();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 200);
  });
})();

/* ===== FLOATING CTA ===== */
(function () {
  const cta = document.getElementById('floatingCta');
  let shown = false;

  function onScroll() {
    const scrolled = window.scrollY > 400;
    if (scrolled && !shown) {
      cta.classList.add('visible');
      shown = true;
    } else if (!scrolled && shown) {
      cta.classList.remove('visible');
      shown = false;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ===== SCROLL FADE IN ===== */
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
  );

  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
})();

/* ===== SMOOTH ANCHOR SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
