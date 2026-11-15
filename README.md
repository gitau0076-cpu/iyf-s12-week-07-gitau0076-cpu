# Week 7:JavaScript Best Practices

## Project Description
This repository contains JavaScript practice projects focused on clean code, modular structure, state management, browser storage, debugging, and automated testing. It includes interactive browser apps and daily challenges built with HTML, CSS, and JavaScript modules.
```text
## Project Structure
iyf-s12-week-07-{gitau0076-cpu}/
├── index.html            ← the To-Do List, loads js/app.js as a module
├── styles.css
├── js/
│   ├── app.js            ← starts the app, wires events
│   ├── state.js          ← the state object and the actions that change it
│   ├── storage.js        ← localStorage load/save, safe against bad data
│   ├── todo-logic.js     ← PURE functions — no DOM, no localStorage
│   └── ui.js             ← everything that touches the DOM
├── tests/
│   └── todo-logic.test.js
├── cart/                 ← Lesson 13 class build
├── daily-challenges/
├── eslint.config.js
├── .prettierrc
├── package.json          ← committed
├── package-lock.json     ← committed
├── .gitignore            ← MUST list node_modules/
└── README.md
```text
## How to Run
1. node --version
2. npm.cmd install
3. npm.cmd run dev

## Features
- Manage tasks by adding, editing, completing, deleting, and filtering them.
- Save task data, filter preference, and light/dark theme in `localStorage`.
- Create and save notes in the browser.
- Use a shopping cart with quantity controls, totals, persistence, and undo.
- Save and restore recent searches in the Day 2 challenge.
- Auto-save and recover form drafts in the Day 3 challenge.
- Run automated tests for pure task-logic functions with Vitest.
- Check code quality and formatting with ESLint and Prettier.

## What I Learnt
- How to split a JavaScript app into ES modules with clear responsibilities.
- How centralized state and pure functions make changes easier to follow and test.
- How to save and restore data with `localStorage` and `sessionStorage`.
- How to write Vitest tests for logic without needing a browser.
- How to use ESLint, browser console tools, and DevTools breakpoints to find problems.
- How to keep names clear, avoid repeated code, and handle storage or form errors.
### Challenges Faced

- Understanding how browser modules are loaded and why the app should run through a local server.
- Finding the right place to set breakpoints and following an event from the UI into state logic.
- Making saved data recover safely when storage is empty, malformed, or unavailable.
- Checking that form drafts and search history persist across refreshes and clear at the correct time.
- Keeping page behavior and styling organized while working on several small exercises.
