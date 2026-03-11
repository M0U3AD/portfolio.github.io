/* ── Year ── */
    document.getElementById('year').textContent = new Date().getFullYear();

    /* ── Lucide icons ── */
    lucide.createIcons();

    /* ── Custom Cursor (desktop only) ── */
    const cursor     = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursor-ring');
    if (window.matchMedia('(pointer:fine)').matches) {
      let mx = 0, my = 0, rx = 0, ry = 0;
      document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
      function animateCursor() {
        rx += (mx - rx) * 0.15;
        ry += (my - ry) * 0.15;
        cursor.style.left     = mx - 6  + 'px';
        cursor.style.top      = my - 6  + 'px';
        cursorRing.style.left = rx - 18 + 'px';
        cursorRing.style.top  = ry - 18 + 'px';
        requestAnimationFrame(animateCursor);
      }
      animateCursor();
      document.querySelectorAll('a,button').forEach(el => {
        el.addEventListener('mouseenter', () => { cursor.style.transform = 'scale(2)'; cursorRing.style.width = '50px'; cursorRing.style.height = '50px'; });
        el.addEventListener('mouseleave', () => { cursor.style.transform = 'scale(1)'; cursorRing.style.width = '36px'; cursorRing.style.height = '36px'; });
      });
    } else {
      cursor.style.display = 'none';
      cursorRing.style.display = 'none';
    }

    /* ── Navbar scroll effect ── */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('bg-dark/90', 'backdrop-blur-md', 'border-b', 'border-dark-4', 'shadow-lg');
      } else {
        navbar.classList.remove('bg-dark/90', 'backdrop-blur-md', 'border-b', 'border-dark-4', 'shadow-lg');
      }
    }, { passive: true });

    /* ── Mobile menu ── */
    const hamburger   = document.getElementById('hamburger');
    const mobileMenu  = document.getElementById('mobile-menu');
    const h1 = document.getElementById('h1');
    const h2 = document.getElementById('h2');
    const h3 = document.getElementById('h3');
    let menuOpen = false;
    hamburger.addEventListener('click', () => {
      menuOpen = !menuOpen;
      mobileMenu.classList.toggle('open', menuOpen);
      if (menuOpen) {
        h1.style.transform = 'rotate(45deg) translateY(8px)';
        h2.style.opacity   = '0';
        h3.style.transform = 'rotate(-45deg) translateY(-8px)';
        h3.style.width     = '24px';
      } else {
        h1.style.transform = ''; h2.style.opacity = ''; h3.style.transform = ''; h3.style.width = '';
      }
    });
    function closeMobileMenu() {
      menuOpen = false;
      mobileMenu.classList.remove('open');
      h1.style.transform = ''; h2.style.opacity = ''; h3.style.transform = ''; h3.style.width = '';
    }

    /* ── Contact form ── */
    function handleForm(e) {
      e.preventDefault();
      const btn  = e.target.querySelector('button[type=submit]');
      const text = document.getElementById('btn-text');
      const icon = document.getElementById('btn-icon');
      const success = document.getElementById('form-success');
      btn.disabled = true;
      text.textContent = 'Sending…';
      setTimeout(() => {
        btn.disabled = false;
        text.textContent = 'Send Message';
        success.classList.remove('hidden');
        e.target.reset();
        setTimeout(() => success.classList.add('hidden'), 4000);
      }, 1200);
    }

    /* ── GSAP Animations ── */
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Hero entrance
    const heroTl = gsap.timeline({ delay: 0.2 });
    heroTl
      .to('#hero-tag',     { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0)
      .to('#hero-h1',      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.15)
      .to('#hero-sub',     { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.3)
      .to('#hero-cta',     { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.45)
      .to('#hero-socials', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.55)
      .to('#hero-visual',  { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)' }, 0.3);

    // Generic reveal on scroll
    document.querySelectorAll('.reveal').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    // Skill bars
    document.querySelectorAll('.skill-item').forEach(item => {
      const level = item.dataset.level;
      const bar   = item.querySelector('.skill-bar-fill');
      ScrollTrigger.create({
        trigger: item,
        start: 'top 90%',
        onEnter: () => gsap.to(bar, { width: level + '%', duration: 1.5, ease: 'power2.out' }),
      });
    });

    // Project cards stagger
    gsap.utils.toArray('.project-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7,
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    // Floating badges parallax
    gsap.to('.float', {
      y: -10,
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.5,
    });