// Pure functions for managing todos.
// This file must not access the DOM or localStorage.

export function addTodo(todos, text, id, createdAt) {
    const cleanText = text.trim();

    if (!cleanText || !Number.isInteger(id)) {
        return todos;
    }

    const newTodo = {
        id,
        text: cleanText,
        completed: false,
        createdAt,
    };

    return [...todos, newTodo];
}

export function toggleTodo(todos, id) {
    return todos.map((todo) => {
        if (todo.id !== id) {
            return todo;
        }

        return {
            ...todo,
            completed: !todo.completed,
        };
    });
}

export function deleteTodo(todos, id) {
    return todos.filter((todo) => todo.id !== id);
}

export function editTodo(todos, id, text) {
    const cleanText = text.trim();

    if (!cleanText) {
        return todos;
    }

    return todos.map((todo) => {
        if (todo.id !== id) {
            return todo;
        }

        return {
            ...todo,
            text: cleanText,
        };
    });
}

export function clearCompleted(todos) {
    return todos.filter((todo) => !todo.completed);
}

export function filterTodos(todos, filter) {
    if (filter === "active") {
        return todos.filter((todo) => !todo.completed);
    }

    if (filter === "completed") {
        return todos.filter((todo) => todo.completed);
    }

    return todos;
}

export function countRemaining(todos) {
    return todos.filter((todo) => !todo.completed).length;
}
