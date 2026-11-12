// Pure todo functions: they receive data and return data without touching the DOM or storage.
export function addTodo(todos, text, id, createdAt) {
    const cleanText = text.trim();
    if (!cleanText || !Number.isInteger(id)) return todos;

    return [
        ...todos,
        { id, text: cleanText, completed: false, createdAt }
    ];
}

export function toggleTodo(todos, id) {
    return todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
}

export function deleteTodo(todos, id) {
    return todos.filter((todo) => todo.id !== id);
}

export function editTodo(todos, id, text) {
    const cleanText = text.trim();
    if (!cleanText) return todos;

    return todos.map((todo) =>
        todo.id === id ? { ...todo, text: cleanText } : todo
    );
}

export function clearCompleted(todos) {
    return todos.filter((todo) => !todo.completed);
}

export function filterTodos(todos, filter) {
    if (filter === "active") return todos.filter((todo) => !todo.completed);
    if (filter === "completed") return todos.filter((todo) => todo.completed);
    return todos;
}

export function countRemaining(todos) {
    return todos.filter((todo) => !todo.completed).length;
}
