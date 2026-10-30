(function () {
const chat = [];
const HKEY = () => "ask_zupra_history:" + (frappe.session.user || "guest");

const css = `
#ask-zupra-btn { background:#1c4ed8; color:#fff; border:1px solid #3b82f6; border-radius:8px;
height:42px; padding:0 24px; font-weight:600; font-size:14px; margin-left:20px; vertical-align:middle; cursor:pointer;
box-shadow:0 2px 8px rgba(28,78,216,.4); transition:background .15s ease; }
#ask-zupra-btn:hover { background:#1d40af; }
#ask-zupra-btn.floating { position:fixed; top:2px; left:380px; margin-left:0; z-index:1030; }
[data-theme="dark"] #ask-zupra-btn { background:#1c4ed8 !important; color:#fff !important;
border-color:#3b82f6 !important; box-shadow:0 2px 8px rgba(28,78,216,.55) !important; }
[data-theme="dark"] #ask-zupra-btn:hover { background:#1d40af !important; }
#ask-zupra-panel { position:fixed; top:70px; left:380px; right:200px; height:560px; z-index:1050;
background:#fff; border:1px solid #d1d5db; border-radius:12px; display:none;
flex-direction:column; box-shadow:0 10px 30px rgba(0,0,0,.25); color:#111; }
[data-theme="dark"] #ask-zupra-panel { background:#111d2e !important; border-color:#253954 !important;
color:#d2deee !important; box-shadow:0 10px 40px rgba(0,0,0,.5) !important; }
#ask-zupra-panel .az-head { background:#0b1f3f; color:#fff; padding:10px 14px;
border-radius:12px 12px 0 0; display:flex; justify-content:space-between; font-weight:600; }
[data-theme="dark"] #ask-zupra-panel .az-head { background:#0d2040 !important; }
#ask-zupra-panel .az-head span { cursor:pointer; }
#ask-zupra-panel .az-main { flex:1; display:flex; min-height:0; }
#ask-zupra-panel .az-side { width:260px; border-right:1px solid #e5e7eb; background:#f3f4f6;
border-bottom-left-radius:12px; display:flex; flex-direction:column; }
[data-theme="dark"] #ask-zupra-panel .az-side { background:#0d1827 !important; border-right-color:#253954 !important; }
#ask-zupra-panel .az-side-head { display:flex; justify-content:space-between; align-items:center;
padding:12px 12px 8px; font-weight:600; font-size:13px; }
[data-theme="dark"] #ask-zupra-panel .az-side-head { color:#d2deee !important; }
#ask-zupra-panel .az-clear { font-size:11px; color:#2563eb; cursor:pointer; font-weight:500; }
[data-theme="dark"] #ask-zupra-panel .az-clear { color:#79b4ff !important; }
#az-hist { flex:1; overflow-y:auto; padding:0 8px 8px; }
.az-hitem { padding:8px 10px; margin-bottom:6px; background:#fff; border:1px solid #e5e7eb;
border-radius:8px; font-size:12.5px; cursor:pointer; white-space:nowrap;
overflow:hidden; text-overflow:ellipsis; }
[data-theme="dark"] .az-hitem { background:#162234 !important; border-color:#344963 !important; color:#d2deee !important; }
.az-hitem:hover { background:#e0e7ff; border-color:#c7d2fe; }
[data-theme="dark"] .az-hitem:hover { background:#1a2d45 !important; border-color:#2879dc !important; }
.az-empty { font-size:12px; color:#6b7280; padding:8px 10px; }
[data-theme="dark"] .az-empty { color:#a7b8cf !important; }
#ask-zupra-panel .az-chat { flex:1; display:flex; flex-direction:column; min-width:0; }
#ask-zupra-panel .az-body { flex:1; overflow-y:auto; padding:12px; background:#f9fafb; }
[data-theme="dark"] #ask-zupra-panel .az-body { background:#0b1422 !important; }
.az-msg { margin-bottom:10px; padding:8px 12px; border-radius:10px; max-width:75%; font-size:13px; word-wrap:break-word; }
.az-msg.user { background:#2563eb; color:#fff; margin-left:auto; }
.az-msg.bot { background:#fff; border:1px solid #e5e7eb; }
[data-theme="dark"] .az-msg.bot { background:#111d2e !important; border-color:#253954 !important; color:#d2deee !important; }
.az-msg.bot p { margin:0 0 6px; }
#ask-zupra-panel .az-foot { display:flex; gap:6px; padding:10px; border-top:1px solid #e5e7eb; }
[data-theme="dark"] #ask-zupra-panel .az-foot { border-top-color:#253954 !important; background:#111d2e !important; }
#ask-zupra-panel input { flex:1; border:1px solid #d1d5db; border-radius:8px; padding:6px 10px; }
[data-theme="dark"] #ask-zupra-panel input { background:#0d1827 !important; border-color:#344963 !important;
color:#f0f5ff !important; }
[data-theme="dark"] #ask-zupra-panel input::placeholder { color:#a7b8cf !important; }
#ask-zupra-panel .az-send { background:#2563eb; color:#fff; border:none; border-radius:8px; padding:6px 14px; }
[data-theme="dark"] #ask-zupra-panel .az-send { background:#1c4ed8 !important; }
@media (max-width: 800px) { #ask-zupra-panel .az-side { display:none; } #ask-zupra-panel { left:10px; right:10px; } }`;

let memHist = null;
function getHist() {
if (memHist) return memHist;
try { memHist = JSON.parse(localStorage.getItem(HKEY()) || "[]"); } catch (e) { memHist = []; }
return memHist;
}

function saveHist(q) {
let h = getHist().filter((x) => x !== q);
h.unshift(q);
h = h.slice(0, 5);
memHist = h;
try { localStorage.setItem(HKEY(), JSON.stringify(h)); } catch (e) { console.warn("Ask Zupra: could not save history", e); }
renderHist();
}

function renderHist() {
const box = document.getElementById("az-hist");
if (!box) return;
box.innerHTML = "";
const h = getHist();
if (!h.length) {
box.innerHTML = '<div class="az-empty">No searches yet</div>';
return;
}
h.forEach((q) => {
const d = document.createElement("div");
d.className = "az-hitem";
d.textContent = q;
d.title = q;
d.onclick = () => send(q);
box.appendChild(d);
});
}

function init() {
if (document.getElementById("ask-zupra-style")) return;
const style = document.createElement("style");
style.id = "ask-zupra-style";
style.textContent = css;
document.head.appendChild(style);

const panel = document.createElement("div");
panel.id = "ask-zupra-panel";
panel.innerHTML = `
<div class="az-head">Ask Zupra <span id="az-close">✕</span></div>
<div class="az-main">
<div class="az-side">
<div class="az-side-head">Recent searches <span class="az-clear" id="az-clear">Clear</span></div>
<div id="az-hist"></div>
</div>
<div class="az-chat">
<div class="az-body" id="az-body"></div>
<div class="az-foot">
<input id="az-input" type="text" placeholder="Ask about Zupra ERP..." autocomplete="off">
<button class="az-send" id="az-send">Send</button>
</div>
</div>
</div>`;
document.body.appendChild(panel);

addMsg("bot", "Hi! I'm Zupra. Ask me anything about using Zupra ERP.");
renderHist();

document.getElementById("az-close").onclick = () => { panel.style.display = "none"; resetChat(); };
document.getElementById("az-send").onclick = () => send();
document.getElementById("az-clear").onclick = () => {
memHist = []; try { localStorage.removeItem(HKEY()); } catch (e) {}
renderHist();
};
document.getElementById("az-input").addEventListener("keydown", (e) => {
if (e.key === "Enter") send();
});
}

function resetChat() {
chat.length = 0;
document.getElementById("az-body").innerHTML = "";
addMsg("bot", "Hi! I'm Zupra. Ask me anything about using Zupra ERP.");
document.getElementById("az-input").value = "";
}

function addMsg(who, text) {
const body = document.getElementById("az-body");
const div = document.createElement("div");
div.className = "az-msg " + who;
div.innerHTML =
who === "bot" ? frappe.markdown(text) : frappe.utils.escape_html(text);
body.appendChild(div);
body.scrollTop = body.scrollHeight;
return div;
}

function send(override) {
const input = document.getElementById("az-input");
const text = (override || input.value).trim();
if (!text) return;
input.value = "";
addMsg("user", text);
saveHist(text);
const loading = addMsg("bot", "Thinking...");

frappe.call({
method: "zupra_prod_v16.zupra_ai.ask_zupra",
args: { message: text, history: JSON.stringify(chat) },
callback: (r) => {
const reply = r.message || "No response.";
loading.innerHTML = frappe.markdown(reply);
chat.push({ role: "user", text }, { role: "model", text: reply });
},
error: () => {
loading.innerHTML = "Sorry, something went wrong. Please try again.";
},
});
}

function placeButton() {
init();
let btn = document.getElementById("ask-zupra-btn");
if (!btn) {
btn = document.createElement("button");
btn.id = "ask-zupra-btn";
btn.textContent = "Ask Zupra";
btn.onclick = () => {
const p = document.getElementById("ask-zupra-panel");
if (p.style.display === "flex") { p.style.display = "none"; resetChat(); } else { p.style.display = "flex"; }
document.getElementById("az-input").focus();
};
}

const target = null;
if (target) {
if (btn.parentElement !== target) {
btn.classList.remove("floating");
target.appendChild(btn);
}
} else if (!btn.parentElement) {
btn.classList.add("floating");
document.body.appendChild(btn);
}
}

let _t;
$(document).ready(function () {
placeButton();
$(document).on("page-change", () => setTimeout(placeButton, 300));
new MutationObserver(() => {
clearTimeout(_t);
_t = setTimeout(placeButton, 150);
}).observe(document.body, { childList: true, subtree: true });
});
})();
