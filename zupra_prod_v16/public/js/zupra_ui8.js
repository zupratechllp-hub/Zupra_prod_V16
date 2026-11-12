(function () {
  try { if (localStorage.zu_topnav === "off") return; } catch (e) {}
  if (document.body) document.body.classList.add("zu-topnav"); else document.addEventListener("DOMContentLoaded", function () { document.body.classList.add("zu-topnav"); });
  const MORE = ["Organisation structure", "Setup", "Assets", "Quality"];

  if (window.frappe && frappe.ui && frappe.ui.sidebar && frappe.ui.sidebar.Dock) {
    frappe.ui.sidebar.Dock.prototype.name_tile = function () {};
  }

  function killDockTooltips() {
    try {
      if (window.frappe && frappe.app && frappe.app.sidebar && frappe.app.sidebar.dock) {
        var d = frappe.app.sidebar.dock;
        d.name_tile = function () {};
        if (d.tooltips && d.tooltips.length) {
          d.tooltips.forEach(function (t) { try { t.destroy(); } catch (err) {} });
          d.tooltips = [];
        }
      }
    } catch (err) {}
    document.querySelectorAll("#desk-dock .dock-item, .dock-items .dock-item").forEach(function (b) {
      b.removeAttribute("title");
      if (window.$) {
        var tip = $(b).data("es-tooltip");
        if (tip) {
          try { tip.destroy(); } catch (err) {}
          $(b).removeData("es-tooltip");
        }
      }
    });
  }

  function gridIcon() {
    let s = "";
    [5, 12, 19].forEach(function (y) {
      [5, 12, 19].forEach(function (x) { s += '<circle cx="' + x + '" cy="' + y + '" r="1.8"/>'; });
    });
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">' + s + "</svg>";
  }
  function items() { return [...document.querySelectorAll("#desk-dock .dock-items .dock-item")]; }
  function run() {
    killDockTooltips();
    const its = items();
    if (!its.length) return;
    its.forEach(function (b) { b.classList.toggle("zu-more", MORE.indexOf(b.getAttribute("aria-label")) > -1); });
    document.body.classList.add("zu-topnav");
    let g = document.getElementById("zu-grid");
    if (!g) {
      g = document.createElement("button");
      g.id = "zu-grid"; g.type = "button"; g.title = "All modules"; g.innerHTML = gridIcon();
      const holder = document.querySelector("#desk-dock .dock-items");
      holder.parentNode.insertBefore(g, holder.nextSibling);
      const m = document.createElement("div");
      m.id = "zu-grid-menu";
      document.body.appendChild(m);
      g.onclick = function (e) {
        e.stopPropagation();
        if (m.style.display === "block") { m.style.display = "none"; return; }
        m.innerHTML = "";
        items().filter(function (b) { return b.classList.contains("zu-more"); }).forEach(function (b) {
          const r = document.createElement("div");
          r.textContent = b.getAttribute("aria-label");
          r.onclick = function () { m.style.display = "none"; b.click(); };
          m.appendChild(r);
        });
        const rc = g.getBoundingClientRect();
        m.style.left = Math.round(rc.left) + "px";
        m.style.top = Math.round(rc.bottom + 6) + "px";
        m.style.display = "block";
      };
      document.addEventListener("click", function () { m.style.display = "none"; });
    }
    g.classList.toggle("on", its.some(function (b) { return b.classList.contains("zu-more") && b.classList.contains("active"); }));
  }
  let t;
  $(document).ready(function () {
    setTimeout(run, 0);
    new MutationObserver(function () { clearTimeout(t); t = setTimeout(run, 50); })
      .observe(document.body, { childList: true, subtree: true });
  });
})();

(function () {
  function done() { if (document.body) document.body.classList.add("zu-ready"); }
  window.addEventListener("load", function () { setTimeout(done, 900); });
  setTimeout(done, 2500);
})();

/* zu-veil: cover the page until icons and top-right controls are in place */
(function () {
  function ready() { if (document.body) document.body.classList.add("zu-ready"); }
  function switching() {
    document.body.classList.add("zu-switching");
    setTimeout(function () { document.body.classList.remove("zu-switching"); }, 700);
  }
  window.addEventListener("load", function () { setTimeout(ready, 1300); });
  setTimeout(ready, 3500);
  if (window.$) $(document).on("page-change", switching);
})();

