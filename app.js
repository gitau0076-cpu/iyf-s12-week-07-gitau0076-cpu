const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedButton = document.getElementById("clear-completed");

let todos = [];
let currentFilter = "all";
let nextId = 1;
let editingId = null;

function createTodoElement(todo) {
    const item = document.createElement("li");
    item.className = "todo-item";
    item.dataset.id = String(todo.id);

    if (todo.completed) {
        item.classList.add("completed");
    }

    if (editingId === todo.id) {
        const editInput = document.createElement("input");
        editInput.className = "edit";
        editInput.value = todo.text;
        editInput.setAttribute("aria-label", "Edit task");

        editInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                saveEdit(todo.id, editInput.value);
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
    const visibleTodos = todos.filter((todo) => {
        if (currentFilter === "active") return !todo.completed;
        if (currentFilter === "completed") return todo.completed;
        return true;
    });

    todoList.replaceChildren(...visibleTodos.map(createTodoElement));
    updateStats();
}

function addTodo(text) {
    todos.push({
        id: nextId++,
        text,
        completed: false
    });

    renderTodos();
}

function toggleTodo(id) {
    todos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    renderTodos();
}

function updateStats() {
    const remaining = todos.filter((todo) => !todo.completed).length;
    itemsLeft.textContent = `${remaining} item${remaining === 1 ? "" : "s"} left`;
}

function filterTodos(filter) {
    currentFilter = filter;

    filters.forEach((button) => {
        const isActive = button.dataset.filter === filter;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });

    renderTodos();
}

function saveEdit(id, value) {
    const text = value.trim();

    if (text) {
        todos = todos.map((todo) =>
            todo.id === id ? { ...todo, text } : todo
        );
    }

    editingId = null;
    renderTodos();
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

// One delegated click listener handles task completion and deletion.
todoList.addEventListener("click", (event) => {
    const item = event.target.closest(".todo-item");
    if (!item) return;

    const id = Number(item.dataset.id);

    if (event.target.closest(".delete")) {
        deleteTodo(id);
        return;
    }

    if (!event.target.closest(".edit")) {
        toggleTodo(id);
    }
});

// Double-click a task's text to edit it.
todoList.addEventListener("dblclick", (event) => {
    const text = event.target.closest(".todo-text");
    if (!text) return;

    const item = text.closest(".todo-item");
    editingId = Number(item.dataset.id);
    renderTodos();
});

filters.forEach((button) => {
    button.addEventListener("click", () => {
        filterTodos(button.dataset.filter);
    });
});

clearCompletedButton.addEventListener("click", () => {
    todos = todos.filter((todo) => !todo.completed);
    renderTodos();
});

renderTodos();
