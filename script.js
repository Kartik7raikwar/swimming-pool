/* ============================
   PERFECT POOLS SERVICES
   JavaScript
   ============================ */

document.addEventListener('DOMContentLoaded', () => {

  // -------- Navbar Scroll --------
  const navbar = document.getElementById('navbar');

  const handleNavbarScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', handleNavbarScroll);

  // -------- Active Nav Link --------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  const highlightNavLink = () => {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNavLink);

  // -------- Mobile Nav Toggle --------
  const navToggle = document.getElementById('navToggle');
  const navLinksEl = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinksEl.classList.toggle('active');
  });

  // Close mobile nav on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinksEl.classList.remove('active');
    });
  });

  // -------- Hero Bubbles --------
  const bubblesContainer = document.getElementById('heroBubbles');

  const createBubbles = () => {
    for (let i = 0; i < 15; i++) {
      const bubble = document.createElement('div');
      bubble.classList.add('bubble');
      const size = Math.random() * 60 + 20;
      bubble.style.width = size + 'px';
      bubble.style.height = size + 'px';
      bubble.style.left = Math.random() * 100 + '%';
      bubble.style.animationDuration = Math.random() * 8 + 6 + 's';
      bubble.style.animationDelay = Math.random() * 5 + 's';
      bubblesContainer.appendChild(bubble);
    }
  };
  createBubbles();

  // -------- Counter Animation --------
  const animateCounter = (element, target, suffix = '+') => {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + suffix;
    }, 16);
  };

  // Observe stat counters
  let countersAnimated = false;
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        animateCounter(document.getElementById('statYears'), 10, '+');
        animateCounter(document.getElementById('statPools'), 500, '+');
        animateCounter(document.getElementById('statClients'), 300, '+');
        animateCounter(document.getElementById('statTeam'), 25, '+');
      }
    });
  }, { threshold: 0.3 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

  // -------- Scroll Reveal --------
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // -------- Back to Top --------
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // -------- Contact Form --------
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const phone = document.getElementById('formPhone').value.trim();
    const service = document.getElementById('formService').value;
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !phone || !service) {
      showFormNotification('Please fill in all required fields.', 'error');
      return;
    }

    // Construct WhatsApp message to company
    const whatsappMessage = `New Contact Form Submission:

Name: ${name}
Phone: ${phone}
Service: ${service}
Message: ${message || 'No additional message'}

Please contact this customer soon.`;

    // Company's WhatsApp number
    const companyPhone = '919589738386';

    const whatsappUrl = `https://wa.me/${companyPhone}?text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Show success notification
    showFormNotification('Opening WhatsApp with your message...', 'success');

    // Reset form
    contactForm.reset();
  });

  // -------- Form Notification --------
  function showFormNotification(text, type) {
    // Remove existing notification
    const existing = document.querySelector('.form-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.classList.add('form-notification');
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 30px;
      padding: 16px 28px;
      border-radius: 12px;
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
      font-size: 0.95rem;
      z-index: 10001;
      box-shadow: 0 8px 30px rgba(0,0,0,0.15);
      animation: slideInRight 0.4s ease;
      display: flex;
      align-items: center;
      gap: 10px;
    `;

    if (type === 'success') {
      notification.style.background = '#25d366';
      notification.style.color = '#fff';
      notification.innerHTML = '<i class="fas fa-check-circle"></i> ' + text;
    } else {
      notification.style.background = '#e36414';
      notification.style.color = '#fff';
      notification.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + text;
    }

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100px)';
      notification.style.transition = '0.4s ease';
      setTimeout(() => notification.remove(), 400);
    }, 4000);
  }

  // Add animation keyframe
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from { transform: translateX(100px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  // -------- Smooth Scroll for all anchor links --------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});

// -------- Lightbox --------
function openLightbox(element) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const imgSrc = element.querySelector('img').src;

  lightboxImg.src = imgSrc;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

document.getElementById('lightboxClose').addEventListener('click', () => {
  closeLightbox();
});

document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    closeLightbox();
  }
});

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
