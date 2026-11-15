import { describe, expect, it } from "vitest";

import {
    addTodo,
    clearCompleted,
    countRemaining,
    deleteTodo,
    editTodo,
    filterTodos,
    toggleTodo,
} from "../js/todo-logic.js";

describe("addTodo", () => {
    it("adds a new incomplete todo", () => {
        const todos = [];

        const result = addTodo(
            todos,
            "Read a book",
            1,
            "2026-11-13"
        );

        expect(result).toEqual([
            {
                id: 1,
                text: "Read a book",
                completed: false,
                createdAt: "2026-11-13",
            },
        ]);
    });

    it("removes unnecessary spaces from task text", () => {
        const result = addTodo([], "  Study JavaScript  ", 1, "today");

        expect(result[0].text).toBe("Study JavaScript");
    });

    it("does not add a task with empty text", () => {
        const todos = [];

        expect(addTodo(todos, "   ", 1, "today")).toBe(todos);
    });

    it("does not add a task with an invalid ID", () => {
        const todos = [];

        expect(addTodo(todos, "Study", "invalid", "today")).toBe(todos);
    });

    it("does not modify the original array", () => {
        const originalTodos = [
            {
                id: 1,
                text: "Existing task",
                completed: false,
            },
        ];

        const result = addTodo(
            originalTodos,
            "New task",
            2,
            "today"
        );

        expect(result).not.toBe(originalTodos);

        expect(originalTodos).toEqual([
            {
                id: 1,
                text: "Existing task",
                completed: false,
            },
        ]);

        expect(result).toHaveLength(2);
    });
});

describe("toggleTodo", () => {
    it("toggles the completion status of a task", () => {
        const todos = [
            { id: 1, text: "Practice", completed: false },
        ];

        const result = toggleTodo(todos, 1);

        expect(result[0].completed).toBe(true);
        expect(todos[0].completed).toBe(false);
    });
});

describe("deleteTodo", () => {
    it("deletes the task with the matching ID", () => {
        const todos = [
            { id: 1, text: "Keep", completed: false },
            { id: 2, text: "Remove", completed: false },
        ];

        expect(deleteTodo(todos, 2)).toEqual([
            { id: 1, text: "Keep", completed: false },
        ]);
    });

    it("does not change the original array", () => {
        const todos = [
            { id: 1, text: "Keep", completed: false },
            { id: 2, text: "Remove", completed: false },
        ];

        const result = deleteTodo(todos, 2);

        expect(todos).toHaveLength(2);
        expect(result).toHaveLength(1);
    });
});

describe("editTodo", () => {
    it("updates the text of the matching task", () => {
        const todos = [
            { id: 1, text: "Old task", completed: false },
        ];

        expect(editTodo(todos, 1, "New task")).toEqual([
            { id: 1, text: "New task", completed: false },
        ]);
    });

    it("does not accept empty replacement text", () => {
        const todos = [
            { id: 1, text: "Existing task", completed: false },
        ];

        expect(editTodo(todos, 1, "   ")).toBe(todos);
    });
});

describe("filterTodos", () => {
    const todos = [
        { id: 1, text: "Active task", completed: false },
        { id: 2, text: "Finished task", completed: true },
    ];

    it("returns only active tasks", () => {
        expect(filterTodos(todos, "active")).toEqual([todos[0]]);
    });

    it("returns only completed tasks", () => {
        expect(filterTodos(todos, "completed")).toEqual([todos[1]]);
    });

    it("returns all tasks for the all filter", () => {
        expect(filterTodos(todos, "all")).toEqual(todos);
    });
});

describe("clearCompleted", () => {
    it("removes completed tasks and keeps active tasks", () => {
        const todos = [
            { id: 1, text: "Active", completed: false },
            { id: 2, text: "Done", completed: true },
        ];

        expect(clearCompleted(todos)).toEqual([
            { id: 1, text: "Active", completed: false },
        ]);
    });
});

describe("countRemaining", () => {
    it("returns zero for an empty task list", () => {
        expect(countRemaining([])).toBe(0);
    });

    it("counts only incomplete tasks", () => {
        const todos = [
            { id: 1, text: "Active", completed: false },
            { id: 2, text: "Done", completed: true },
            { id: 3, text: "Also active", completed: false },
        ];

        expect(countRemaining(todos)).toBe(2);
    });
});
