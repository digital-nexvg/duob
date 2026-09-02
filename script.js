// ── NAV SCROLL ──
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });

    // ── HAMBURGER ──
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
      });
    });
    
    // ───────────────── HERO CARROSSEL ─────────────────

(function () {

  var track = document.getElementById('hcTrack');
  var fill = document.getElementById('hcFill');
  var dotsWrap = document.getElementById('hcDots');

  var btnPrev = document.getElementById('hcPrev');
  var btnNext = document.getElementById('hcNext');

  if (!track) return;

  var slides = track.querySelectorAll('.hc-slide');

  var total = slides.length;

  var current = 0;

  var INTERVAL = 5000;

  var timer;
  var fillTimer;

  // CRIAR DOTS

  function buildDots() {

    dotsWrap.innerHTML = '';

    slides.forEach(function (_, i) {

      var d = document.createElement('button');

      d.className = 'hc-dot' + (i === 0 ? ' active' : '');

      d.setAttribute('aria-label', 'Slide ' + (i + 1));

      d.addEventListener('click', function () {

        goTo(i);

        resetAuto();

      });

      dotsWrap.appendChild(d);

    });

  }

  // TROCAR SLIDE

  function goTo(idx) {

    slides[current].classList.remove('active');

    dotsWrap
      .querySelectorAll('.hc-dot')[current]
      .classList.remove('active');

    current = (idx + total) % total;

    slides[current].classList.add('active');

    dotsWrap
      .querySelectorAll('.hc-dot')[current]
      .classList.add('active');

    track.style.transform =
      'translateX(-' + (current * 100) + '%)';

    startFill();

  }

  // BARRA DE PROGRESSO

  function startFill() {

    clearInterval(fillTimer);

    fill.style.transition = 'none';

    fill.style.width = '0%';

    requestAnimationFrame(function () {

      requestAnimationFrame(function () {

        fill.style.transition =
          'width ' + INTERVAL + 'ms linear';

        fill.style.width = '100%';

      });

    });

  }

  // AUTO PLAY

  function resetAuto() {

    clearInterval(timer);

    timer = setInterval(function () {

      goTo(current + 1);

    }, INTERVAL);

  }

  // BOTÕES

  btnNext.addEventListener('click', function () {

    goTo(current + 1);

    resetAuto();

  });

  btnPrev.addEventListener('click', function () {

    goTo(current - 1);

    resetAuto();

  });

  // SWIPE MOBILE

  var tx = 0;

  track.addEventListener('touchstart', function (e) {

    tx = e.touches[0].clientX;

  }, { passive: true });

  track.addEventListener('touchend', function (e) {

    var diff =
      tx - e.changedTouches[0].clientX;

    if (Math.abs(diff) > 50) {

      diff > 0
        ? goTo(current + 1)
        : goTo(current - 1);

      resetAuto();

    }

  });

  // INICIAR

  buildDots();

  startFill();

  resetAuto();

})();

// ───────────────── DESTAQUES PREMIUM CARROSSEL ─────────────────
(function () {
  const track = document.getElementById('pcTrack');
  const fill = document.getElementById('pcFill');
  const dotsWrap = document.getElementById('pcDots');
  const prevBtn = document.getElementById('pcPrev');
  const nextBtn = document.getElementById('pcNext');

  if (!track || !dotsWrap) return;

  const slides = Array.from(track.children);
  const total = slides.length;
  let current = 0;
  const INTERVAL = 5000;
  let timer;

  function buildDots() {
    dotsWrap.innerHTML = '';

    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'pc-dot' + (index === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Destaque ' + (index + 1));
      dot.addEventListener('click', () => {
        goTo(index);
        resetAuto();
      });
      dotsWrap.appendChild(dot);
    });
  }

  function startProgress() {
    if (!fill) return;

    fill.style.transition = 'none';
    fill.style.width = '0%';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fill.style.transition = 'width ' + INTERVAL + 'ms linear';
        fill.style.width = '100%';
      });
    });
  }

  function goTo(index) {
    if (!slides.length) return;

    slides[current].classList.remove('active');
    const oldDot = dotsWrap.querySelectorAll('.pc-dot')[current];
    if (oldDot) oldDot.classList.remove('active');

    current = (index + total) % total;

    slides[current].classList.add('active');
    const nextDot = dotsWrap.querySelectorAll('.pc-dot')[current];
    if (nextDot) nextDot.classList.add('active');

    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    startProgress();
  }

  function resetAuto() {
    clearInterval(timer);
    timer = setInterval(() => {
      goTo(current + 1);
    }, INTERVAL);
  }

  prevBtn?.addEventListener('click', () => {
    goTo(current - 1);
    resetAuto();
  });

  nextBtn?.addEventListener('click', () => {
    goTo(current + 1);
    resetAuto();
  });

  let touchStartX = 0;
  track.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (event) => {
    const diff = touchStartX - event.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goTo(current + 1) : goTo(current - 1);
      resetAuto();
    }
  }, { passive: true });

  buildDots();
  startProgress();
  resetAuto();
})();

