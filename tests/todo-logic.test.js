import { describe, expect, it } from "vitest";
import {
    addTodo,
    countRemaining,
    deleteTodo,
    filterTodos,
    toggleTodo
} from "../js/todo-logic.js";

describe("addTodo", () => {
    it("adds a new incomplete todo", () => {
        const originalTodos = [];
        const nextTodos = addTodo(originalTodos, "  Read a book  ", 1, "2026-11-13");

        expect(nextTodos).toEqual([
            { id: 1, text: "Read a book", completed: false, createdAt: "2026-11-13" }
        ]);
    });

    it("does not add a todo when the text is empty", () => {
        const todos = [];

        expect(addTodo(todos, "   ", 1, "2026-11-13")).toBe(todos);
    });

    it("does not change the original array", () => {
        const originalTodos = [
            { id: 1, text: "Existing task", completed: false }
        ];

        const nextTodos = addTodo(originalTodos, "New task", 2, "2026-11-13");

        expect(nextTodos).not.toBe(originalTodos);
        expect(originalTodos).toEqual([
            { id: 1, text: "Existing task", completed: false }
        ]);
        expect(nextTodos).toHaveLength(2);
    });
});

describe("toggleTodo", () => {
    it("toggles the completed state of the matching todo", () => {
        const todos = [{ id: 1, text: "Practice", completed: false }];

        expect(toggleTodo(todos, 1)[0].completed).toBe(true);
        expect(todos[0].completed).toBe(false);
    });
});

describe("deleteTodo", () => {
    it("removes a todo with the matching ID", () => {
        const todos = [
            { id: 1, text: "Keep", completed: false },
            { id: 2, text: "Remove", completed: false }
        ];

        expect(deleteTodo(todos, 2)).toEqual([
            { id: 1, text: "Keep", completed: false }
        ]);
    });

    it("leaves the list unchanged when the ID does not exist", () => {
        const todos = [{ id: 1, text: "Keep", completed: false }];

        expect(deleteTodo(todos, 99)).toEqual(todos);
    });
});

describe("filterTodos", () => {
    it("returns only active or completed todos for the selected filter", () => {
        const todos = [
            { id: 1, text: "Active", completed: false },
            { id: 2, text: "Done", completed: true }
        ];

        expect(filterTodos(todos, "active")).toEqual([todos[0]]);
        expect(filterTodos(todos, "completed")).toEqual([todos[1]]);
    });
});

describe("countRemaining", () => {
    it("returns zero for an empty list", () => {
        expect(countRemaining([])).toBe(0);
    });

    it("counts only incomplete todos", () => {
        const todos = [
            { id: 1, text: "Active", completed: false },
            { id: 2, text: "Done", completed: true },
            { id: 3, text: "Also active", completed: false }
        ];

        expect(countRemaining(todos)).toBe(2);
    });
});
