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

  /* ---------- Hero video: respect reduced motion (show the poster instead) ---------- */
  var heroVideo = document.querySelector(".eqv-hero__video");
  if (heroVideo && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    heroVideo.removeAttribute("autoplay");
    heroVideo.pause();
    try { heroVideo.currentTime = 0; } catch (e) {}
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

  /* ---------- Timeline: draw the center line down as you scroll ---------- */
  var timeline = document.querySelector(".eqv-timeline");
  if (timeline) {
    var tlReduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (tlReduce) {
      timeline.style.setProperty("--eqv-tl-progress", "1");
    } else {
      var tlTick = false;
      var setTimelineProgress = function () {
        tlTick = false;
        var rect = timeline.getBoundingClientRect();
        // Anchor a little below the viewport middle; the fill tracks it through the list.
        var anchor = window.innerHeight * 0.58;
        var p = (anchor - rect.top) / rect.height;
        p = p < 0 ? 0 : (p > 1 ? 1 : p);
        timeline.style.setProperty("--eqv-tl-progress", p.toFixed(4));
      };
      var onTlScroll = function () {
        if (!tlTick) { tlTick = true; requestAnimationFrame(setTimelineProgress); }
      };
      setTimelineProgress();
      window.addEventListener("scroll", onTlScroll, { passive: true });
      window.addEventListener("resize", onTlScroll);
    }
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
    MS:"Oil from the Tuscaloosa Marine Shale plus conventional gas in southwest Mississippi.",
    AL:"Conventional oil and gas production in Conecuh County on the Gulf Coast trend of south Alabama."
  };
  // Non-operated interest states: shown in a muted shade, not clickable.
  var NONOP = { ND:1, MT:1, WY:1, CO:1 };
  // Offices as city points: fx/fy are fractional positions within the
  // state's bounding box (0,0 = northwest corner).
  // Click an office to show its detail in the panel. Street addresses for
  // Dallas/Houston are pending from the client; OKC has the mailing address.
  var OFFICES = [
    { state: "TX", label: "Dallas",        role: "Corporate Headquarters",        fx: .75, fy: .35, side: "left" },
    { state: "OK", label: "Oklahoma City", role: "Operations and Administration",  fx: .64, fy: .45,
      address: "P.O. Box 721173, Oklahoma City, OK 73172", phone: "(405) 870-3786", tel: "+14058703786" },
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

  function showOffice(o) {
    if (!info) return;
    if (current) { current.classList.remove("is-active"); current = null; }
    var html = "<strong>" + o.label + "</strong><span>" + o.role;
    if (o.address) html += "<br>" + o.address;
    html += "</span>";
    if (o.phone) html += '<a href="tel:' + o.tel + '">' + o.phone + '</a>';
    html += '<a href="contact.html">Get in touch <svg class="eqv-extlink" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5"/></svg></a>';
    info.innerHTML = html;
  }

  Object.keys(window.EQV_US_MAP).forEach(function (abbr) {
    // A state is "active" (shaded + clickable to zoom) only if it actually has
    // county-level well data. A state flagged in ASSETS but with no well
    // counties (e.g. Oklahoma — office only) stays unshaded/inert.
    var cd = window.EQV_COUNTY_MAP && window.EQV_COUNTY_MAP[abbr];
    var hasOps = !!ASSETS[abbr] && !!(cd && cd.counties && cd.counties.length);
    var path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", window.EQV_US_MAP[abbr][1]);
    path.setAttribute("class", "eqv-geo " + (hasOps ? "is-asset" : (NONOP[abbr] ? "is-nonop" : "is-inert")));
    path.dataset.abbr = abbr;

    // Only states where EQV has active operations are interactive.
    if (hasOps) {
      path.setAttribute("tabindex", "0");
      path.setAttribute("role", "button");
      path.setAttribute("aria-label", stateName(abbr) + ", active operations. Click to zoom into counties.");
      path.addEventListener("click", function () { openCounty(abbr, path); });
      path.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openCounty(abbr, path); }
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
        '<span class="eqv-beacon__tag' + (o.side === "left" ? " eqv-beacon__tag--left" : "") + '" role="button" tabindex="0" aria-label="' + o.label + ' office">' + o.label + '</span>';
      beacons.appendChild(el);
      var tag = el.querySelector(".eqv-beacon__tag");
      if (tag) {
        tag.addEventListener("click", function () { showOffice(o); });
        tag.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); showOffice(o); }
        });
      }
    });
  }

  // Parallax tilt toward the cursor. County mode uses a much flatter plane so
  // the counties and wells read clearly.
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function baseTilt() { return countyMode ? 8 : 35; }
  function resetTilt() {
    tilt.style.setProperty("--eqv-map-tilt", baseTilt() + "deg");
    tilt.style.setProperty("--eqv-map-yaw", "0deg");
  }
  if (scene && tilt && !reduceMotion) {
    scene.addEventListener("mousemove", function (e) {
      var r = scene.getBoundingClientRect();
      var nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      var ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      var swing = countyMode ? 3 : 4;
      tilt.style.setProperty("--eqv-map-tilt", (baseTilt() - ny * swing) + "deg");
      tilt.style.setProperty("--eqv-map-yaw", (nx * (countyMode ? 3 : 5)) + "deg");
    });
    scene.addEventListener("mouseleave", resetTilt);
  }

  /* ---------- County-level zoom ---------- */
  var countyMap = document.getElementById("countyMap");
  var countyBeacons = document.getElementById("countyBeacons");
  var mapBack = document.getElementById("mapBack");
  var stateLabel = document.getElementById("mapStateLabel");
  var countyMode = false;
  var COUNTY = window.EQV_COUNTY_MAP || {};

  function fmt(n) { return n.toLocaleString("en-US"); }

  function stateSummary(d) {
    var totalWells = 0, basins = {};
    d.counties.forEach(function (c) { totalWells += c.wells; basins[c.basin] = 1; });
    var bits = [];
    if (d.counties.length) bits.push(d.counties.length + (d.counties.length === 1 ? " county" : " counties") + " with operations");
    if (totalWells) bits.push(fmt(totalWells) + " wells");
    if (d.offices && d.offices.length) bits.push(d.offices.map(function (o) { return o.name; }).join(" & ") + " office" + (d.offices.length > 1 ? "s" : ""));
    var html = "<strong>" + d.name + "</strong><span>" + (bits.join(" &middot; ") || "No operated wells reported.");
    if (totalWells) html += "<br>Basins: " + Object.keys(basins).join(", ");
    html += "</span><span class=\"eqv-map__hint\">Brighter counties have more wells &middot; hover one for its count.</span>";
    if (info) info.innerHTML = html;
  }

  function showCounty(c, abbr) {
    if (!info) return;
    info.innerHTML = "<strong>" + c.name + " County, " + abbr + "</strong><span>" +
      fmt(c.wells) + (c.wells === 1 ? " well" : " wells") + " &middot; " + c.basin + "</span>";
  }

  function pctX(x, vb) { return (x - vb[0]) / vb[2] * 100; }
  function pctY(y, vb) { return (y - vb[1]) / vb[3] * 100; }

  function openCounty(abbr, path) {
    var d = COUNTY[abbr];
    if (!d) { select(path, abbr); return; }  // no county data: fall back to state highlight
    if (current) { current.classList.remove("is-active"); current = null; }

    var vb = d.viewBox.split(" ").map(parseFloat);
    countyMap.setAttribute("viewBox", d.viewBox);

    // Shade each operations county by its well count (heavier shade = more
    // wells), the same flat-fill treatment the states get on the national map.
    var maxW = 1;
    d.counties.forEach(function (c) { if (c.wells > maxW) maxW = c.wells; });
    var svg = '<path class="eqv-county-outline" d="' + d.outline + '"/>';
    d.counties.forEach(function (c) {
      var t = Math.log(c.wells + 1) / Math.log(maxW + 1);   // 0..1 on a log scale
      var op = (0.30 + t * 0.52).toFixed(3);
      svg += '<path class="eqv-county" tabindex="0" role="button" data-fips="' + c.fips + '" ' +
        'style="--wells-op:' + op + '" aria-label="' + c.name + ' County, ' + fmt(c.wells) + ' wells" d="' + c.d + '"/>';
    });
    countyMap.innerHTML = svg;

    // hover / focus a county -> detail in the panel
    Array.prototype.forEach.call(countyMap.querySelectorAll(".eqv-county"), function (el) {
      var c = d.counties.filter(function (x) { return x.fips === el.dataset.fips; })[0];
      el.addEventListener("mouseenter", function () { el.classList.add("is-hot"); showCounty(c, abbr); });
      el.addEventListener("mouseleave", function () { el.classList.remove("is-hot"); stateSummary(d); });
      el.addEventListener("focus", function () { showCounty(c, abbr); });
      el.addEventListener("blur", function () { stateSummary(d); });
    });

    // office 3D buildings
    countyBeacons.innerHTML = "";
    (d.offices || []).forEach(function (o) {
      var el = document.createElement("div");
      el.className = "eqv-office3d";
      el.style.left = pctX(o.x, vb) + "%";
      el.style.top = pctY(o.y, vb) + "%";
      el.innerHTML =
        '<span class="eqv-office3d__shadow"></span>' +
        '<span class="eqv-office3d__build"><span class="eqv-office3d__side"></span><span class="eqv-office3d__front"></span><span class="eqv-office3d__roof"></span></span>' +
        '<span class="eqv-office3d__tag" role="button" tabindex="0">' + o.name + '</span>';
      countyBeacons.appendChild(el);
      var tag = el.querySelector(".eqv-office3d__tag");
      var off = { label: o.name, role: o.role, address: o.address, phone: o.phone, tel: o.tel };
      tag.addEventListener("click", function () { showOffice(off); });
      tag.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); showOffice(off); }
      });
    });

    countyMode = true;
    scene.classList.add("is-county");
    countyMap.setAttribute("aria-hidden", "false");
    countyBeacons.setAttribute("aria-hidden", "false");
    if (mapBack) { mapBack.hidden = false; }
    if (stateLabel) { stateLabel.textContent = d.name; stateLabel.setAttribute("aria-hidden", "false"); }
    if (tip) tip.classList.remove("is-visible");
    resetTilt();
    stateSummary(d);
  }

  function closeCounty() {
    countyMode = false;
    scene.classList.remove("is-county");
    countyMap.setAttribute("aria-hidden", "true");
    countyBeacons.setAttribute("aria-hidden", "true");
    // Leave the county content in place so it fades out smoothly; the next
    // openCounty() rebuilds it. (Clearing here would make it vanish abruptly.)
    if (mapBack) mapBack.hidden = true;
    if (stateLabel) stateLabel.setAttribute("aria-hidden", "true");
    resetTilt();
    if (info) info.innerHTML = '<strong>Explore our footprint</strong><span>Click a highlighted state to zoom in and see its counties, wells, and offices.</span>';
  }

  if (mapBack) mapBack.addEventListener("click", closeCounty);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && countyMode) closeCounty(); });
})();