/* zu-initials: avatar shows the first two initials of the logged-in user */
(function () {
  function initials() {
    var s = (window.frappe && frappe.session) || {};
    var name = String(s.user_fullname || "").trim();
    if (!name || name.toLowerCase() === "guest") {
      name = String(s.user || "").split("@")[0].replace(/[0-9]+/g, " ");
    }
    var parts = name.split(/[\s._-]+/).filter(Boolean);
    var out = parts.length > 1 ? parts[0].charAt(0) + parts[parts.length - 1].charAt(0) : (parts[0] || "U").slice(0, 2);
    return out.toUpperCase().replace(/["\\]/g, "");
  }
  function apply() {
    document.documentElement.style.setProperty("--zu-initials", '"' + initials() + '"');
  }
  apply();
  if (window.$) $(document).ready(apply);
  setTimeout(apply, 1500);
})();

/* zu-sb-drag: drag the sidebar edge to resize; width is saved in this browser */
(function () {
  var MIN = 200, MAX = 420, DEF = 251, KEY = "zu_sb_w";
  var root = document.documentElement;
  function setW(w) { root.style.setProperty("--zu-sb-w", Math.round(w) + "px"); }
  var saved = 0;
  try { saved = parseInt(localStorage.getItem(KEY), 10) || 0; } catch (e) {}
  if (saved >= MIN && saved <= MAX) setW(saved);

  function build() {
    if (document.getElementById("zu-sb-resizer") || !document.body) return;
    var h = document.createElement("div");
    h.id = "zu-sb-resizer";
    h.title = "Drag to resize, double-click to reset";
    document.body.appendChild(h);
    var dragging = false;
    h.addEventListener("mousedown", function (e) {
      dragging = true;
      h.classList.add("zu-dragging");
      document.body.style.userSelect = "none";
      document.body.style.cursor = "col-resize";
      e.preventDefault();
    });
    document.addEventListener("mousemove", function (e) {
      if (!dragging) return;
      setW(Math.max(MIN, Math.min(MAX, e.clientX)));
    });
    document.addEventListener("mouseup", function () {
      if (!dragging) return;
      dragging = false;
      h.classList.remove("zu-dragging");
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
      try { localStorage.setItem(KEY, parseInt(getComputedStyle(root).getPropertyValue("--zu-sb-w"), 10)); } catch (e) {}
    });
    h.addEventListener("dblclick", function () {
      setW(DEF);
      try { localStorage.removeItem(KEY); } catch (e) {}
    });
  }
  function sync() {
    build();
    var h = document.getElementById("zu-sb-resizer");
    var sb = document.querySelector(".body-sidebar");
    if (h) h.classList.toggle("zu-show", !!(sb && sb.offsetWidth > 0));
  }
  if (window.$) $(document).ready(sync); else document.addEventListener("DOMContentLoaded", sync);
  setInterval(sync, 1000);
})();


/* zu-sb-toggle: click the sidebar edge to hide it; the small tab brings it back */
(function () {
  var KEY = "zu_sb_hidden", root = document.documentElement, tm;
  function setHidden(v) {
    root.classList.toggle("zu-sb-collapsed", v);
    try { if (v) localStorage.setItem(KEY, "1"); else localStorage.removeItem(KEY); } catch (e) {}
  }
  try { if (localStorage.getItem(KEY) === "1") root.classList.add("zu-sb-collapsed"); } catch (e) {}
  function build() {
    if (!document.body) return;
    var h = document.getElementById("zu-sb-resizer");
    if (h && !h.dataset.zuClick) {
      h.dataset.zuClick = "1";
      var x0 = null;
      h.addEventListener("mousedown", function (e) { x0 = e.clientX; });
      document.addEventListener("mouseup", function (e) {
        if (x0 !== null && Math.abs(e.clientX - x0) < 4) {
          clearTimeout(tm);
          tm = setTimeout(function () { setHidden(true); }, 250);
        }
        x0 = null;
      });
      h.addEventListener("dblclick", function () { clearTimeout(tm); });
    }
    if (!document.getElementById("zu-sb-open")) {
      var b = document.createElement("button");
      b.id = "zu-sb-open";
      b.type = "button";
      b.title = "Show sidebar";
      b.textContent = "\u203A";
      b.addEventListener("click", function () { setHidden(false); });
      document.body.appendChild(b);
    }
  }
  if (window.$) $(document).ready(build); else document.addEventListener("DOMContentLoaded", build);
  setInterval(build, 1000);
})();