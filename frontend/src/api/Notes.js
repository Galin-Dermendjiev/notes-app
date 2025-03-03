// notes.js - API functions for interacting with Notes
const NOTES_URL = import.meta.env.VITE_API_URL + '/notes'

// Create a new note
export async function createNote(title, description) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User not authenticated");
  }
  
  const response = await fetch(NOTES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content: description }),
  });

  if (!response.ok) {
    throw new Error("Failed to create note");
  }

  const data = await response.json();
  return data;
}

// Get all notes
export async function getNotes() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User not authenticated");
  }

  const response = await fetch(NOTES_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }

  const data = await response.json();
  return data;
}

// Update an existing note
export async function updateNote(noteId, title, description) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User not authenticated");
  }
  console.log("Updating note:", noteId, title, description);

  const response = await fetch(NOTES_URL + `/${noteId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content: description }),
  });

  if (!response.ok) {
    throw new Error("Failed to update note");
  }

  const data = await response.json();
  return data;
}

// Delete a note
export async function deleteNote(noteId) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User not authenticated");
  }

  const response = await fetch(NOTES_URL + `/${noteId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete note");
  }

  const data = await response.json();
  return data;
}
