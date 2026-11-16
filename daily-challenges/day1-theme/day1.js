const THEME_KEY = "daily-challenge-theme";
const themes = ["light", "dark"];
const toggle = document.querySelector("#theme-toggle");
const status = document.querySelector("#theme-status");

function readSavedTheme() {
    try {
        const savedTheme = localStorage.getItem(THEME_KEY);
        return themes.includes(savedTheme) ? savedTheme : "light";
    } catch {
        return "light";
    }
}

function applyTheme(theme) {
    document.body.dataset.theme = theme;
    const isDark = theme === "dark";
    toggle.textContent = `Switch to ${isDark ? "light" : "dark"} mode`;
    toggle.setAttribute("aria-pressed", String(isDark));
    status.textContent = `${theme[0].toUpperCase()}${theme.slice(1)} mode is on.`;
}

applyTheme(readSavedTheme());

toggle.addEventListener("click", () => {
    const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);

    try {
        localStorage.setItem(THEME_KEY, nextTheme);
    } catch {
        status.textContent = "Theme changed, but this browser could not save your preference.";
    }
});
