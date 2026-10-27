(function () {
  function stripIcons() {
    document.querySelectorAll(".body-sidebar .sidebar-item-container .sidebar-item-label").forEach((label) => {
      const anchor = label.closest("a, .item-anchor, .standard-sidebar-item");
      if (!anchor) return;
      anchor.querySelectorAll("svg, img, .icon, .sidebar-item-icon").forEach((ic) => {
        if (ic.compareDocumentPosition(label) & Node.DOCUMENT_POSITION_FOLLOWING) {
          ic.classList.add("zu-no-icon");
        }
      });
    });
  }

  function moveAvatarFallback() {
    if (document.querySelector(".zu-user-moved")) return;
    const z = [...document.querySelectorAll("div,span,a,button")].find((e) => {
      const r = e.getBoundingClientRect();
      return e.children.length === 0 && e.textContent.trim().length === 1 &&
             r.width > 0 && r.left < 75 && r.top > window.innerHeight - 110;
    });
    if (!z) return;
    let host = z;
    while (host.parentElement && host.parentElement.getBoundingClientRect().width <= 60 &&
           host.parentElement !== document.body) host = host.parentElement;
    host.classList.add("zu-user-moved");
  }

  function addSettings() {
    if (document.getElementById("zu-settings")) return;
    const a = document.createElement("a");
    a.id = "zu-settings";
    a.title = "Settings";
    a.href = "/desk/setup/home";
    a.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>';
    document.body.appendChild(a);
  }

  let t;
  function refresh() { stripIcons(); moveAvatarFallback(); addSettings(); }
  $(document).ready(function () {
    setTimeout(refresh, 900);
    new MutationObserver(() => { clearTimeout(t); t = setTimeout(refresh, 300); })
      .observe(document.body, { childList: true, subtree: true });
  });
})();

(function () {
  function darkBlue(c) {
    const m = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (!m) return false;
    const r = +m[1], b = +m[3], a = m[4] === undefined ? 1 : +m[4];
    return a > 0.5 && r < 90 && b > 150 && b - r > 80;
  }
  function markActive() {
    document.querySelectorAll(".zu-active-item").forEach((e) => e.classList.remove("zu-active-item"));
    document.querySelectorAll("a, div, li").forEach((e) => {
      const r = e.getBoundingClientRect();
      if (r.left > 330 || r.width < 100 || r.height < 24 || r.height > 70) return;
      if (e.closest("#zu-tools")) return;
      if (darkBlue(getComputedStyle(e).backgroundColor)) e.classList.add("zu-active-item");
    });
  }
  function moveUser() {
    if (document.querySelector(".zu-user-moved")) return;
    const el = [...document.querySelectorAll('[class*="avatar"], .dropdown, .dropup')].find((e) => {
      const r = e.getBoundingClientRect();
      return !e.closest("#zu-settings") && r.width > 0 && r.width < 70 && r.left < 75 && r.top > window.innerHeight - 130;
    });
    if (el) el.classList.add("zu-user-moved");
  }
  function run() { markActive(); moveUser(); }
  let t;
  $(document).ready(function () {
    setTimeout(run, 1000);
    new MutationObserver(() => { clearTimeout(t); t = setTimeout(run, 300); })
      .observe(document.body, { childList: true, subtree: true });
    document.addEventListener("click", () => { setTimeout(markActive, 150); setTimeout(markActive, 600); }, true);
  });
})();
