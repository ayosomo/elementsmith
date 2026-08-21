const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const escapeHTML = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);

class ElementSmithButton extends HTMLElement {
  static observedAttributes = ["variant", "size", "icon", "loading", "disabled", "label"];
  connectedCallback() {
    if (!this.hasAttribute("label")) this.setAttribute("label", this.textContent.trim() || "Button");
    this.render();
  }
  attributeChangedCallback() { if (this.isConnected) this.render(); }
  render() {
    const variant = this.getAttribute("variant") || "primary";
    const size = this.getAttribute("size") || "medium";
    const label = this.getAttribute("label") || "Button";
    const loading = this.hasAttribute("loading");
    const disabled = this.hasAttribute("disabled") || loading;
    const icon = this.hasAttribute("icon") && !loading;
    this.innerHTML = `<button class="es-button" data-variant="${variant}" data-size="${size}" type="button" ${disabled ? "disabled" : ""} ${loading ? 'aria-busy="true"' : ""}><span>${escapeHTML(loading ? "Working…" : label)}</span>${loading ? '<i class="spinner" aria-hidden="true"></i>' : icon ? '<b aria-hidden="true">→</b>' : ""}</button>`;
  }
}
customElements.define("es-button", ElementSmithButton);

// Theme
const themeToggle = $("#themeToggle");
if (localStorage.getItem("elementsmith-theme") === "dark") document.body.classList.add("dark");
const syncThemeLabel = () => {
  const dark = document.body.classList.contains("dark");
  themeToggle.setAttribute("aria-label", `Switch to ${dark ? "light" : "dark"} colour theme`);
  themeToggle.textContent = dark ? "☼" : "◐";
  $("meta[name='theme-color']").setAttribute("content", dark ? "#1d1f1a" : "#f4f1eb");
};
syncThemeLabel();
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("elementsmith-theme", document.body.classList.contains("dark") ? "dark" : "light");
  syncThemeLabel();
});

// Hero preview controls
$("#heroControls").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const group = button.closest(".segmented");
  $$("button", group).forEach((item) => item.classList.remove("selected"));
  button.classList.add("selected");
  const demo = $("#heroDemoButton");
  if (group.dataset.control === "variant") demo.dataset.variant = button.dataset.value;
  else demo.dataset.size = button.dataset.value;
});

// Catalogue filters and switches
$(".catalogue-filter").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  $$("button", button.parentElement).forEach((item) => item.classList.remove("selected"));
  button.classList.add("selected");
  $$(".component-card").forEach((card) => { card.hidden = button.dataset.filter !== "all" && card.dataset.category !== button.dataset.filter; });
});
$$('[role="switch"]').forEach((control) => {
  control.addEventListener("click", () => {
    const active = control.getAttribute("aria-checked") === "true";
    control.setAttribute("aria-checked", String(!active));
    control.classList.toggle("off", active);
  });
});

// Tabs specimen
const tabList = $(".tabs-preview [role='tablist']");
const tabMessage = $("[data-tab-panel]");
const tabCopy = { Overview: "Crafted for composition.", Usage: "Drop it into any interface.", API: "Small, consistent attributes." };
const activateTab = (tab) => {
  $$('[role="tab"]', tabList).forEach((item) => {
    const active = item === tab;
    item.classList.toggle("active", active);
    item.setAttribute("aria-selected", String(active));
    item.tabIndex = active ? 0 : -1;
  });
  tabMessage.textContent = tabCopy[tab.textContent];
};
tabList.addEventListener("click", (event) => { const tab = event.target.closest('[role="tab"]'); if (tab) activateTab(tab); });
tabList.addEventListener("keydown", (event) => {
  if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
  event.preventDefault();
  const tabs = $$('[role="tab"]', tabList);
  const direction = event.key === "ArrowRight" ? 1 : -1;
  const next = tabs[(tabs.indexOf(document.activeElement) + direction + tabs.length) % tabs.length];
  activateTab(next); next.focus();
});

// Dropdown specimen
const dropdown = $(".dropdown");
const dropdownTrigger = $(".dropdown-trigger", dropdown);
const dropdownMenu = $("[role='listbox']", dropdown);
const closeDropdown = (returnFocus = false) => {
  dropdownMenu.hidden = true;
  dropdownTrigger.setAttribute("aria-expanded", "false");
  if (returnFocus) dropdownTrigger.focus();
};
const openDropdown = () => {
  dropdownMenu.hidden = false;
  dropdownTrigger.setAttribute("aria-expanded", "true");
  ($('[aria-selected="true"]', dropdownMenu) || $("li", dropdownMenu)).focus();
};
dropdownTrigger.addEventListener("click", () => dropdownMenu.hidden ? openDropdown() : closeDropdown());
dropdownTrigger.addEventListener("keydown", (event) => {
  if (["ArrowDown", "Enter", " "].includes(event.key)) { event.preventDefault(); openDropdown(); }
});
dropdownMenu.addEventListener("keydown", (event) => {
  const options = $$('[role="option"]', dropdownMenu);
  const index = options.indexOf(document.activeElement);
  if (["ArrowDown", "ArrowUp"].includes(event.key)) {
    event.preventDefault();
    const direction = event.key === "ArrowDown" ? 1 : -1;
    options[(index + direction + options.length) % options.length].focus();
  }
  if (event.key === "Enter") { event.preventDefault(); document.activeElement.click(); }
  if (event.key === "Escape") { event.preventDefault(); closeDropdown(true); }
});
dropdownMenu.addEventListener("click", (event) => {
  const option = event.target.closest('[role="option"]');
  if (!option) return;
  $$('[role="option"]', dropdownMenu).forEach((item) => item.setAttribute("aria-selected", String(item === option)));
  dropdownTrigger.firstChild.textContent = `Sort: ${option.textContent} `;
  closeDropdown(true);
});
document.addEventListener("click", (event) => { if (!dropdown.contains(event.target)) closeDropdown(); });

