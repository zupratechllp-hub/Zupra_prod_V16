(function () {
  const I = {
    home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    chart: '<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
    filesearch: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><circle cx="11.5" cy="14.5" r="2.5"/><path d="M13.3 16.3 15 18"/>',
    cart: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
    pkgcheck: '<path d="m16 16 2 2 4-4"/><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="M3.29 7 12 12l8.71-5"/><path d="M12 22V12"/>',
    receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>',
    pie: '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>',
    box: '<path d="M16.5 9.4 7.5 4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12"/>',
    building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    printer: '<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>',
    plug: '<path d="M12 22v-5"/><path d="M9 8V2M15 8V2"/><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8z"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    checksq: '<path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    wallet: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    trend: '<path d="M22 7l-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
    card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
    wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z"/>',
    truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>'
  };
  const R = [
    [/^home$/, "home"], [/dashboard/, "chart"], [/request for quotation/, "filesearch"],
    [/quotation|material request/, "file"], [/^pos$|point of sale/, "card"],
    [/receipt/, "pkgcheck"], [/delivery/, "truck"], [/invoice|bill/, "receipt"],
    [/order/, "cart"], [/^reports?$/, "pie"], [/^items?$|stock|warehouse|inventory/, "box"],
    [/setup|setting/, "gear"], [/company|organi[sz]ation/, "building"], [/access|role|permission/, "shield"],
    [/print/, "printer"], [/email|mail/, "mail"], [/data|import|export/, "database"], [/integration/, "plug"],
    [/project/, "briefcase"], [/task/, "checksq"], [/timesheet|time/, "clock"],
    [/payment|cash|bank/, "wallet"], [/journal|ledger|chart of accounts|general/, "book"],
    [/profit|trend|analytic/, "trend"], [/manufactur|bom|work order|job card|production/, "wrench"],
    [/supplier|customer|users?|party|lead/, "users"]
  ];
  function svg(k) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (I[k] || I.file) + "</svg>"; }
  function pick(t) { t = t.toLowerCase(); for (const [re, k] of R) if (re.test(t)) return k; return "file"; }
  function run() {
    document.querySelectorAll(".body-sidebar .sidebar-item-container .sidebar-item-label").forEach(function (label) {
      if (label.dataset.zu9) return;
      const name = (label.textContent || "").trim();
      if (!name) return;
      label.dataset.zu9 = "1";
      const anchor = label.closest("a, .item-anchor, .standard-sidebar-item") || label.parentElement;
      const has = [...anchor.querySelectorAll("svg, img")].some(function (el) {
        return !el.closest(".zu-side-icon") && (el.compareDocumentPosition(label) & Node.DOCUMENT_POSITION_FOLLOWING);
      });
      if (has) return;
      const s = document.createElement("span");
      s.className = "zu-side-icon";
      s.innerHTML = svg(pick(name));
      label.parentNode.insertBefore(s, label);
    });
    document.querySelectorAll(".zu-section-label").forEach(function (e) {
      e.classList.toggle("zu-sec-div", e.textContent.trim().toUpperCase() !== "OVERVIEW");
    });
  }
  let t;
  $(document).ready(function () {
    setTimeout(run, 200);
    new MutationObserver(function () { clearTimeout(t); t = setTimeout(run, 300); })
      .observe(document.body, { childList: true, subtree: true });
  });
})();
(function () {
  function fixBell() {
    var u = document.getElementById("zu-user");
    if (!u) return;
    var ur = u.getBoundingClientRect();
    if (!ur.width) return;
    document.querySelectorAll("svg").forEach(function (s) {
      if (u.contains(s) || s.closest("#zu-tools, #ask-zupra-btn, .body-sidebar, .zu-side-icon, #zu-user-menu")) return;
      var r = s.getBoundingClientRect();
      if (!r.width || r.top > 70 || r.left < ur.left - 100) return;
      if (r.right > ur.left - 14) {
        var w = s.closest("button, a, [role='button']") || s.parentElement;
        var dx = parseFloat(w.dataset.zuShift || "0") + (r.right - (ur.left - 14));
        w.dataset.zuShift = dx;
        w.style.transform = "translateX(" + (-dx) + "px)";
      }
    });
  }
  var t;
  function later() { clearTimeout(t); t = setTimeout(fixBell, 300); }
  window.addEventListener("load", function () { setTimeout(fixBell, 200); setTimeout(fixBell, 3000); });
  window.addEventListener("resize", later);
  new MutationObserver(later).observe(document.body, { childList: true, subtree: true });
})();
(function () {
  function bell() {
    document.querySelectorAll("svg").forEach(function (s) {
      if (s.dataset.zuBell) return;
      if (s.closest("#ask-zupra-btn, .body-sidebar, .zu-search, #zu-user-menu, .zu-side-icon")) return;
      var r = s.getBoundingClientRect();
      if (!r.width || r.top > 70 || r.left < innerWidth - 170) return;
      s.dataset.zuBell = "1";
      s.style.translate = "-26px 0";
    });
  }
  var t;
  function later() { clearTimeout(t); t = setTimeout(bell, 300); }
  window.addEventListener("load", function () { setTimeout(bell, 200); setTimeout(bell, 3000); });
  new MutationObserver(later).observe(document.body, { childList: true, subtree: true });
})();
