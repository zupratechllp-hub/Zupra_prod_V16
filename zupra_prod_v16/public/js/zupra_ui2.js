(function () {
// Label shown above the item with this name. Add more here if you like.
const LABELS = { "Home": "OVERVIEW", "Sales Invoice": "TRANSACTIONS", "Reports": "REPORTS" };

function sidebarRoot() {
return document.querySelector(".body-sidebar-container") || document.querySelector(".body-sidebar");
}

function leaves(root) {
return [...root.querySelectorAll("*")].filter((e) => e.children.length === 0 && e.textContent.trim());
}

// Tag the workspace name at the top of the sidebar ("Accounts") so CSS can enlarge it
function sideTitle(root) {
const el = leaves(root).find((e) => {
const r = e.getBoundingClientRect();
return r.width > 0 && r.top > 5 && r.top < 70 && r.left > 60;
});
if (el) el.classList.add("zu-side-title");
return el ? el.textContent.trim() : "";
}

// Insert uppercase section labels into the flat sidebar list
function sectionLabels(root) {
leaves(root).forEach((e) => {
const name = e.textContent.trim();
if (!LABELS[name]) return;
const box = e.closest(".sidebar-item-container");
if (!box || !box.parentElement) return;
const prev = box.previousElementSibling;
if (prev && prev.classList.contains("zu-section-label")) return;
const l = document.createElement("div");
l.className = "zu-section-label";
l.textContent = LABELS[name];
box.parentElement.insertBefore(l, box);
});
}

// Move the user avatar from the sidebar bottom to the top right
function moveAvatar() {
const av = document.querySelector(".body-sidebar .avatar, .body-sidebar-container .avatar");
if (!av) return;
let host = av.closest(".dropdown, a, button") || av;
if (host.getBoundingClientRect().width > 120) host = av;
host.classList.add("zu-user-moved");
}

// Breadcrumb + big title block at the top of workspace pages
function pageHead(wsTitle) {
const pageEl = document.querySelector('[data-page-route="Workspaces"], #page-Workspaces');
const visible = pageEl && pageEl.offsetParent !== null;
const old = document.getElementById("zu-pagehead");
if (!visible) {
document.body.classList.remove("zu-has-head");
if (old) old.remove();
return;
}
const host = pageEl.querySelector(".page-body") || pageEl.querySelector(".layout-main-section");
if (!host) { document.body.classList.remove("zu-has-head"); return; }
document.body.classList.add("zu-has-head");

const t = pageEl.querySelector(".page-head .title-text");
const title = (t ? t.textContent : document.title.split(" - ")[0]).trim();
const act = document.querySelector(".body-sidebar .active-sidebar, .body-sidebar-container .active-sidebar");
const active = act ? act.textContent.trim().split("\n")[0].trim() : "Home";
const crumb = (wsTitle || "Home") + " / " + active;
const key = crumb + "|" + title;

let b = old;
if (!b || b.parentElement !== host) {
if (b) b.remove();
b = document.createElement("div");
b.id = "zu-pagehead";
host.prepend(b);
}
if (b.dataset.key !== key) {
b.dataset.key = key;
b.innerHTML = '<div class="zu-crumb"></div><div class="zu-big"></div>';
b.firstChild.textContent = crumb;
b.lastChild.textContent = title;
}
}

let timer;
function refresh() {
const root = sidebarRoot();
let wsTitle = "";
if (root) { wsTitle = sideTitle(root); sectionLabels(root); }
moveAvatar();
pageHead(wsTitle);
}

$(document).ready(function () {
setTimeout(refresh, 700);
new MutationObserver(() => { clearTimeout(timer); timer = setTimeout(refresh, 250); })
.observe(document.body, { childList: true, subtree: true });
});
})();

/* ---- Highlight the active icon in the left rail ---- */
(function () {
function isGreyFill(c) {
const m = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
if (!m) return false;
const [r, g, b] = [+m[1], +m[2], +m[3]];
const a = m[4] === undefined ? 1 : +m[4];
return a > 0.2 && !(r > 250 && g > 250 && b > 250) && Math.abs(r - g) < 25 && Math.abs(g - b) < 25;
}

function markActive() {
document.querySelectorAll(".zu-rail-active").forEach((e) => e.classList.remove("zu-rail-active"));
const hits = [];
document.querySelectorAll("div, a, button, li, span").forEach((e) => {
const r = e.getBoundingClientRect();
if (r.left > 75 || r.width < 36 || r.width > 64 || Math.abs(r.width - r.height) > 6 || r.top < 70) return;
const cs = getComputedStyle(e);
const rad = parseFloat(cs.borderTopLeftRadius) || 0;
if (rad < 4 || rad >= r.width / 2 - 2) return;
if (isGreyFill(cs.backgroundColor)) hits.push({ e, area: r.width * r.height });
});
hits.sort((a, b) => a.area - b.area);
if (hits.length) hits[0].e.classList.add("zu-rail-active");
}

let t;
$(document).ready(function () {
setTimeout(markActive, 800);
new MutationObserver(() => { clearTimeout(t); t = setTimeout(markActive, 300); })
.observe(document.body, { childList: true, subtree: true });
$(document).on("page-change", () => setTimeout(markActive, 500));
});
})();
