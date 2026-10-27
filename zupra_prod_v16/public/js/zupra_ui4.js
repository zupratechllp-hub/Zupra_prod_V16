(function () {
  function killBottomLeft() {
    document.querySelectorAll("body *").forEach((e) => {
      if (e.id && e.id.indexOf("zu-") === 0) return;
      if (e.closest("#zu-settings, #zu-user, #zu-user-menu")) return;
      const r = e.getBoundingClientRect();
      if (r.width < 20 || r.width > 70 || r.height < 20 || r.height > 70) return;
      if (r.left > 64 || r.top < innerHeight - 120) return;
      e.classList.add("zu-kill");
    });
  }
  function buildUser() {
    if (document.getElementById("zu-user")) return;
    const b = document.createElement("div");
    b.id = "zu-user";
    const img = frappe.boot && frappe.boot.user && frappe.boot.user.image;
    b.innerHTML = img ? '<img src="' + img + '">' :
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>';
    document.body.appendChild(b);
    const m = document.createElement("div");
    m.id = "zu-user-menu";
    [["My Settings", () => frappe.set_route("Form", "User", frappe.session.user)],
     ["Toggle Theme", () => { try { new frappe.ui.ThemeSwitcher().show(); } catch (e) {} }],
     ["Logout", () => frappe.app.logout()]].forEach((x) => {
      const i = document.createElement("div");
      i.textContent = x[0];
      i.onclick = () => { m.style.display = "none"; x[1](); };
      m.appendChild(i);
    });
    document.body.appendChild(m);
    b.onclick = (e) => { e.stopPropagation(); m.style.display = m.style.display === "block" ? "none" : "block"; };
    document.addEventListener("click", () => (m.style.display = "none"));
  }
  function fixGear() {
    const g = document.getElementById("zu-settings");
    if (g && !g.dataset.zu) {
      g.dataset.zu = "1";
      g.removeAttribute("href");
      g.onclick = () => frappe.set_route("Form", "System Settings");
    }
  }
  let t;
  function run() { killBottomLeft(); buildUser(); fixGear(); }
  $(document).ready(function () {
    setTimeout(run, 1200);
    new MutationObserver(() => { clearTimeout(t); t = setTimeout(run, 300); })
      .observe(document.body, { childList: true, subtree: true });
  });
})();
(function () {
  function setLetter() {
    const b = document.getElementById("zu-user");
    if (!b || b.dataset.letter) return;
    const n = (frappe.session && (frappe.session.user_fullname || frappe.session.user)) || "U";
    b.innerHTML = "";
    b.textContent = n.trim().charAt(0).toUpperCase();
    b.dataset.letter = "1";
  }
  $(document).ready(function () {
    setInterval(setLetter, 500);
  });
})();
(function () {
  function tagDots() {
    document.querySelectorAll(".zu-dots").forEach((e) => e.classList.remove("zu-dots"));
    if (!document.body.classList.contains("zu-on-ws")) return;
    let best = null, area = 0;
    document.querySelectorAll("button, a, div, span").forEach((e) => {
      if (e.closest("#zu-tools, #zu-user, #zu-user-menu, #zu-new-menu, #zu-settings")) return;
      const r = e.getBoundingClientRect();
      if (r.top > 70 || r.left < innerWidth - 200) return;
      if (r.width < 18 || r.width > 50 || r.height < 18 || r.height > 50) return;
      if (r.width * r.height > area) { area = r.width * r.height; best = e; }
    });
    if (best) best.classList.add("zu-dots");
  }
  let t;
  $(document).ready(function () {
    setTimeout(tagDots, 1500);
    new MutationObserver(() => { clearTimeout(t); t = setTimeout(tagDots, 400); })
      .observe(document.body, { childList: true, subtree: true });
  });
})();
