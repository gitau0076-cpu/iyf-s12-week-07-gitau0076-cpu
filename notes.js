import { getFromStorage, saveToStorage } from "./js/storage.js";

const STORAGE_KEY = "little-notes";
const form = document.getElementById("note-form");
const titleInput = document.getElementById("note-title");
const contentInput = document.getElementById("note-content");
const notesList = document.getElementById("notes-list");
const noteCount = document.getElementById("note-count");

function isNote(value) {
    return (
        value &&
        typeof value.id === "string" &&
        typeof value.title === "string" &&
        typeof value.content === "string" &&
        typeof value.createdAt === "string"
    );
}

const savedNotes = getFromStorage(STORAGE_KEY, []);
let notes = Array.isArray(savedNotes) ? savedNotes.filter(isNote) : [];

function saveNotes() {
    saveToStorage(STORAGE_KEY, notes);
}

function createNoteCard(note) {
    const card = document.createElement("article");
    card.className = "note-card";

    const title = document.createElement("h3");
    title.textContent = note.title || "Untitled note";

    const content = document.createElement("p");
    content.className = "note-body";
    content.textContent = note.content;

    const meta = document.createElement("div");
    meta.className = "note-meta";

    const date = document.createElement("time");
    const createdAt = new Date(note.createdAt);
    date.dateTime = Number.isNaN(createdAt.getTime()) ? "" : createdAt.toISOString();
    date.textContent = Number.isNaN(createdAt.getTime())
        ? "Saved note"
        : createdAt.toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
          });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.dataset.deleteId = note.id;
    deleteButton.setAttribute("aria-label", `Delete ${note.title || "untitled note"}`);
    deleteButton.textContent = "Delete";

    meta.append(date, deleteButton);
    card.append(title, content, meta);
    return card;
}

function renderNotes() {
    noteCount.textContent = `${notes.length} ${notes.length === 1 ? "note" : "notes"}`;

    if (notes.length === 0) {
        const empty = document.createElement("div");
        empty.className = "empty-state";
        const heading = document.createElement("strong");
        heading.textContent = "No notes yet";
        const message = document.createElement("span");
        message.textContent = "Write your first note above and it will be waiting here.";
        empty.append(heading, message);
        notesList.replaceChildren(empty);
        return;
    }

    notesList.replaceChildren(...notes.map(createNoteCard));
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const content = contentInput.value.trim();
    if (!content) {
        contentInput.focus();
        return;
    }

    notes = [
        {
            id:
                globalThis.crypto?.randomUUID?.() ??
                `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            title: titleInput.value.trim(),
            content,
            createdAt: new Date().toISOString(),
        },
        ...notes,
    ];
    saveNotes();
    renderNotes();
    form.reset();
    contentInput.focus();
});

notesList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete-id]");
    if (!button) {return;}
    notes = notes.filter((note) => note.id !== button.dataset.deleteId);
    saveNotes();
    renderNotes();
});

renderNotes();
