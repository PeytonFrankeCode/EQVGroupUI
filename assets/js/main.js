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

  /* ---------- Interactive US tile-grid map ---------- */
  var mapEl = document.getElementById("usMap");
  if (!mapEl) return;

  // [row, col] on an 11-col x 8-row grid, plus full name.
  var STATES = {
    AK:[1,1,"Alaska"], ME:[1,11,"Maine"],
    VT:[2,10,"Vermont"], NH:[2,11,"New Hampshire"],
    WA:[3,1,"Washington"], ID:[3,2,"Idaho"], MT:[3,3,"Montana"], ND:[3,4,"North Dakota"],
    MN:[3,5,"Minnesota"], WI:[3,6,"Wisconsin"], MI:[3,9,"Michigan"], NY:[3,10,"New York"], MA:[3,11,"Massachusetts"],
    OR:[4,1,"Oregon"], NV:[4,2,"Nevada"], WY:[4,3,"Wyoming"], SD:[4,4,"South Dakota"], IA:[4,5,"Iowa"],
    IL:[4,6,"Illinois"], IN:[4,7,"Indiana"], OH:[4,8,"Ohio"], PA:[4,9,"Pennsylvania"], NJ:[4,10,"New Jersey"], CT:[4,11,"Connecticut"],
    CA:[5,1,"California"], UT:[5,2,"Utah"], CO:[5,3,"Colorado"], NE:[5,4,"Nebraska"], MO:[5,5,"Missouri"],
    KY:[5,6,"Kentucky"], WV:[5,7,"West Virginia"], VA:[5,8,"Virginia"], MD:[5,9,"Maryland"], DE:[5,10,"Delaware"], RI:[5,11,"Rhode Island"],
    AZ:[6,2,"Arizona"], NM:[6,3,"New Mexico"], KS:[6,4,"Kansas"], AR:[6,5,"Arkansas"], TN:[6,6,"Tennessee"],
    NC:[6,7,"North Carolina"], SC:[6,8,"South Carolina"],
    OK:[7,3,"Oklahoma"], LA:[7,4,"Louisiana"], MS:[7,5,"Mississippi"], AL:[7,6,"Alabama"], GA:[7,7,"Georgia"],
    HI:[8,1,"Hawaii"], TX:[8,3,"Texas"], FL:[8,7,"Florida"]
  };

  // Active-asset states (highlighted) and states with EQV offices (pinned).
  // NOTE: sample footprint drawn from the current site — replace with client data.
  var ASSETS = {
    MT:"Active producing assets", ND:"Active producing assets", WY:"Active producing assets",
    UT:"Active producing assets", CO:"Active producing assets", NM:"Active producing assets",
    OK:"Operated portfolio — Western Oklahoma focus", TX:"Operated portfolio — Texas Panhandle focus",
    LA:"Active producing assets", MS:"Active producing assets"
  };
  var OFFICES = { OK:"EQV office", UT:"EQV office" };

  var info = document.getElementById("mapInfo");
  var current = null;

  function showInfo(abbr) {
    if (!info) return;
    var s = STATES[abbr];
    var lines = [];
    if (ASSETS[abbr]) lines.push(ASSETS[abbr]);
    if (OFFICES[abbr]) lines.push(OFFICES[abbr]);
    if (!lines.length) lines.push("No EQV operations reported in this state.");
    info.innerHTML = "<strong>" + s[2] + "</strong><span>" + lines.join(" &middot; ") + "</span>";
  }

  Object.keys(STATES).forEach(function (abbr) {
    var s = STATES[abbr];
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "eqv-state";
    btn.textContent = abbr;
    btn.style.gridRow = s[0];
    btn.style.gridColumn = s[1];
    btn.setAttribute("aria-label", s[2] + (ASSETS[abbr] ? " — active assets" : ""));
    if (ASSETS[abbr]) btn.classList.add("is-asset");
    if (OFFICES[abbr]) btn.classList.add("is-office");
    btn.addEventListener("click", function () {
      if (current) current.classList.remove("is-active");
      btn.classList.add("is-active");
      current = btn;
      showInfo(abbr);
    });
    mapEl.appendChild(btn);
  });
})();
