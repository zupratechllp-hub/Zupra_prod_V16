(() => {
	const logo = "/assets/zupra_prod_v16/images/logo.png";
	const deskHome = "/desk/setup/home";
	const homePath = "/desk/setup/home";
	const normalizePath = () => window.location.pathname.replace(/\/+$/, "");

	if (normalizePath() === "/desk") {
		window.location.replace(deskHome + window.location.search + window.location.hash);
		return;
	}

	const icons = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');
	icons.forEach((icon) => {
		icon.href = logo;
		icon.type = "image/png";
	});

	const logoSelector = ".dock-logo .shell-header, .app-logo";

	// Point the actual rail anchor at Setup Home so the browser preview is correct.
	// On Setup Home the link is inert, so clicking the logo keeps the current page open.
	const updateLogoLinks = () => {
		document.querySelectorAll(logoSelector).forEach((appLogo) => {
			if (appLogo.tagName === "A") {
				appLogo.href = deskHome;
				appLogo.setAttribute("aria-disabled", String(normalizePath() === homePath));
			}
		});
	};

	document.addEventListener(
		"click",
		(event) => {
			const appLogo = event.target.closest(logoSelector);
			if (!appLogo) return;

			event.preventDefault();
			event.stopImmediatePropagation();
			if (normalizePath() !== homePath) window.location.assign(deskHome);
		},
		true,
	);

	updateLogoLinks();
	new MutationObserver(updateLogoLinks).observe(document.documentElement, {
		childList: true,
		subtree: true,
	});
})();
