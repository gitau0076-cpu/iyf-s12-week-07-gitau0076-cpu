const STORAGE_KEY = "daily-challenge-day3-contact-draft";
const AUTOSAVE_INTERVAL_MS = 5_000;

const contactForm = document.querySelector("#contact-form");
const saveStatus = document.querySelector("#save-status");
const formFields = [...contactForm.querySelectorAll("[name]")];

function loadDraft() {
    try {
        const savedDraft = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
        if (!savedDraft || typeof savedDraft !== "object" || Array.isArray(savedDraft)) {
            return null;
        }
        return savedDraft;
    } catch {
        return null;
    }
}

function restoreDraft() {
    const savedDraft = loadDraft();
    if (!savedDraft) return;

    formFields.forEach((field) => {
        if (typeof savedDraft[field.name] === "string") {
            field.value = savedDraft[field.name];
        }
    });
    saveStatus.textContent = "Your saved draft was restored.";
}

function saveDraft() {
    const draft = Object.fromEntries(formFields.map((field) => [field.name, field.value]));

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
        saveStatus.textContent = `Draft saved at ${new Date().toLocaleTimeString()}.`;
    } catch (error) {
        console.warn("Could not save the form draft.", error);
        saveStatus.textContent = "Could not save your draft in this browser.";
    }
}

restoreDraft();
const autosaveTimer = window.setInterval(saveDraft, AUTOSAVE_INTERVAL_MS);

formFields.forEach((field) => {
    field.addEventListener("input", saveDraft);
    field.addEventListener("change", saveDraft);
});

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    window.clearInterval(autosaveTimer);

    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.warn("Could not clear the saved form draft.", error);
    }

    contactForm.reset();
    saveStatus.textContent = "Submitted! Your saved draft was cleared.";
});
