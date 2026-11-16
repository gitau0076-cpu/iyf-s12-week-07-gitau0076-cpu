import { countRemaining, filterTodos } from "./todo-logic.js";

export const form = document.getElementById("todo-form");
export const input = document.getElementById("todo-input");
export const todoList = document.getElementById("todo-list");
export const itemsLeft = document.getElementById("items-left");
export const filters = document.querySelectorAll(".filter");
export const clearCompletedButton = document.getElementById("clear-completed");
export const themeToggleButton = document.getElementById("theme-toggle");

export function applyTheme(theme) {
    const isDark = theme === "dark";
    document.body.dataset.theme = isDark ? "dark" : "light";
    themeToggleButton.textContent = isDark ? "Light mode" : "Dark mode";
    themeToggleButton.setAttribute(
        "aria-label",
        `Switch to ${isDark ? "light" : "dark"} mode`
    );
}

export function createTodoElement(todo, editingId, onEditCommit, onEditCancel) {
    const item = document.createElement("li");
    item.className = "todo-item";
    item.dataset.id = String(todo.id);
    if (todo.completed) {item.classList.add("completed");}

    if (editingId === todo.id) {
        const editInput = document.createElement("input");
        editInput.className = "edit";
        editInput.value = todo.text;
        editInput.setAttribute("aria-label", "Edit task");
        editInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                onEditCommit(todo.id, editInput.value);
            } else if (event.key === "Escape") {
                onEditCancel();
            }
        });
        requestAnimationFrame(() => {
            editInput.focus();
            editInput.select();
        });
        item.appendChild(editInput);
    } else {
        const text = document.createElement("button");
        text.type = "button";
        text.className = "todo-text";
        text.textContent = todo.text;
        text.setAttribute("aria-label", `${todo.completed ? "Mark" : "Complete"} ${todo.text}`);
        item.appendChild(text);
    }

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete ${todo.text}`);
    item.appendChild(deleteButton);
    return item;
}

export function renderTodos(state, editingId, onEditCommit, onEditCancel) {
    const { todos, filter } = state;
    filters.forEach((button) => {
        const isActive = button.dataset.filter === filter;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });

    const visibleTodos = filterTodos(todos, filter);
    todoList.replaceChildren(
        ...visibleTodos.map((todo) =>
            createTodoElement(todo, editingId, onEditCommit, onEditCancel)
        )
    );
    const remaining = countRemaining(todos);
    itemsLeft.textContent = `${remaining} item${remaining === 1 ? "" : "s"} left`;
}
