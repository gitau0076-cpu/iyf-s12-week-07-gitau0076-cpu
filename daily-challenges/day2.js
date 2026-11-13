const STORAGE_KEY = "daily-challenge-day2-search-history";
const MAX_RECENT_SEARCHES = 5;

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const searchHistoryList = document.querySelector("#search-history");
const searchStatus = document.querySelector("#search-status");

function loadRecentSearches() {
    try {
        const savedValue = localStorage.getItem(STORAGE_KEY);
        const savedSearches = savedValue ? JSON.parse(savedValue) : [];

        if (!Array.isArray(savedSearches)) {return [];}

        // Ignore bad entries and cap the loaded history at the supported limit.
        return savedSearches
            .filter((search) => typeof search === "string" && search.trim())
            .slice(0, MAX_RECENT_SEARCHES);
    } catch (error) {
        console.warn("Could not load recent searches; starting with an empty history.", error);
        return [];
    }
}

let recentSearches = loadRecentSearches();

function saveRecentSearches() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(recentSearches));
        return true;
    } catch (error) {
        console.warn("Could not save recent searches.", error);
        return false;
    }
}

function updateRecentSearches(searchTerm) {
    const matchingTerm = searchTerm.toLowerCase();
    recentSearches = [
        searchTerm,
        ...recentSearches.filter((search) => search.toLowerCase() !== matchingTerm),
    ].slice(0, MAX_RECENT_SEARCHES);
}

function setHistoryVisibility(isVisible) {
    const shouldShowHistory = isVisible && recentSearches.length > 0;
    searchHistoryList.hidden = !shouldShowHistory;
    searchInput.setAttribute("aria-expanded", String(shouldShowHistory));
}

function createHistoryButton(searchTerm) {
    const listItem = document.createElement("li");
    const historyButton = document.createElement("button");
    historyButton.type = "button";
    historyButton.setAttribute("role", "option");
    historyButton.textContent = searchTerm;
    historyButton.addEventListener("click", () => runSearch(searchTerm));
    listItem.appendChild(historyButton);
    return listItem;
}

function renderSearchHistory() {
    const historyItems = recentSearches.map(createHistoryButton);
    searchHistoryList.replaceChildren(...historyItems);

    const inputHasFocus = document.activeElement === searchInput;
    setHistoryVisibility(inputHasFocus);
}

function runSearch(searchTerm) {
    const normalizedTerm = searchTerm.trim();
    if (!normalizedTerm) {return;}

    updateRecentSearches(normalizedTerm);
    const historySaved = saveRecentSearches();

    searchInput.value = "";
    searchInput.focus();
    searchStatus.textContent = historySaved
        ? `You searched for “${normalizedTerm}”.`
        : `You searched for “${normalizedTerm}”, but this browser could not save the history.`;
    renderSearchHistory();
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    runSearch(searchInput.value);
});

searchInput.addEventListener("focus", renderSearchHistory);
searchInput.addEventListener("input", renderSearchHistory);
searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {setHistoryVisibility(false);}
});

document.addEventListener("click", (event) => {
    if (!searchForm.contains(event.target)) {setHistoryVisibility(false);}
});

renderSearchHistory();
