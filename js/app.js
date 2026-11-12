import { countRemaining, filterTodos } from "./todo-logic.js";
import {
    addTodo, clearCompleted, deleteTodo, editTodo, getState, setFilter,
    subscribe, toggleTodo
} from "./state.js";

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedButton = document.getElementById("clear-completed");
let editingId = null;

function createTodoElement(todo) {
    const item = document.createElement("li");
    item.className = "todo-item";
    item.dataset.id = String(todo.id);
    if (todo.completed) item.classList.add("completed");

    if (editingId === todo.id) {
        const editInput = document.createElement("input");
        editInput.className = "edit";
        editInput.value = todo.text;
        editInput.setAttribute("aria-label", "Edit task");
        editInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                editTodo(todo.id, editInput.value);
                editingId = null;
                renderTodos();
            } else if (event.key === "Escape") {
                editingId = null;
                renderTodos();
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

function renderTodos() {
    const { todos, filter } = getState();
    filters.forEach((button) => {
        const isActive = button.dataset.filter === filter;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });

    const visibleTodos = filterTodos(todos, filter);
    todoList.replaceChildren(...visibleTodos.map(createTodoElement));
    const remaining = countRemaining(todos);
    itemsLeft.textContent = `${remaining} item${remaining === 1 ? "" : "s"} left`;
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
    if (!item) return;

    const id = Number(item.dataset.id);
    if (event.target.closest(".delete")) {
        deleteTodo(id);
    } else if (!event.target.closest(".edit")) {
        toggleTodo(id);
    }
});

todoList.addEventListener("dblclick", (event) => {
    const text = event.target.closest(".todo-text");
    if (!text) return;

    editingId = Number(text.closest(".todo-item").dataset.id);
    renderTodos();
});

filters.forEach((button) => {
    button.addEventListener("click", () => setFilter(button.dataset.filter));
});

clearCompletedButton.addEventListener("click", clearCompleted);

subscribe(renderTodos);
renderTodos();
