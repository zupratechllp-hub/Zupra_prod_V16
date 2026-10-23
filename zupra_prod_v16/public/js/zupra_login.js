(() => {
	const mountZupraLogin = () => {
		const section = document.querySelector(".for-login");
		const card = section?.querySelector(".login-content.page-card");
		if (!section || !card || section.classList.contains("zupra-login-layout")) return;

		const root = document.documentElement;
		let theme = (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
		try {
			const savedTheme = localStorage.getItem("zupra-login-theme");
			if (savedTheme === "light" || savedTheme === "dark") theme = savedTheme;
		} catch (error) {
			// The OS preference remains available when browser storage is disabled.
		}

		const applyTheme = (value, button) => {
			root.dataset.zupraTheme = value;
			try {
				localStorage.setItem("zupra-login-theme", value);
			} catch (error) {
				// Theme still applies for this page view when browser storage is disabled.
			}
			if (button) {
				const nextTheme = value === "dark" ? "light" : "dark";
				button.innerHTML = value === "dark" ? '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>' : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/></svg>';
				button.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
			}
		};

		section.classList.add("zupra-login-layout");
		const heading = card.querySelector(".page-card-head h4");
		if (heading) heading.textContent = "Welcome back";
		const subtitle = card.querySelector(".page-card-subtitle");
		if (subtitle) subtitle.textContent = "Sign in to your Zupra workspace.";

		const visual = document.createElement("aside");
		visual.className = "zupra-login-visual";
		visual.setAttribute("aria-label", "About Zupra ERP");
		visual.innerHTML = `
			<div class="zupra-login-brand">
				<img src="/assets/zupra_prod_v16/images/logo.png" alt="Zupra Tech logo">
				<span>Zupra ERP</span>
			</div>
			<div class="zupra-login-copy">
				<p class="zupra-login-eyebrow">ONE CONNECTED WORKSPACE</p>
				<h1>Run your business from one place.</h1>
				<p class="zupra-login-description">Sales, inventory, accounts, and people, all working together in one clear workspace.</p>
				<ul class="zupra-login-features">
					<li><span class="zupra-login-check" aria-hidden="true"></span>Sales and inventory in sync</li>
					<li><span class="zupra-login-check" aria-hidden="true"></span>Approvals and invoicing in one flow</li>
					<li><span class="zupra-login-check" aria-hidden="true"></span>Clear dashboards for every team</li>
				</ul>
			</div>
			<p class="zupra-login-foot">Zupra Technologies</p>`;
		section.insertBefore(visual, card);

		const toggle = document.createElement("button");
		toggle.type = "button";
		toggle.className = "zupra-theme-toggle";
		toggle.addEventListener("click", () => {
			applyTheme(root.dataset.zupraTheme === "dark" ? "light" : "dark", toggle);
		});
		section.append(toggle);
		applyTheme(theme, toggle);
	};

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", mountZupraLogin, { once: true });
	} else {
		mountZupraLogin();
	}
})();
