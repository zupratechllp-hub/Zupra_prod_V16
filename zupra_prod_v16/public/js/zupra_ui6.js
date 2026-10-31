(function () {
  try { localStorage.container_fullwidth = "true"; } catch (e) {}
  const P = {
    userx: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M17 8l5 5M22 8l-5 5"/>',
    userplus: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    percent: '<path d="M19 5L5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
    cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    filex: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9.5 12.5l5 5M14.5 12.5l-5 5"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
    trend: '<path d="M22 7l-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>'
  };
  const R = [
    [/inactive|without|dormant/, "userx"],
    [/acquisition|loyalty/, "userplus"],
    [/territory|region/, "globe"],
    [/commission/, "percent"],
    [/target|variance|budget/, "target"],
    [/credit/, "card"],
    [/payment terms|\bdue\b|overdue/, "cal"],
    [/lost|cancel|reject/, "filex"],
    [/profit|margin/, "trend"],
    [/^(?!.*(payable|receivable|ledger)).*(summary|transaction)/, "layers"]
  ];
  function run() {
    document.body.classList.add("full-width");
    document.querySelectorAll(".links-widget-box .link-item.zu-has-icon").forEach((a) => {
      const ic = a.querySelector(".zu-link-icon");
      if (!ic) return;
      const label = (a.textContent || "").trim().toLowerCase();
      if (a.dataset.zu6 === label) return;
      a.dataset.zu6 = label;
      for (const [re, k] of R) {
        if (re.test(label)) { ic.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + P[k] + "</svg>"; break; }
      }
    });
  }
  let t;
  $(document).ready(function () {
    setTimeout(run, 1400);
    new MutationObserver(() => { clearTimeout(t); t = setTimeout(run, 450); })
      .observe(document.body, { childList: true, subtree: true });
  });
})();