// Modal
const demoModal = $("#demoModal");
const openModal = $("#openModal");
let modalTrigger = null;
openModal.addEventListener("click", () => { modalTrigger = document.activeElement; demoModal.showModal(); });
demoModal.addEventListener("close", () => modalTrigger?.focus());
demoModal.addEventListener("click", (event) => { if (event.target === demoModal) demoModal.close("cancel"); });

// Playground
const propertyForm = $("#propertyForm");
const playgroundButton = $("#playgroundButton");
const generatedCode = $("#generatedCode");
let plainCode = "";
const getPropertyState = () => {
  const data = new FormData(propertyForm);
  return { variant: data.get("variant"), size: data.get("size"), label: (data.get("label") || "Button").trim() || "Button", icon: data.get("icon") === "on", loading: data.get("loading") === "on", disabled: data.get("disabled") === "on" };
};
const makeCode = (state) => {
  const optional = [state.icon && "  icon", state.loading && "  loading", state.disabled && "  disabled"].filter(Boolean);
  return ["<es-button", `  variant="${state.variant}"`, `  size="${state.size}"`, ...optional, ">", `  ${state.label}`, "</es-button>"].join("\n");
};
const highlightCode = (code) => escapeHTML(code)
  .replace(/(&lt;\/?)(es-button)/g, '$1<span class="code-tag">$2</span>')
  .replace(/\b(variant|size|icon|loading|disabled)(?==|\s|&gt;)/g, '<span class="code-attr">$1</span>')
  .replace(/(&quot;.*?&quot;)/g, '<span class="code-string">$1</span>');
const updatePlayground = () => {
  const state = getPropertyState();
  playgroundButton.setAttribute("variant", state.variant);
  playgroundButton.setAttribute("size", state.size);
  playgroundButton.setAttribute("label", state.label);
  ["icon", "loading", "disabled"].forEach((attribute) => playgroundButton.toggleAttribute(attribute, state[attribute]));
  plainCode = makeCode(state);
  generatedCode.innerHTML = highlightCode(plainCode);
};
propertyForm.addEventListener("input", updatePlayground);
propertyForm.addEventListener("reset", () => setTimeout(updatePlayground));
updatePlayground();
$$('[data-stage]').forEach((button) => button.addEventListener("click", () => {
  $$('[data-stage]').forEach((item) => item.classList.toggle("active", item === button));
  $("#playgroundStage").classList.toggle("dark-stage", button.dataset.stage === "dark");
}));

// Toast and copy
const toast = $("#toast");
let toastTimer;
const showNotification = (title, detail) => {
  $("strong", toast).textContent = title;
  $("small", toast).textContent = detail;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, 4200);
};
$("button", toast).addEventListener("click", () => { toast.hidden = true; });
$("#showToast").addEventListener("click", () => showNotification("Component saved", "Your changes are ready to reuse."));
$("#copyCode").addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(plainCode); }
  catch {
    const textArea = document.createElement("textarea");
    textArea.value = plainCode; document.body.append(textArea); textArea.select(); document.execCommand("copy"); textArea.remove();
  }
  showNotification("Copied to clipboard", "Your component markup is ready.");
});

// Search palette
const searchDialog = $("#searchDialog");
const searchInput = $("#searchInput");
const searchResults = $("#searchResults");
const searchItems = [
  ["Button", "Input", "#buttons"], ["Text input", "Input", "#buttons"], ["Checkbox", "Input", "#buttons"], ["Switch", "Input", "#buttons"],
  ["Tabs", "Navigation", "#buttons"], ["Dropdown", "Navigation", "#buttons"], ["Pagination", "Navigation", "#buttons"], ["Alert", "Feedback", "#buttons"],
  ["Modal", "Overlay", "#buttons"], ["Progress", "Feedback", "#buttons"], ["Skeleton", "Feedback", "#buttons"], ["Toast", "Feedback", "#buttons"],
  ["Playground", "Resource", "#playground"], ["Accessibility", "Foundation", "#accessibility"],
];
const renderSearch = () => {
  const query = searchInput.value.trim().toLowerCase();
  const items = searchItems.filter(([name, category]) => `${name} ${category}`.toLowerCase().includes(query));
  searchResults.innerHTML = items.map(([name, category, href]) => `<button class="search-result" type="button" data-href="${href}"><strong>${name}</strong><span>${category}</span></button>`).join("") || '<p style="padding:20px;color:var(--muted);font-size:11px">No elements found.</p>';
};
const openSearch = () => {
  if (!searchDialog.open) searchDialog.showModal();
  searchInput.value = ""; renderSearch(); searchInput.focus();
};
$(".search-trigger").addEventListener("click", openSearch);
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); openSearch(); }
});
searchInput.addEventListener("input", renderSearch);
searchResults.addEventListener("click", (event) => {
  const result = event.target.closest("[data-href]");
  if (!result) return;
  searchDialog.close(); location.hash = result.dataset.href;
});
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown") { event.preventDefault(); $(".search-result", searchResults)?.focus(); }
  if (event.key === "Enter") $(".search-result", searchResults)?.click();
});

// Documentation position
const sectionLinks = $$(".sidebar a[href^='#']");
const observedSections = sectionLinks.map((link) => $(link.getAttribute("href"))).filter(Boolean);
const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  sectionLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`));
}, { rootMargin: "-20% 0px -65%", threshold: [0, .25, .5] });
observedSections.forEach((section) => observer.observe(section));
