import { useEffect, useState } from "react";
import { useNotes } from "../context/NotesContext";

export default function AddNote({handleCloseModal, note=null}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const {addNote, editNote, removeNote} = useNotes()

  const handleSaveNote = () => {
    if (!title || !description) {
      setError("Both title and description are required.");
      return;
    }
    
    if (note) {
      // If editing an existing note, update the note
      editNote(note.id, title, description);
    } else {
      // If it's a new note, add it
      addNote(title, description);
    }
    handleCloseModal();
  };

  const handleDeleteNote = () => {
    if(!note){return}
    removeNote(note.id)
    handleCloseModal()
  }

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setDescription(note.content);
    }
  }, [note]);

  return (
    <>
      <h2 className="text-2xl font-semibold">{note ? "Edit Note" : "Add New Note"}</h2>
      {error && <p className="text-red-500">{error}</p>}

      <input
        className="px-3 py-1 text-lg bg-gray-100 rounded-xl mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />

      <textarea
        className="px-3 py-1 text-lg bg-gray-100 rounded-xl mb-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        rows="10"
      />

      <button
        className="bg-blue-600 py-2 text-xl font-semibold rounded-2xl text-white cursor-pointer hover:bg-blue-800 duration-200 w-full"
        onClick={handleSaveNote}
      >
        {note ? "Update Note" : "Save Note"}
      </button>
      {note && <button
        className="bg-red-500 py-2 text-xl font-semibold rounded-2xl text-white cursor-pointer hover:bg-red-800 duration-200 w-full"
        onClick={handleDeleteNote}
      >
        Delete
      </button>}
    </>
  );
}
