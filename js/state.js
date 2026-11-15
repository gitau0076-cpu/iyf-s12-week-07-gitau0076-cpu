import { getFromStorage, saveToStorage } from "./storage.js";

import {
    addTodo as addTodoLogic,
    clearCompleted as clearCompletedLogic,
    deleteTodo as deleteTodoLogic,
    editTodo as editTodoLogic,
    toggleTodo as toggleTodoLogic,
} from "./todo-logic.js";

const STATE_STORAGE_KEY = "appState";
const VALID_FILTERS = ["all", "active", "completed"];

function isTodo(todo) {
    return (
        todo &&
        typeof todo === "object" &&
        Number.isInteger(todo.id) &&
        typeof todo.text === "string" &&
        typeof todo.completed === "boolean"
    );
}

// Return copies so callers cannot directly modify the stored state.
function copyState(state) {
    return {
        ...state,
        todos: state.todos.map((todo) => ({ ...todo })),
    };
}

function loadState() {
    const savedState = getFromStorage(STATE_STORAGE_KEY, null);

    let stateToRestore = savedState;

    // Support older saved data that used separate keys.
    if (
        !savedState ||
        typeof savedState !== "object" ||
        Array.isArray(savedState)
    ) {
        stateToRestore = {
            todos: getFromStorage("todos", []),
            filter: getFromStorage("filter", "all"),
            theme: "light",
        };
    }

    const todos = Array.isArray(stateToRestore.todos)
        ? stateToRestore.todos.filter(isTodo)
        : [];

    const filter = VALID_FILTERS.includes(stateToRestore.filter)
        ? stateToRestore.filter
        : "all";

    const theme = stateToRestore.theme === "dark" ? "dark" : "light";

    return {
        todos,
        filter,
        theme,
    };
}

function createStore(initialState) {
    let state = initialState;
    const listeners = new Set();

    return {
        getState() {
            return copyState(state);
        },

        setState(updates) {
            state = {
                ...state,
                ...updates,
            };

            saveToStorage(STATE_STORAGE_KEY, state);

            const stateSnapshot = copyState(state);

            listeners.forEach((listener) => {
                listener(stateSnapshot);
            });
        },

        subscribe(listener) {
            listeners.add(listener);

            return () => {
                listeners.delete(listener);
            };
        },
    };
}

const store = createStore(loadState());

export const getState = store.getState;
export const subscribe = store.subscribe;

export function setFilter(filter) {
    if (VALID_FILTERS.includes(filter)) {
        store.setState({ filter });
    }
}

export function setTheme(theme) {
    if (theme === "light" || theme === "dark") {
        store.setState({ theme });
    }
}

export function addTodo(text) {
    const { todos } = store.getState();

    const highestId = todos.reduce(
        (highest, todo) => Math.max(highest, todo.id),
        0
    );

    const nextId = highestId + 1;

    const nextTodos = addTodoLogic(
        todos,
        text,
        nextId,
        new Date().toISOString()
    );

    if (nextTodos !== todos) {
        store.setState({ todos: nextTodos });
    }
}

export function toggleTodo(id) {
    const { todos } = store.getState();

    store.setState({
        todos: toggleTodoLogic(todos, id),
    });
}

export function deleteTodo(id) {
    const { todos } = store.getState();

    store.setState({
        todos: deleteTodoLogic(todos, id),
    });
}

export function editTodo(id, text) {
    const { todos } = store.getState();
    const nextTodos = editTodoLogic(todos, id, text);

    if (nextTodos !== todos) {
        store.setState({ todos: nextTodos });
    }
}

export function clearCompleted() {
    const { todos } = store.getState();

    store.setState({
        todos: clearCompletedLogic(todos),
    });
}
