import React, { createContext, useContext, useState, useEffect } from "react";
import { createNote, getNotes, updateNote, deleteNote } from "../api/Notes"; // Import API functions
import { useAuth } from "./AuthContext";

const NotesContext = createContext();

export function useNotes() {
  return useContext(NotesContext);
}

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const {isAuthenticated} = useAuth()

  // Fetch all notes
  useEffect(() => {
    if(!isAuthenticated) {return} 
    
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const notesData = await getNotes();
        setNotes(notesData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [isAuthenticated]);

  // Create a new note
  const addNote = async (title, description) => {
    setIsLoading(true);
    
    try {
      const newNote = await createNote(title, description);
      setNotes((prevNotes) => [...prevNotes, newNote]); // Add the new note to the state
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing note
  const editNote = async (noteId, title, description) => {
    setIsLoading(true);
    try {
      const updatedNote = await updateNote(noteId, title, description);
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === noteId ? updatedNote : note))
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a note
  const removeNote = async (noteId) => {
    setIsLoading(true);
    try {
      await deleteNote(noteId);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId)); // Remove the deleted note from state
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    notes,
    isLoading,
    error,
    addNote,
    editNote,
    removeNote,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}
