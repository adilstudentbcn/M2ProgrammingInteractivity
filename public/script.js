/**
 * Modern Vanilla JavaScript
 * Mobile Navigation & Form Handling
 * No frameworks or libraries required
 */

// ============================================
// Mobile Navigation Toggle
// ============================================

(function initMobileNav() {
  const mobileToggle = document.getElementById('mobileToggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (!mobileToggle || !nav) return;
  
  // Toggle mobile menu
  mobileToggle.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    
    // Toggle aria-expanded
    this.setAttribute('aria-expanded', !isExpanded);
    
    // Toggle active class on nav
    nav.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isExpanded ? '' : 'hidden';
  });
  
  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      nav.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (nav.classList.contains('active') && 
        !nav.contains(event.target) && 
        !mobileToggle.contains(event.target)) {
      nav.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
  
  // Close menu on ESC key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && nav.classList.contains('active')) {
      nav.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      mobileToggle.focus();
    }
  });
})();

// ============================================
// Smooth Scroll for Anchor Links
// ============================================

(function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Don't scroll for # only links
      if (href === '#') {
        e.preventDefault();
        return;
      }
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        // Get header height for offset
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 0;
        
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus();
      }
    });
  });
})();

// ============================================
// Contact Form Handling
// ============================================

(function initContactForm() {
  const form = document.getElementById('contactForm');
  
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };
    
    // In a real application, you would send this to a backend
    console.log('Form submitted:', data);
    
    // Show success message (basic implementation)
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    
    button.textContent = 'Message Sent!';
    button.style.backgroundColor = 'var(--color-accent-green)';
    button.disabled = true;
    
    // Reset form after delay
    setTimeout(() => {
      form.reset();
      button.textContent = originalText;
      button.style.backgroundColor = '';
      button.disabled = false;
    }, 3000);
  });
  
  // Real-time validation feedback
  const inputs = form.querySelectorAll('input, textarea');
  
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.hasAttribute('required') && !this.value.trim()) {
        this.style.borderColor = 'var(--color-accent-terra)';
      } else {
        this.style.borderColor = '';
      }
    });
    
    input.addEventListener('input', function() {
      if (this.style.borderColor) {
        this.style.borderColor = '';
      }
    });
  });
})();

// ============================================
// Header Shadow on Scroll
// ============================================

(function initHeaderScroll() {
  const header = document.querySelector('.header');
  
  if (!header) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      header.style.boxShadow = 'var(--shadow-subtle)';
    } else {
      header.style.boxShadow = '';
    }
    
    lastScroll = currentScroll;
  });
})();

// ============================================
// Active Navigation Link Highlighting
// ============================================

(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (sections.length === 0 || navLinks.length === 0) return;
  
  function highlightNav() {
    let current = '';
    const scrollPosition = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = sectionId;
      }
    });
    
    navLinks.forEach(link => {
      link.style.color = '';
      link.style.fontWeight = '';
      
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = 'var(--color-mocha)';
        link.style.fontWeight = '700';
      }
    });
  }
  
  window.addEventListener('scroll', highlightNav);
  highlightNav(); // Initial check
})();

// ============================================
// Intersection Observer for Fade-in Animations
// ============================================

(function initAnimations() {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) return;
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe feature cards
  const cards = document.querySelectorAll('.feature-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
  
  // Observe about section
  const aboutText = document.querySelector('.about-text');
  const aboutVisual = document.querySelector('.about-visual');
  
  if (aboutText) {
    aboutText.style.opacity = '0';
    aboutText.style.transform = 'translateY(20px)';
    aboutText.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(aboutText);
  }
  
  if (aboutVisual) {
    aboutVisual.style.opacity = '0';
    aboutVisual.style.transform = 'translateY(20px)';
    aboutVisual.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s';
    observer.observe(aboutVisual);
  }
})();

console.log('✨ Modern website loaded successfully!');
