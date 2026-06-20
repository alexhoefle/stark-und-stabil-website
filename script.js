/* =================================================================
   STARK UND STABIL – script.js
   Mobile-Navigation · Sticky-Header · Scroll-Reveal ·
   Akkordeon · Smooth Scroll · Scrollspy
   ================================================================= */
(function () {
  "use strict";

  /* ---------- 1. Aktuelles Jahr im Footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- 2. Mobile-Navigation (Burger-Menü) ---------- */
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");

  function closeMenu() {
    if (!navMenu || !navToggle) return;
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Menü öffnen");
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen");
    });

    // Menü nach Klick auf einen Link schließen
    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // Schließen bei ESC
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- 3. Sticky-Header Schatten beim Scrollen ---------- */
  var header = document.getElementById("header");
  function onScrollHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  /* ---------- 4. Scroll-Reveal (Fade-In beim Scrollen) ---------- */
  var reveals = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: alles direkt anzeigen
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- 5. Gestaffelte Verzögerung für Karten-Grids ---------- */
  document.querySelectorAll(".cards-grid, .offers-grid").forEach(function (grid) {
    grid.querySelectorAll(".reveal").forEach(function (card, i) {
      card.style.setProperty("--delay", (i % 3) * 0.08 + "s");
    });
  });

  /* ---------- 6. Akkordeon (Konzept) ---------- */
  var accordion = document.getElementById("accordion");
  if (accordion) {
    var headers = accordion.querySelectorAll(".accordion__header");

    headers.forEach(function (header) {
      header.addEventListener("click", function () {
        var item = header.closest(".accordion__item");
        var panel = item.querySelector(".accordion__panel");
        var isOpen = item.classList.contains("is-open");

        // Andere schließen (Akkordeon-Verhalten)
        accordion.querySelectorAll(".accordion__item").forEach(function (other) {
          if (other !== item) {
            other.classList.remove("is-open");
            other.querySelector(".accordion__header").setAttribute("aria-expanded", "false");
            other.querySelector(".accordion__panel").style.maxHeight = null;
          }
        });

        // Aktuelles umschalten
        if (isOpen) {
          item.classList.remove("is-open");
          header.setAttribute("aria-expanded", "false");
          panel.style.maxHeight = null;
        } else {
          item.classList.add("is-open");
          header.setAttribute("aria-expanded", "true");
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    });

    // Erstes Element standardmäßig öffnen
    var first = accordion.querySelector(".accordion__item");
    if (first) {
      first.classList.add("is-open");
      first.querySelector(".accordion__header").setAttribute("aria-expanded", "true");
      var firstPanel = first.querySelector(".accordion__panel");
      firstPanel.style.maxHeight = firstPanel.scrollHeight + "px";
    }

    // Höhe bei Fensteränderung anpassen
    window.addEventListener("resize", function () {
      var open = accordion.querySelector(".accordion__item.is-open .accordion__panel");
      if (open) open.style.maxHeight = open.scrollHeight + "px";
    });
  }

  /* ---------- 7. Scrollspy – aktiven Navigationslink markieren ---------- */
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav__link");

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute("id");
            navLinks.forEach(function (link) {
              link.classList.toggle(
                "is-active",
                link.getAttribute("href") === "#" + id
              );
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach(function (sec) {
      spy.observe(sec);
    });
  }
})();
