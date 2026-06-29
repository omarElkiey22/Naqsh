/* ==========================================================================
   Naqsh Visual Studio — Interactive Operations v1.1.0
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Toggle (Hamburger)
  const menuToggle = document.getElementById('menu-toggle');
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navbar.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('active');
      });
    });
  }

  // 2. Sticky Header and Scroll Progress Bar
  const header = document.querySelector('header');
  const scrollIndicator = document.getElementById('scroll-indicator');
  const topBtn = document.getElementById('top-btn');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Sticky Header Scroll Toggle
    if (header) {
      if (scrollY > 50) {
        header.classList.add('nav-scrolled');
      } else {
        header.classList.remove('nav-scrolled');
      }
    }

    // Scroll Progress Indicator Width Calculation
    if (scrollIndicator) {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (windowHeight > 0) {
        const scrolledPercentage = (scrollY / windowHeight) * 100;
        scrollIndicator.style.width = scrolledPercentage + '%';
      }
    }

    // Back to top floating button visibility
    if (topBtn) {
      if (scrollY > 300) {
        topBtn.style.opacity = '1';
        topBtn.style.visibility = 'visible';
        topBtn.style.transform = 'translateY(0)';
      } else {
        topBtn.style.opacity = '0';
        topBtn.style.visibility = 'hidden';
        topBtn.style.transform = 'translateY(15px)';
      }
    }
  });

  // 5. Scroll Triggered Entrance Animations (Intersection Observer)
  const animatedElements = document.querySelectorAll('.fade-in, .slide-up');

  // Activate Hero elements immediately on load to prevent blank initial viewports
  const heroElements = document.querySelectorAll('#home .fade-in, #home .slide-up');
  heroElements.forEach(el => el.classList.add('animated'));

  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.02, // triggers as soon as 2% of the element enters the screen
    rootMargin: '0px 0px -10px 0px'
  });

  animatedElements.forEach(el => {
    if (!el.closest('#home')) {
      animationObserver.observe(el);
    }
  });

  // 3. Scroll Spy Navigation Highlight
  const sections = document.querySelectorAll('section');

  const scrollSpy = () => {
    const scrollPosition = window.scrollY + 150; // offset for sticky navbar height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        if (activeLink) {
          navLinks.forEach(link => link.classList.remove('active'));
          activeLink.classList.add('active');
        }
      }
    });
  };

  window.addEventListener('scroll', scrollSpy);
  window.addEventListener('resize', scrollSpy);

});
