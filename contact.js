const form = document.getElementById("contact-form");
const inputs = form.querySelectorAll("input, textarea");
const status = document.getElementById("form-status");

function storageKey(input) {
    return `form_${input.name}`;
}

for (const input of inputs) {
    input.value = sessionStorage.getItem(storageKey(input)) ?? "";

    input.addEventListener("input", () => {
        sessionStorage.setItem(storageKey(input), input.value);
    });
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    // This lesson has no server, so a valid submission is simulated locally.
    for (const input of inputs) {
        sessionStorage.removeItem(storageKey(input));
    }

    form.reset();
    status.textContent = "Demo submitted. Your saved draft has been cleared.";
});
