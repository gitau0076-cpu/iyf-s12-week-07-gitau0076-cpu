import {
    addTodo,
    clearCompleted,
    deleteTodo,
    editTodo,
    getState,
    setFilter,
    setTheme,
    subscribe,
    toggleTodo,
} from "./state.js";

import {
    applyTheme,
    clearCompletedButton,
    filters,
    form,
    input,
    renderTodos,
    themeToggleButton,
    todoList,
} from "./ui.js";

let editingId = null;

function renderApp() {
    const state = getState();

    applyTheme(state.theme);

    renderTodos(
        state,
        editingId,
        handleEditCommit,
        cancelEdit
    );
}

function handleEditCommit(id, text) {
    editTodo(id, text);

    editingId = null;

    renderApp();
}

function cancelEdit() {
    editingId = null;

    renderApp();
}

// Add a new task.
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = input.value.trim();

    if (!text) {
        input.focus();
        return;
    }

    addTodo(text);

    form.reset();
    input.focus();
});

// Handle task completion and deletion.
todoList.addEventListener("click", (event) => {
    const item = event.target.closest(".todo-item");

    if (!item) {
        return;
    }

    const id = Number(item.dataset.id);

    if (event.target.closest(".delete")) {
        deleteTodo(id);
    } else if (!event.target.closest(".edit")) {
        toggleTodo(id);
    }
});

// Double-click a task to edit it.
todoList.addEventListener("dblclick", (event) => {
    const textButton = event.target.closest(".todo-text");

    if (!textButton) {
        return;
    }

    editingId = Number(
        textButton.closest(".todo-item").dataset.id
    );

    renderApp();
});

// Change the current filter.
filters.forEach((button) => {
    button.addEventListener("click", () => {
        setFilter(button.dataset.filter);
    });
});

// Remove all completed tasks.
clearCompletedButton.addEventListener("click", () => {
    clearCompleted();
});

// Switch between light and dark themes.
themeToggleButton.addEventListener("click", () => {
    const currentTheme = getState().theme;

    setTheme(currentTheme === "dark" ? "light" : "dark");
});

// Re-render whenever the application state changes.
subscribe(renderApp);

// Display the saved application state on page load.
renderApp();
