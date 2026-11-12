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
const FIRST_TODO_ID = 0;
const TODO_ID_INCREMENT = 1;

function isTodo(todo) {
    return (
        todo &&
        Number.isInteger(todo.id) &&
        typeof todo.text === "string" &&
        typeof todo.completed === "boolean"
    );
}

function loadState() {
    const savedState = getFromStorage(STATE_STORAGE_KEY, null);
    let stateToRestore = savedState;

    if (!savedState || typeof savedState !== "object" || Array.isArray(savedState)) {
        stateToRestore = {
            todos: getFromStorage("todos", []),
            filter: getFromStorage("filter", "all"),
        };
    }

    const todos = Array.isArray(stateToRestore.todos) ? stateToRestore.todos.filter(isTodo) : [];

    return {
        todos,
        filter: VALID_FILTERS.includes(stateToRestore.filter) ? stateToRestore.filter : "all",
        theme: stateToRestore.theme === "dark" ? "dark" : "light",
    };
}

function createStore(initialState) {
    let state = initialState;
    const listeners = new Set();

    return {
        getState() {
            return state;
        },

        setState(updates) {
            state = { ...state, ...updates };
            saveToStorage(STATE_STORAGE_KEY, state);
            listeners.forEach((listener) => listener(state));
        },

        subscribe(listener) {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
    };
}

const store = createStore(loadState());

export const getState = store.getState;
export const subscribe = store.subscribe;

export function setFilter(filter) {
    if (VALID_FILTERS.includes(filter)) {store.setState({ filter });}
}

export function setTheme(theme) {
    if (theme === "light" || theme === "dark") {store.setState({ theme });}
}

export function addTodo(text) {
    const { todos } = store.getState();
    const nextTodoId =
        todos.reduce((highestId, todo) => Math.max(highestId, todo.id), FIRST_TODO_ID) +
        TODO_ID_INCREMENT;
    const nextTodos = addTodoLogic(todos, text, nextTodoId, new Date().toISOString());
    if (nextTodos !== todos) {store.setState({ todos: nextTodos });}
}

export function toggleTodo(id) {
    store.setState({ todos: toggleTodoLogic(store.getState().todos, id) });
}

export function deleteTodo(id) {
    store.setState({ todos: deleteTodoLogic(store.getState().todos, id) });
}

export function editTodo(id, text) {
    const todos = store.getState().todos;
    const nextTodos = editTodoLogic(todos, id, text);
    if (nextTodos !== todos) {store.setState({ todos: nextTodos });}
}

export function clearCompleted() {
    store.setState({ todos: clearCompletedLogic(store.getState().todos) });
}