// ───────────────── DEPOIMENTOS CARROSSEL ─────────────────
(function () {
  const track = document.getElementById('depoTrack');
  const progress = document.getElementById('depoProgress');
  const dotsWrap = document.getElementById('depoDots');
  const prevBtn = document.getElementById('depoPrev');
  const nextBtn = document.getElementById('depoNext');

  if (!track || !dotsWrap) return;

  const slides = Array.from(track.children);
  const total = slides.length;
  let current = 0;
  const INTERVAL = 5000;
  let timer;

  function buildDots() {
    dotsWrap.innerHTML = '';

    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'depo-dot' + (index === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Depoimento ' + (index + 1));
      dot.addEventListener('click', () => {
        goTo(index);
        resetAuto();
      });
      dotsWrap.appendChild(dot);
    });
  }

  function startProgress() {
    if (!progress) return;
    progress.style.transition = 'none';
    progress.style.width = '0%';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        progress.style.transition = 'width ' + INTERVAL + 'ms linear';
        progress.style.width = '100%';
      });
    });
  }

  function goTo(index) {
    if (!slides.length) return;

    slides[current].classList.remove('active');
    const prevDot = dotsWrap.querySelectorAll('.depo-dot')[current];
    if (prevDot) prevDot.classList.remove('active');

    current = (index + total) % total;

    slides[current].classList.add('active');
    const nextDot = dotsWrap.querySelectorAll('.depo-dot')[current];
    if (nextDot) nextDot.classList.add('active');

    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    startProgress();
  }

  function resetAuto() {
    clearInterval(timer);
    timer = setInterval(() => {
      goTo(current + 1);
    }, INTERVAL);
  }

  prevBtn?.addEventListener('click', () => {
    goTo(current - 1);
    resetAuto();
  });

  nextBtn?.addEventListener('click', () => {
    goTo(current + 1);
    resetAuto();
  });

  let touchStartX = 0;
  track.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (event) => {
    const diff = touchStartX - event.changedTouches[0].clientX;

    if (Math.abs(diff) > 50) {
      diff > 0 ? goTo(current + 1) : goTo(current - 1);
      resetAuto();
    }
  }, { passive: true });

  buildDots();
  startProgress();
  resetAuto();
})();
    // ── SCROLL REVEAL ──
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ── SERVICE MODAL ──
    const servicesModal = document.getElementById('serviceModal');
    const serviceModalImage = document.getElementById('serviceModalImage');
    const serviceModalTitle = document.getElementById('serviceModalTitle');
    const serviceModalDescription = document.getElementById('serviceModalDescription');
    const serviceModalWhatsApp = document.getElementById('serviceModalWhatsApp');

    function closeServiceModal() {
      if (!servicesModal) return;
      servicesModal.classList.remove('is-open');
      servicesModal.classList.remove('p1-modal');
      servicesModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    }

    document.querySelectorAll('.service-btn').forEach((button) => {
      button.addEventListener('click', () => {
        if (!servicesModal || !serviceModalImage || !serviceModalTitle || !serviceModalDescription || !serviceModalWhatsApp) return;

        const title = button.dataset.title || 'Tratamento';
        const description = button.dataset.description || '';
        const image = button.dataset.image || '';

        serviceModalTitle.textContent = title;
        serviceModalDescription.textContent = description;
        serviceModalImage.src = image;
        serviceModalImage.alt = title;
        servicesModal.classList.toggle('p1-modal', image === 'images/p1.jpg');

        serviceModalWhatsApp.href = `https://wa.me/5521964354763?text=${encodeURIComponent(`Olá! Gostaria de agendar ${title}.`)}`;

        servicesModal.classList.add('is-open');
        servicesModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
      });
    });

    document.querySelectorAll('[data-close-modal]').forEach((el) => {
      el.addEventListener('click', closeServiceModal);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && servicesModal && servicesModal.classList.contains('is-open')) {
        closeServiceModal();
      }
    });

    // ── FORM SUBMIT ──
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
      submitBtn.addEventListener('click', function(e) {
        const name  = document.querySelector('input[placeholder="Seu nome"]').value.trim();
        const phone = document.querySelector('input[type="tel"]').value.trim();
        if (!name || !phone) {
          this.textContent = '⚠ Preencha nome e telefone';
          this.style.background = 'linear-gradient(135deg,#c0392b,#e74c3c)';
          setTimeout(() => {
            this.textContent = 'Enviar Mensagem ✦';
            this.style.background = '';
          }, 2500);
          return;
        }
        const service = document.querySelector('select').value || 'Não especificado';
        const message = document.querySelector('textarea').value;
        const wppMsg = encodeURIComponent(
          `Olá! Vim pelo site da Duo B.\n\nNome: ${name}\nTelefone: ${phone}\nServiço: ${service}\n${message ? 'Mensagem: ' + message : ''}`
        );
        window.open(`https://wa.me/5521964354763?text=${wppMsg}`, '_blank');
        this.textContent = '✓ Redirecionando ao WhatsApp...';
        this.style.background = 'linear-gradient(135deg,#1da851,#25d366)';
        setTimeout(() => {
          this.textContent = 'Enviar Mensagem ✦';
          this.style.background = '';
        }, 3000);
      });
    }

    // ── SMOOTH CLOSE active sections ──
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });