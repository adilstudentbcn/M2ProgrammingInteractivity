/**
 * Modern Vanilla JavaScript
 * Mobile Navigation, Smooth Scroll, Form Handling,
 * Active Nav (ARIA) & IntersectionObserver animations
 */

// ============================================
// Mobile Navigation Toggle
// ============================================
(function initMobileNav() {
  const mobileToggle = document.getElementById("mobileToggle");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav-link");
  if (!mobileToggle || !nav) return;

  // Toggle mobile menu
  mobileToggle.addEventListener("click", function () {
    const isExpanded = this.getAttribute("aria-expanded") === "true";
    this.setAttribute("aria-expanded", String(!isExpanded));
    nav.classList.toggle("active");
    document.body.style.overflow = isExpanded ? "" : "hidden"; // lock scroll
  });

  // Close menu on link click
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      nav.classList.remove("active");
      mobileToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      nav.classList.contains("active") &&
      !nav.contains(event.target) &&
      !mobileToggle.contains(event.target)
    ) {
      nav.classList.remove("active");
      mobileToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });

  // ESC to close
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("active")) {
      nav.classList.remove("active");
      mobileToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      mobileToggle.focus();
    }
  });
})();

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
(function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") {
        e.preventDefault();
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const header = document.querySelector(".header");
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({ top: targetPosition, behavior: "smooth" });

        target.setAttribute("tabindex", "-1");
        target.focus();
      }
    });
  });
})();

// ============================================
// Contact Form Handling
// ============================================
(function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };
    console.log("Form submitted:", data);

    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = "Message Sent!";
    button.style.backgroundColor = "var(--color-accent-green)";
    button.disabled = true;

    setTimeout(() => {
      form.reset();
      button.textContent = originalText;
      button.style.backgroundColor = "";
      button.disabled = false;
    }, 3000);
  });

  // Real-time validation feedback
  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.hasAttribute("required") && !this.value.trim()) {
        this.style.borderColor = "var(--color-accent-terra)";
      } else {
        this.style.borderColor = "";
      }
    });
    input.addEventListener("input", function () {
      if (this.style.borderColor) this.style.borderColor = "";
    });
  });
})();

// ============================================
// Header Shadow on Scroll
// ============================================
(function initHeaderScroll() {
  const header = document.querySelector(".header");
  if (!header) return;

  window.addEventListener(
    "scroll",
    function () {
      const currentScroll = window.pageYOffset;
      header.style.boxShadow = currentScroll > 50 ? "var(--shadow-subtle)" : "";
    },
    { passive: true },
  );
})();

// ============================================
// Active Navigation Link Highlighting (ARIA)
// ============================================
(function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-link");
  if (!sections.length || !links.length) return;

  function setActive(id) {
    links.forEach((a) => {
      a.removeAttribute("aria-current");
      if (a.getAttribute("href") === `#${id}`) {
        a.setAttribute("aria-current", "page");
      }
    });
  }

  function onScroll() {
    let current = "";
    const y = window.pageYOffset;
    sections.forEach((s) => {
      const top = s.offsetTop - 120; // offset for sticky header
      const bottom = top + s.offsetHeight;
      if (y >= top && y < bottom) current = s.id;
    });
    if (current) setActive(current);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // initial state on load
})();

// ============================================
// Intersection Observer for Fade-in Animations
// ============================================
(function initAnimations() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const targets = [
    ...document.querySelectorAll(".pricing-card"),
    ...document.querySelectorAll(".section-title"),
    document.querySelector(".about-text"),
    document.querySelector(".about-visual"),
  ].filter(Boolean);

  targets.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = `opacity .6s ease ${i * 0.06}s, transform .6s ease ${i * 0.06}s`;
  });

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -50px 0px" },
  );

  targets.forEach((el) => obs.observe(el));
})();

console.log("✨ Modern website loaded successfully!");
