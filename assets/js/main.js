/* EQV Group site behavior: theme, menu, header, reveals, counters, map */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- Dark mode toggle (persisted) ---------- */
  try {
    var saved = localStorage.getItem("eqv-theme");
    if (saved) root.setAttribute("data-theme", saved);
  } catch (e) {}

  var themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("eqv-theme", next); } catch (e) {}
    });
  }

  /* ---------- Full-screen menu ---------- */
  var menuToggle = document.getElementById("menuToggle");
  var menu = document.getElementById("menu");
  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    if (menu) menu.setAttribute("aria-hidden", String(!open));
  }
  if (menuToggle && menu) {
    menuToggle.addEventListener("click", function () {
      setMenu(!document.body.classList.contains("menu-open"));
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
  }

  /* ---------- Header scroll state ---------- */
  var header = document.getElementById("header");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll-reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          revealObs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll("[data-count]");
  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1400, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString("en-US") + (p === 1 ? suffix : "");
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window && counters.length) {
    var countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          animateCounter(en.target);
          countObs.unobserve(en.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { countObs.observe(el); });
  } else {
    counters.forEach(function (el) {
      el.textContent = parseInt(el.getAttribute("data-count"), 10).toLocaleString("en-US") + (el.getAttribute("data-suffix") || "");
    });
  }

  /* ---------- Contact form (mailto compose, no backend on static host) ---------- */
  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = contactForm.elements;
      var body = "Name: " + f.firstName.value + " " + f.lastName.value +
        "\nEmail: " + f.email.value +
        (f.phone.value ? "\nPhone: " + f.phone.value : "") +
        "\n\n" + f.message.value;
      window.location.href = "mailto:contact@eqvoperating.com" +
        "?subject=" + encodeURIComponent(f.subject.value) +
        "&body=" + encodeURIComponent(body);
    });
  }

  /* ---------- Interactive holographic 3D US map ---------- */
  var mapEl = document.getElementById("usMap");
  if (!mapEl || !window.EQV_US_MAP) return;

  // States with active EQV operations (clickable). Short descriptions are
  // drawn from the acquisition history; offices carry a role for the panel.
  var ASSETS = {
    TX:"Operated assets across the Delaware Basin (Reeves and Loving counties), the Texas Panhandle (Anadarko Basin), East Texas, and the Gulf Coast.",
    OK:"Long-life conventional production in the Anadarko Basin of western Oklahoma.",
    NM:"Northwest Shelf of the Permian Basin: roughly 1,600 producing wells across Eddy and Lea counties.",
    LA:"Stacked-pay natural gas across North Louisiana, including the Cotton Valley and Haynesville.",
    MS:"Oil from the Tuscaloosa Marine Shale plus conventional gas in southwest Mississippi."
  };
  // Non-operated interest states: shown in a muted shade, not clickable.
  var NONOP = { ND:1, MT:1, WY:1, CO:1 };
  // Offices as city points: fx/fy are fractional positions within the
  // state's bounding box (0,0 = northwest corner).
  var OFFICES = [
    { state: "TX", label: "Dallas",        role: "Corporate Headquarters",        fx: .75, fy: .35, side: "left" },
    { state: "OK", label: "Oklahoma City", role: "Operations and Administration", fx: .64, fy: .45 },
    { state: "TX", label: "Houston",       role: "Satellite Office",              fx: .86, fy: .63 }
  ];
  var OFFICE_BY_STATE = {};
  OFFICES.forEach(function (o) {
    (OFFICE_BY_STATE[o.state] = OFFICE_BY_STATE[o.state] || []).push(o.label + ": " + o.role);
  });

  var scene = document.getElementById("mapScene");
  var tilt = document.getElementById("mapTilt");
  var beacons = document.getElementById("mapBeacons");
  var tip = document.getElementById("mapTip");
  var info = document.getElementById("mapInfo");
  var current = null;
  var SVG_NS = "http://www.w3.org/2000/svg";
  var VB = { x: 192, y: 9, w: 1028, h: 746 };

  function stateName(abbr) { return window.EQV_US_MAP[abbr][0]; }

  function showInfo(abbr) {
    if (!info) return;
    var lines = [];
    if (ASSETS[abbr]) lines.push(ASSETS[abbr]);
    if (OFFICE_BY_STATE[abbr]) lines = lines.concat(OFFICE_BY_STATE[abbr]);
    if (!lines.length) lines.push("No EQV operations reported in this state.");
    info.innerHTML = "<strong>" + stateName(abbr) + "</strong><span>" + lines.join(" &middot; ") + "</span>";
  }

  function select(path, abbr) {
    if (current) current.classList.remove("is-active");
    path.classList.add("is-active");
    current = path;
    showInfo(abbr);
  }

  Object.keys(window.EQV_US_MAP).forEach(function (abbr) {
    var hasOps = !!ASSETS[abbr];
    var path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", window.EQV_US_MAP[abbr][1]);
    path.setAttribute("class", "eqv-geo " + (hasOps ? "is-asset" : (NONOP[abbr] ? "is-nonop" : "is-inert")));
    path.dataset.abbr = abbr;

    // Only states where EQV has active operations are interactive.
    if (hasOps) {
      path.setAttribute("tabindex", "0");
      path.setAttribute("role", "button");
      path.setAttribute("aria-label", stateName(abbr) + ", active operations");
      path.addEventListener("click", function () { select(path, abbr); });
      path.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(path, abbr); }
      });
      path.addEventListener("mouseenter", function () {
        if (!tip) return;
        tip.textContent = stateName(abbr);
        tip.classList.add("is-visible");
      });
      path.addEventListener("mouseleave", function () {
        if (tip) tip.classList.remove("is-visible");
      });
    } else {
      path.setAttribute("aria-hidden", "true");
    }
    mapEl.appendChild(path);
  });

  // Cursor tooltip follows the pointer in screen space
  if (scene && tip) {
    scene.addEventListener("mousemove", function (e) {
      var r = scene.getBoundingClientRect();
      tip.style.left = (e.clientX - r.left) + "px";
      tip.style.top = (e.clientY - r.top) + "px";
    });
  }

  // Office beacons: holographic pillars at each office city's position
  if (beacons) {
    OFFICES.forEach(function (o) {
      var path = mapEl.querySelector('[data-abbr="' + o.state + '"]');
      if (!path) return;
      var b = path.getBBox();
      var cx = ((b.x + b.width * o.fx) - VB.x) / VB.w * 100;
      var cy = ((b.y + b.height * o.fy) - VB.y) / VB.h * 100;
      var el = document.createElement("div");
      el.className = "eqv-beacon";
      el.style.left = cx + "%";
      el.style.top = cy + "%";
      el.innerHTML =
        '<span class="eqv-beacon__ring"></span>' +
        '<span class="eqv-beacon__ring eqv-beacon__ring--2"></span>' +
        '<span class="eqv-beacon__beam"></span>' +
        '<span class="eqv-beacon__core"></span>' +
        '<span class="eqv-beacon__tag' + (o.side === "left" ? " eqv-beacon__tag--left" : "") + '">' + o.label + '</span>';
      beacons.appendChild(el);
    });
  }

  // Parallax tilt toward the cursor
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (scene && tilt && !reduceMotion) {
    var BASE = 35;
    scene.addEventListener("mousemove", function (e) {
      var r = scene.getBoundingClientRect();
      var nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      var ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      // Drive the plane via CSS vars so beacon labels counter-rotate in lockstep
      tilt.style.setProperty("--eqv-map-tilt", (BASE - ny * 4) + "deg");
      tilt.style.setProperty("--eqv-map-yaw", (nx * 5) + "deg");
    });
    scene.addEventListener("mouseleave", function () {
      tilt.style.removeProperty("--eqv-map-tilt");
      tilt.style.removeProperty("--eqv-map-yaw");
    });
  }
})();
