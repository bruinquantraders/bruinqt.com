// ===== Bruin Quant Traders — interactions =====
(function () {
  "use strict";

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Nav shadow on scroll
  var nav = document.getElementById("nav");
  var onScroll = function () {
    if (window.scrollY > 12) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a, button").forEach(function (el) {
      el.addEventListener("click", function () {
        if (el.id === "marketsNavBtn") return;
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Markets popup (visible by default; can be dismissed)
  var marketsPop = document.getElementById("marketsPop");
  var marketsClose = document.getElementById("marketsPopClose");
  var closeMarketsPop = function () {
    if (!marketsPop) return;
    marketsPop.classList.remove("is-open");
    marketsPop.hidden = true;
  };
  if (marketsClose) marketsClose.addEventListener("click", closeMarketsPop);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMarketsPop();
  });

  // Reveal on scroll
  var reveals = document.querySelectorAll(".reveal");
  var membersBoard = document.querySelector("#members .board");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el, i) {
      if (membersBoard && membersBoard.contains(el)) return;
      el.style.transitionDelay = (i % 4) * 60 + "ms";
      io.observe(el);
    });
    if (membersBoard) {
      membersBoard.querySelectorAll(".member.reveal").forEach(function (el, i) {
        el.style.transitionDelay = (i % 4) * 40 + "ms";
      });
      var boardIo = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (!e.isIntersecting) return;
            membersBoard.querySelectorAll(".member.reveal").forEach(function (el) {
              el.classList.add("in");
            });
            boardIo.unobserve(e.target);
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
      );
      boardIo.observe(membersBoard);
    }
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // Animated stat counters
  var counters = document.querySelectorAll(".hero__stats dt[data-count]");
  var animate = function (el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    var start = null;
    var dur = 1400;
    var step = function (ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window && counters.length) {
    var cio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            animate(e.target);
            cio.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (c) { cio.observe(c); });
  } else {
    counters.forEach(function (c) {
      c.textContent = (c.getAttribute("data-prefix") || "") + c.getAttribute("data-count") + (c.getAttribute("data-suffix") || "");
    });
  }
})();
