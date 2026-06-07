(function () {
  "use strict";

  const $ = (sel, scope) => (scope || document).querySelector(sel);
  const $$ = (sel, scope) => Array.from((scope || document).querySelectorAll(sel));
  const fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "]", e); }
  }

  /* ----- Nav scroll state ----- */
  function initNav() {
    const nav = $("#nav");
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("is-scrolled", scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* Mobile toggle */
    const toggle = $(".nav-toggle");
    const mobileMenu = $("#mobile-menu");
    if (!toggle || !mobileMenu) return;

    toggle.addEventListener("click", () => {
      const isOpen = toggle.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      mobileMenu.hidden = !isOpen;
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    /* Close on mobile link click */
    $$("a", mobileMenu).forEach(a => {
      a.addEventListener("click", () => {
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        mobileMenu.hidden = true;
        document.body.style.overflow = "";
      });
    });
  }

  /* ----- Smooth anchor scroll ----- */
  function initSmoothScroll() {
    document.addEventListener("click", e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      window.scrollTo({
        top: el.getBoundingClientRect().top + scrollY - 80,
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      });
    });
  }

  /* ----- Scroll reveals ----- */
  function initReveals() {
    const reveals = $$(".reveal");
    if (!reveals.length) return;

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const delay = parseInt(el.dataset.delay || "0", 10);
        setTimeout(() => el.classList.add("is-visible"), delay);
        io.unobserve(el);
      });
    }, { threshold: 0.04, rootMargin: "0px 0px -3% 0px" });

    reveals.forEach(el => io.observe(el));

    /* Safety: after 5s, force-reveal anything still hidden and in view */
    setTimeout(() => {
      reveals.forEach(el => {
        if (!el.classList.contains("is-visible") &&
            el.getBoundingClientRect().top < innerHeight) {
          el.classList.add("is-visible");
        }
      });
    }, 5000);
  }

  /* ----- Card tilt on hover (desktop only) ----- */
  function initTilt() {
    if (!fineHover) return;
    $$("[data-tilt]").forEach(card => {
      card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateY(-6px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* ----- Count-up numbers ----- */
  function initCountUp() {
    const counters = $$("[data-count-to]");
    if (!counters.length) return;

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.countTo);
        const duration = 1400;
        const start = performance.now();

        function tick(now) {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          const current = target * eased;
          el.textContent = Number.isInteger(target)
            ? Math.round(current)
            : current.toFixed(1);
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.04, rootMargin: "0px 0px -5% 0px" });

    counters.forEach(el => io.observe(el));
  }

  /* ----- Contact form ----- */
  function initContactForm() {
    const form = $("#contact-form");
    if (!form) return;

    const submitBtn = $("#form-submit");
    const successEl = $("#form-success");

    function showError(inputId, message) {
      const input = $("#" + inputId);
      const errorEl = $("#" + inputId + "-error");
      if (!input || !errorEl) return;
      input.classList.add("is-error");
      errorEl.textContent = message;
      errorEl.hidden = false;
    }

    function clearError(inputId) {
      const input = $("#" + inputId);
      const errorEl = $("#" + inputId + "-error");
      if (!input || !errorEl) return;
      input.classList.remove("is-error");
      errorEl.hidden = true;
    }

    /* Live validation */
    ["name", "email", "message"].forEach(id => {
      const input = $("#" + id);
      if (!input) return;
      input.addEventListener("blur", () => {
        if (!input.value.trim()) {
          showError(id, id === "email" ? "Please enter your email address." : "This field is required.");
        } else if (id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          showError(id, "Please enter a valid email address.");
        } else {
          clearError(id);
        }
      });
      input.addEventListener("input", () => clearError(id));
    });

    form.addEventListener("submit", e => {
      e.preventDefault();

      let valid = true;

      const name = $("#name");
      const email = $("#email");
      const message = $("#message");

      if (!name.value.trim()) { showError("name", "Please enter your full name."); valid = false; }
      else clearError("name");

      if (!email.value.trim()) { showError("email", "Please enter your email address."); valid = false; }
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { showError("email", "Please enter a valid email address."); valid = false; }
      else clearError("email");

      if (!message.value.trim()) { showError("message", "Please tell us about your project."); valid = false; }
      else clearError("message");

      if (!valid) {
        const firstError = $(".is-error");
        if (firstError) firstError.focus();
        return;
      }

      /* Simulate send */
      submitBtn.disabled = true;
      const btnText = $(".btn-text", submitBtn);
      if (btnText) btnText.textContent = "Sending…";

      setTimeout(() => {
        form.hidden = true;
        if (successEl) successEl.hidden = false;
      }, 1200);
    });
  }

  /* ----- GSAP ScrollTrigger reveals (enhancement layer) ----- */
  function initGSAP() {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    /* Hero parallax on scroll */
    const heroImg = $(".hero-img");
    if (heroImg) {
      gsap.to(heroImg, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }
  }

  /* ----- Boot ----- */
  function boot() {
    safe(initNav,          "initNav");
    safe(initSmoothScroll, "initSmoothScroll");
    safe(initReveals,      "initReveals");
    safe(initTilt,         "initTilt");
    safe(initCountUp,      "initCountUp");
    safe(initContactForm,  "initContactForm");
    safe(initGSAP,         "initGSAP");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
