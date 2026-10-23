(() => {
	const logo = "/assets/zupra_prod_v16/images/logo.png";
	const icons = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');

	icons.forEach((icon) => {
		icon.href = logo;
		icon.type = "image/png";
	});
})();
