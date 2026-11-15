// Safely save, retrieve, and remove data from localStorage.

export function saveToStorage(key, data) {
    try {
        const serializedData = JSON.stringify(data);
        globalThis.localStorage.setItem(key, serializedData);
        return true;
    } catch {
        // Storage may be unavailable or full.
        return false;
    }
}

export function getFromStorage(key, defaultValue = null) {
    try {
        const data = globalThis.localStorage.getItem(key);

        if (data === null) {
            return defaultValue;
        }

        return JSON.parse(data);
    } catch {
        // Handles unavailable storage and invalid JSON.
        return defaultValue;
    }
}

export function removeFromStorage(key) {
    try {
        globalThis.localStorage.removeItem(key);
        return true;
    } catch {
        return false;
    }
}
