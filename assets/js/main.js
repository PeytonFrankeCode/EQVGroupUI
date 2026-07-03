/* EQV Group — site behavior: theme, menu, header, reveals, counters, map */
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

  /* ---------- Interactive holographic 3D US map ---------- */
  var mapEl = document.getElementById("usMap");
  if (!mapEl || !window.EQV_US_MAP) return;

  // Active-asset states (highlighted) and states with EQV offices (beacons).
  // NOTE: sample footprint drawn from the current site — replace with client data.
  var ASSETS = {
    MT:"Active producing assets", ND:"Active producing assets", WY:"Active producing assets",
    UT:"Active producing assets", CO:"Active producing assets", NM:"Active producing assets",
    OK:"Operated portfolio — Western Oklahoma focus", TX:"Operated portfolio — Texas Panhandle focus",
    LA:"Active producing assets", MS:"Active producing assets"
  };
  var OFFICES = { OK:"EQV Office — Oklahoma City", UT:"EQV Office — Park City" };

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
    if (OFFICES[abbr]) lines.push(OFFICES[abbr]);
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
    var path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", window.EQV_US_MAP[abbr][1]);
    path.setAttribute("class", "eqv-geo" + (ASSETS[abbr] ? " is-asset" : ""));
    path.setAttribute("tabindex", "0");
    path.setAttribute("role", "button");
    path.setAttribute("aria-label", stateName(abbr) + (ASSETS[abbr] ? " — active assets" : ""));
    path.dataset.abbr = abbr;

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

  // Office beacons: position holographic pillars at each office state's centroid
  if (beacons) {
    Object.keys(OFFICES).forEach(function (abbr) {
      var path = mapEl.querySelector('[data-abbr="' + abbr + '"]');
      if (!path) return;
      var b = path.getBBox();
      var cx = ((b.x + b.width / 2) - VB.x) / VB.w * 100;
      var cy = ((b.y + b.height / 2) - VB.y) / VB.h * 100;
      var el = document.createElement("div");
      el.className = "eqv-beacon";
      el.style.left = cx + "%";
      el.style.top = cy + "%";
      el.innerHTML =
        '<span class="eqv-beacon__ring"></span>' +
        '<span class="eqv-beacon__ring eqv-beacon__ring--2"></span>' +
        '<span class="eqv-beacon__beam"></span>' +
        '<span class="eqv-beacon__core"></span>' +
        '<span class="eqv-beacon__tag">' + OFFICES[abbr] + '</span>';
      beacons.appendChild(el);
    });
  }

  // Parallax tilt toward the cursor
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (scene && tilt && !reduceMotion) {
    var BASE = 46, SCALE = 1.28;
    scene.addEventListener("mousemove", function (e) {
      var r = scene.getBoundingClientRect();
      var nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      var ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      tilt.style.transform = "rotateX(" + (BASE - ny * 4) + "deg) rotateY(" + (nx * 5) + "deg) scale(" + SCALE + ")";
    });
    scene.addEventListener("mouseleave", function () {
      tilt.style.transform = "";
    });
  }
})();
