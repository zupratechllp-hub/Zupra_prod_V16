(function () {
const NEW_ITEMS = ["Sales Invoice", "Purchase Invoice", "Payment Entry", "Journal Entry", "Sales Order", "Customer", "Item"];

function findByText(t) {
return [...document.querySelectorAll("span,div,a")].find(
(e) => e.children.length === 0 && e.textContent.trim() === t && e.getBoundingClientRect().left < 360
);
}

function markItem(el) {
if (!el) return;
const box = el.closest(".sidebar-item-container") || el.closest("a") || el.parentElement;
if (box) box.classList.add("zu-hide");
}

function proxyClick(label) {
const el = findByText(label);
if (el) el.click();
}

function onWorkspace() {
const pg = document.querySelector('[data-page-route="Workspaces"], #page-Workspaces');
return !!(pg && pg.offsetParent !== null);
}

function build() {
if (document.getElementById("zu-tools")) return;
const d = document.createElement("div");
d.id = "zu-tools";
d.innerHTML =
'<div class="zu-search" id="zu-search">' +
'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>' +
"<span>Search or jump to...</span><kbd>Ctrl K</kbd></div>" +
'<button class="zu-bell" id="zu-bell"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 003.4 0"/></svg></button>' +
'<button class="zu-new" id="zu-new">+ New</button>';
document.body.appendChild(d);

const menu = document.createElement("div");
menu.id = "zu-new-menu";
NEW_ITEMS.forEach((dt) => {
const i = document.createElement("div");
i.textContent = dt;
i.onclick = () => { menu.style.display = "none"; frappe.new_doc(dt); };
menu.appendChild(i);
});
document.body.appendChild(menu);

document.getElementById("zu-search").onclick = () => proxyClick("Search");
document.getElementById("zu-bell").onclick = () => proxyClick("Notification");
document.getElementById("zu-new").onclick = (e) => {
e.stopPropagation();
menu.style.display = menu.style.display === "block" ? "none" : "block";
};
document.addEventListener("click", () => (menu.style.display = "none"));
}

let t;
function refresh() {
build();
markItem(findByText("Search"));
markItem(findByText("Notification"));
document.body.classList.toggle("zu-on-ws", onWorkspace());
}

$(document).ready(function () {
setTimeout(refresh, 500);
new MutationObserver(() => { clearTimeout(t); t = setTimeout(refresh, 200); })
.observe(document.body, { childList: true, subtree: true });
});
})();
