function saveUserToStorage(user) {
    try {
        localStorage.setItem("current_user", JSON.stringify(user));
    } catch (error) {
        console.error("Failed to save user to localStorage:", error);
    }
}

function displayUserName(name) {
    const container = document.getElementById("box");
    if (!container) {return;}
    container.innerHTML = `<p>${name}</p>`;
}

export async function fetchAndRenderUser(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const userData = await response.json();
        displayUserName(userData.n);
        saveUserToStorage(userData);
    } catch (error) {
        console.error("Error loading user profile:", error);
        displayUserName("Unable to load user profile.");
    }
}
