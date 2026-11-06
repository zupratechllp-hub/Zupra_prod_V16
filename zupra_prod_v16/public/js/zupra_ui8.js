(function () {
  try { if (localStorage.zu_topnav === "off") return; } catch (e) {}
  if (document.body) document.body.classList.add("zu-topnav"); else document.addEventListener("DOMContentLoaded", function () { document.body.classList.add("zu-topnav"); });
  const MORE = ["Organisation structure", "Setup", "Assets", "Quality"];
  function gridIcon() {
    let s = "";
    [5, 12, 19].forEach(function (y) {
      [5, 12, 19].forEach(function (x) { s += '<circle cx="' + x + '" cy="' + y + '" r="1.8"/>'; });
    });
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">' + s + "</svg>";
  }
  function items() { return [...document.querySelectorAll("#desk-dock .dock-items .dock-item")]; }
  function run() {
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
