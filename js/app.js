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
    applyTheme(getState().theme);
    renderTodos(getState(), editingId, handleEditCommit, cancelEdit);
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

todoList.addEventListener("click", (event) => {
    const item = event.target.closest(".todo-item");
    if (!item) {return;}

    const id = Number(item.dataset.id);
    if (event.target.closest(".delete")) {
        deleteTodo(id);
    } else if (!event.target.closest(".edit")) {
        toggleTodo(id);
    }
});

todoList.addEventListener("dblclick", (event) => {
    const text = event.target.closest(".todo-text");
    if (!text) {return;}

    editingId = Number(text.closest(".todo-item").dataset.id);
    renderApp();
});

filters.forEach((button) => {
    button.addEventListener("click", () => setFilter(button.dataset.filter));
});

clearCompletedButton.addEventListener("click", clearCompleted);

themeToggleButton.addEventListener("click", () => {
    setTheme(getState().theme === "dark" ? "light" : "dark");
});

subscribe(renderApp);
renderApp();
