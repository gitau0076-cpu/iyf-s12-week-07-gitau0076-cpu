// Small pure helpers shared by the app's modules.
export function formatDate(date) {
    return new Date(date).toLocaleDateString();
}

export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function debounce(callback, delayMs) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => callback.apply(this, args), delayMs);
    };
}
