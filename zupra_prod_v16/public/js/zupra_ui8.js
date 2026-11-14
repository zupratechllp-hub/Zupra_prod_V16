(function () {
	try {
		if (localStorage.zu_topnav === "off") return;
	} catch (e) {}
	if (document.body) document.body.classList.add("zu-topnav");
	else
		document.addEventListener("DOMContentLoaded", function () {
			document.body.classList.add("zu-topnav");
		});
	const MORE = ["Organisation structure", "Setup", "Assets", "Quality"];

	const HR_MODULES = [
		{ title: "HR Setup", route: "desk/hr-setup", icon: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>', frappe_icon: "briefcase-soft" },
		{ title: "Shift & Attendance", route: "desk/shift-&-attendance", icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', frappe_icon: "time-clock-soft" },
		{ title: "Leaves", route: "desk/leaves", icon: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>', frappe_icon: "tree-palm-soft" },
		{ title: "Expenses", route: "desk/expenses", icon: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z"/><line x1="16" y1="8" x2="8" y2="8"/><line x1="16" y1="12" x2="8" y2="12"/><line x1="16" y1="16" x2="8" y2="16"/>', frappe_icon: "receipt-card-soft" },
		{ title: "Payroll", route: "desk/payroll", icon: '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>', frappe_icon: "wallet-soft" },
		{ title: "Performance", route: "desk/performance", icon: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>', frappe_icon: "podium-soft" },
		{ title: "Tenure", route: "desk/tenure", icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>', frappe_icon: "user-clock-soft" },
		{ title: "Recruitment", route: "desk/recruitment", icon: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>', frappe_icon: "user-search-soft" },
		{ title: "Tax & Benefits", route: "desk/tax-&-benefits", icon: '<line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>', frappe_icon: "coins-percent-soft" }
	];
	const HR_DOCK_LABELS = HR_MODULES.map(function (m) { return m.title; }).concat(["Human Resources"]);

	function ensureErpnextRail() {
		try {
			if (window.frappe) {
				if (frappe.boot) {
					frappe.boot.app_rail_host = frappe.boot.app_rail_host || {};
					frappe.boot.app_rail_host["hrms"] = "erpnext";
				}
				if (frappe.ui && frappe.ui.sidebar && frappe.ui.sidebar.Sidebar) {
					var proto = frappe.ui.sidebar.Sidebar.prototype;
					if (!proto._zu_rail_fixed) {
						proto._zu_rail_fixed = true;
						var origRailHost = proto.rail_host_for;
						proto.rail_host_for = function (app_name) {
							if (app_name === "hrms") return "erpnext";
							return origRailHost ? origRailHost.call(this, app_name) : app_name;
						};
						var origGetSidebarApp = proto.get_sidebar_app;
						proto.get_sidebar_app = function () {
							var app = origGetSidebarApp ? origGetSidebarApp.call(this) : null;
							if (!app || app.app_name === "hrms") {
								var erp = (frappe.boot?.app_data || []).find(function (a) {
									return a.app_name === "erpnext";
								});
								if (erp) return erp;
							}
							return app;
						};
					}
				}
				if (frappe.app && frappe.app.sidebar) {
					var sb = frappe.app.sidebar;
					if (frappe.ui && frappe.ui.sidebar && frappe.ui.sidebar.Sidebar) {
						sb.rail_host_for = frappe.ui.sidebar.Sidebar.prototype.rail_host_for;
						sb.get_sidebar_app = frappe.ui.sidebar.Sidebar.prototype.get_sidebar_app;
					}
				}
			}
		} catch (e) {}
	}
	ensureErpnextRail();

	if (window.frappe && frappe.ui && frappe.ui.sidebar && frappe.ui.sidebar.Dock) {
		frappe.ui.sidebar.Dock.prototype.name_tile = function () {};
	}

	function isHrContext() {
		var p = (window.location.pathname || "").toLowerCase();
		if (
			p.indexOf("/desk/hr") > -1 ||
			p.indexOf("/desk/shift") > -1 ||
			p.indexOf("/desk/leaves") > -1 ||
			p.indexOf("/desk/payroll") > -1 ||
			p.indexOf("/desk/recruitment") > -1 ||
			p.indexOf("/desk/expense") > -1 ||
			p.indexOf("/desk/performance") > -1 ||
			p.indexOf("/desk/tenure") > -1 ||
			p.indexOf("/desk/tax-&-benefits") > -1
		) {
			return true;
		}
		if (window.frappe) {
			var curMod = frappe.app?.sidebar?.current_module;
			if (curMod) {
				if (HR_DOCK_LABELS.indexOf(curMod) > -1) return true;
				var sb = frappe.boot?.module_sidebars?.[curMod];
				if (sb && (sb.app === "hrms" || /hr/i.test(sb.app))) return true;
			}
			if (typeof frappe.get_route === "function") {
				var r = frappe.get_route();
				if (r && r.length) {
					var r0 = String(r[0] || "").toLowerCase();
					if (
						r0.indexOf("hr-") > -1 ||
						r0.indexOf("shift") > -1 ||
						r0 === "leaves" ||
						r0 === "payroll" ||
						r0.indexOf("expense") > -1 ||
						r0 === "performance" ||
						r0 === "tenure" ||
						r0 === "recruitment" ||
						r0.indexOf("tax") > -1
					) {
						return true;
					}
				}
			}
		}
		return false;
	}

	function renderHrSidebar() {
		var itemsContainer = document.querySelector(".body-sidebar .sidebar-items");
		if (!itemsContainer) return;

		var onHr = isHrContext();
		var section = document.getElementById("zu-hr-sidebar-section");

		if (!onHr) {
			if (section) section.remove();
			return;
		}

		var curPath = (window.location.pathname || "").toLowerCase();
		var curMod = (window.frappe?.app?.sidebar?.current_module || "").toLowerCase();

		if (!section) {
			section = document.createElement("div");
			section.id = "zu-hr-sidebar-section";
			section.className = "zu-hr-modules-wrapper";

			var header = document.createElement("div");
			header.className = "zu-hr-section-header";
			header.title = "Click to toggle HR modules";
			header.innerHTML = '<span class="zu-hr-header-title">HR Modules</span><span class="zu-hr-caret">&#9662;</span>';
			header.onclick = function (e) {
				e.stopPropagation();
				section.classList.toggle("collapsed");
				try {
					localStorage.setItem("zu_hr_collapsed", section.classList.contains("collapsed") ? "1" : "0");
				} catch (err) {}
			};
			section.appendChild(header);

			if (localStorage.getItem("zu_hr_collapsed") === "1") {
				section.classList.add("collapsed");
			}

			var list = document.createElement("div");
			list.className = "zu-hr-modules-list";

			HR_MODULES.forEach(function (m) {
				var row = document.createElement("div");
				row.className = "zu-hr-nav-item";
				row.setAttribute("data-route", m.route);
				row.setAttribute("data-title", m.title);

				var a = document.createElement("a");
				a.className = "item-anchor";
				a.href = "/" + m.route;

				var iconHtml = "";
				if (window.frappe && frappe.utils && typeof frappe.utils.icon === "function" && m.frappe_icon) {
					try {
						iconHtml = frappe.utils.icon(m.frappe_icon, "sm");
					} catch (err) {}
				}
				if (!iconHtml) {
					iconHtml = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + m.icon + '</svg>';
				}

				a.innerHTML = '<span class="zu-side-icon">' + iconHtml + '</span><span class="sidebar-item-label">' + m.title + '</span>';

				a.onclick = function (ev) {
					ev.preventDefault();
					ev.stopPropagation();
					if (window.frappe) {
						if (frappe.app && frappe.app.sidebar && typeof frappe.app.sidebar.select_shell === "function") {
							try { frappe.app.sidebar.select_shell(m.title); } catch (err) {}
						}
						if (typeof frappe.set_route === "function") {
							frappe.set_route(m.route);
							return;
						}
					}
					window.location.href = "/" + m.route;
				};

				row.appendChild(a);
				list.appendChild(row);
			});

			section.appendChild(list);
			itemsContainer.insertBefore(section, itemsContainer.firstChild);
		}

		section.querySelectorAll(".zu-hr-nav-item").forEach(function (row) {
			var r = (row.getAttribute("data-route") || "").toLowerCase().replace("desk/", "");
			var t = (row.getAttribute("data-title") || "").toLowerCase();
			var isActive = (curPath.indexOf(r) > -1) || (curMod && curMod === t);
			row.classList.toggle("active", isActive);
		});
	}

	function killDockTooltips() {
		try {
			if (window.frappe && frappe.app && frappe.app.sidebar && frappe.app.sidebar.dock) {
				var d = frappe.app.sidebar.dock;
				d.name_tile = function () {};
				if (d.tooltips && d.tooltips.length) {
					d.tooltips.forEach(function (t) {
						try {
							t.destroy();
						} catch (err) {}
					});
					d.tooltips = [];
				}
			}
		} catch (err) {}
		document
			.querySelectorAll("#desk-dock .dock-item, .dock-items .dock-item")
			.forEach(function (b) {
				b.removeAttribute("title");
				if (window.$) {
					var tip = $(b).data("es-tooltip");
					if (tip) {
						try {
							tip.destroy();
						} catch (err) {}
						$(b).removeData("es-tooltip");
					}
				}
			});
	}

	function gridIcon() {
		let s = "";
		[5, 12, 19].forEach(function (y) {
			[5, 12, 19].forEach(function (x) {
				s += '<circle cx="' + x + '" cy="' + y + '" r="1.8"/>';
			});
		});
		return (
			'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">' + s + "</svg>"
		);
	}
	function openHRModule() {
		try {
			if (window.frappe) {
				if (frappe.app && frappe.app.sidebar) {
					if (
						typeof frappe.app.sidebar.open_module === "function" &&
						frappe.boot &&
						frappe.boot.module_sidebars &&
						frappe.boot.module_sidebars["HR Setup"]
					) {
						frappe.app.sidebar.open_module("HR Setup");
						return;
					}
					if (typeof frappe.app.sidebar.open_workspace === "function") {
						const hrWs = (frappe.boot?.workspaces?.pages || []).find(function (p) {
							return (
								p.name === "HR Setup" ||
								p.name === "HR" ||
								/human\s*resources|hr\s*setup/i.test(p.title || p.name)
							);
						});
						if (hrWs) {
							frappe.app.sidebar.open_workspace(hrWs.name);
							return;
						}
					}
				}
				const hrApp = (frappe.boot?.app_data || []).find(function (a) {
					return a.app_name === "hrms" || (a.app_title && /hr/i.test(a.app_title));
				});
				if (hrApp) {
					if (hrApp.route && typeof frappe.set_route === "function") {
						frappe.set_route(hrApp.route);
						return;
					}
					if (frappe.app?.sidebar?.app_landing_route) {
						const r = frappe.app.sidebar.app_landing_route(hrApp);
						if (r && typeof frappe.set_route === "function") {
							frappe.set_route(r);
							return;
						}
					}
				}
				if (typeof frappe.set_route === "function") {
					frappe.set_route("/desk/hr-setup");
					return;
				}
			}
		} catch (err) {
			console.warn("Zupra: Failed to route to HR module via Frappe API", err);
		}
		window.location.href = "/desk/hr-setup";
	}

	function items() {
		return [...document.querySelectorAll("#desk-dock .dock-items .dock-item")];
	}
	function run() {
		ensureErpnextRail();
		killDockTooltips();

		// Keep navbar clean: Hide any HR dock items from the top navbar
		let nonHrCount = 0;
		document.querySelectorAll("#desk-dock .dock-items .dock-item").forEach(function (b) {
			const label = (b.getAttribute("aria-label") || b.textContent || "").trim();
			if (HR_DOCK_LABELS.indexOf(label) > -1) {
				b.style.display = "none";
			} else {
				nonHrCount++;
			}
		});

		// If dock only had HR items rendered, trigger re-render of ERPNext dock
		if (nonHrCount === 0 && window.frappe && frappe.app && frappe.app.sidebar && frappe.app.sidebar.dock) {
			try {
				const erpApp = (frappe.boot?.app_data || []).find(function (a) { return a.app_name === "erpnext"; });
				if (erpApp && frappe.app.sidebar.dock.app !== erpApp) {
					frappe.app.sidebar.dock.app = erpApp;
					const entries = frappe.app.sidebar.collect_dock_entries(erpApp);
					frappe.app.sidebar.dock.rendered = null;
					frappe.app.sidebar.dock.render_entries(entries);
				}
			} catch (e) {}
		}

		renderHrSidebar();

		const its = items().filter(function (b) { return b.style.display !== "none"; });
		if (!its.length) return;
		its.forEach(function (b) {
			b.classList.toggle("zu-more", MORE.indexOf(b.getAttribute("aria-label")) > -1);
		});
		document.body.classList.add("zu-topnav");
		let g = document.getElementById("zu-grid");
		if (!g) {
			g = document.createElement("button");
			g.id = "zu-grid";
			g.type = "button";
			g.title = "All modules";
			g.innerHTML = gridIcon();
			const holder = document.querySelector("#desk-dock .dock-items");
			if (holder) {
				holder.parentNode.insertBefore(g, holder.nextSibling);
			}
			const m = document.createElement("div");
			m.id = "zu-grid-menu";
			document.body.appendChild(m);
			g.onclick = function (e) {
				e.stopPropagation();
				if (m.style.display === "block") {
					m.style.display = "none";
					return;
				}
				m.innerHTML = "";
				items()
					.filter(function (b) {
						return b.classList.contains("zu-more");
					})
					.forEach(function (b) {
						const r = document.createElement("div");
						r.textContent = b.getAttribute("aria-label");
						r.onclick = function () {
							m.style.display = "none";
							b.click();
						};
						m.appendChild(r);
					});

				const hrRow = document.createElement("div");
				hrRow.id = "zu-hr-module-item";
				hrRow.className = "zu-grid-item zu-grid-hr";
				hrRow.setAttribute("aria-label", "Human Resources");
				hrRow.textContent = window.__ ? __("Human Resources") : "Human Resources";
				if (isHrContext()) hrRow.classList.add("active");
				hrRow.onclick = function (ev) {
					ev.stopPropagation();
					m.style.display = "none";
					openHRModule();
				};
				m.appendChild(hrRow);

				const rc = g.getBoundingClientRect();
				m.style.left = Math.round(rc.left) + "px";
				m.style.top = Math.round(rc.bottom + 6) + "px";
				m.style.display = "block";
			};
			document.addEventListener("click", function () {
				m.style.display = "none";
			});
		}
		if (g) {
			g.classList.toggle(
				"on",
				isHrContext() ||
				its.some(function (b) {
					return b.classList.contains("zu-more") && b.classList.contains("active");
				})
			);
		}
	}
	let t;
	$(document).ready(function () {
		setTimeout(run, 0);
		new MutationObserver(function () {
			clearTimeout(t);
			t = setTimeout(run, 50);
		}).observe(document.body, { childList: true, subtree: true });
	});
})();

(function () {
	function done() {
		if (document.body) document.body.classList.add("zu-ready");
	}
	window.addEventListener("load", function () {
		setTimeout(done, 900);
	});
	setTimeout(done, 2500);
})();

/* zu-veil: cover the page until icons and top-right controls are in place */
(function () {
	function ready() {
		if (document.body) document.body.classList.add("zu-ready");
	}
	function switching() {
		document.body.classList.add("zu-switching");
		setTimeout(function () {
			document.body.classList.remove("zu-switching");
		}, 700);
	}
	window.addEventListener("load", function () {
		setTimeout(ready, 1300);
	});
	setTimeout(ready, 3500);
	if (window.$) $(document).on("page-change", switching);
})();

/* zu-initials: avatar shows the first two initials of the logged-in user */
(function () {
	function initials() {
		var s = (window.frappe && frappe.session) || {};
		var name = String(s.user_fullname || "").trim();
		if (!name || name.toLowerCase() === "guest") {
			name = String(s.user || "")
				.split("@")[0]
				.replace(/[0-9]+/g, " ");
		}
		var parts = name.split(/[\s._-]+/).filter(Boolean);
		var out =
			parts.length > 1
				? parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
				: (parts[0] || "U").slice(0, 2);
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
	var MIN = 200,
		MAX = 420,
		DEF = 251,
		KEY = "zu_sb_w";
	var root = document.documentElement;
	function setW(w) {
		root.style.setProperty("--zu-sb-w", Math.round(w) + "px");
	}
	var saved = 0;
	try {
		saved = parseInt(localStorage.getItem(KEY), 10) || 0;
	} catch (e) {}
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
			try {
				localStorage.setItem(
					KEY,
					parseInt(getComputedStyle(root).getPropertyValue("--zu-sb-w"), 10),
				);
			} catch (e) {}
		});
		h.addEventListener("dblclick", function () {
			setW(DEF);
			try {
				localStorage.removeItem(KEY);
			} catch (e) {}
		});
	}
	function sync() {
		build();
		var h = document.getElementById("zu-sb-resizer");
		var sb = document.querySelector(".body-sidebar");
		if (h) h.classList.toggle("zu-show", !!(sb && sb.offsetWidth > 0));
	}
	if (window.$) $(document).ready(sync);
	else document.addEventListener("DOMContentLoaded", sync);
	setInterval(sync, 1000);
})();

/* zu-sb-toggle: click the sidebar edge to hide it; the small tab brings it back */
(function () {
	var KEY = "zu_sb_hidden",
		root = document.documentElement,
		tm;
	function setHidden(v) {
		root.classList.toggle("zu-sb-collapsed", v);
		try {
			if (v) localStorage.setItem(KEY, "1");
			else localStorage.removeItem(KEY);
		} catch (e) {}
	}
	try {
		if (localStorage.getItem(KEY) === "1") root.classList.add("zu-sb-collapsed");
	} catch (e) {}
	function build() {
		if (!document.body) return;
		var h = document.getElementById("zu-sb-resizer");
		if (h && !h.dataset.zuClick) {
			h.dataset.zuClick = "1";
			var x0 = null;
			h.addEventListener("mousedown", function (e) {
				x0 = e.clientX;
			});
			document.addEventListener("mouseup", function (e) {
				if (x0 !== null && Math.abs(e.clientX - x0) < 4) {
					clearTimeout(tm);
					tm = setTimeout(function () {
						setHidden(true);
					}, 250);
				}
				x0 = null;
			});
			h.addEventListener("dblclick", function () {
				clearTimeout(tm);
			});
		}
		if (!document.getElementById("zu-sb-open")) {
			var b = document.createElement("button");
			b.id = "zu-sb-open";
			b.type = "button";
			b.title = "Show sidebar";
			b.textContent = "\u203A";
			b.addEventListener("click", function () {
				setHidden(false);
			});
			document.body.appendChild(b);
		}
	}
	if (window.$) $(document).ready(build);
	else document.addEventListener("DOMContentLoaded", build);
	setInterval(build, 1000);
})();
