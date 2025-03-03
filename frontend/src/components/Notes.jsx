import { use, useState } from "react";
import Note from "./Note";
import Modal from "./Modal";
import Authentication from "./Authentication";
import Masonry from "react-masonry-css";
import AddNote from "./AddNote";
import { useAuth } from "../context/AuthContext";
import { useNotes } from "../context/NotesContext";

export default function Notes({ search }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  
  const {isAuthenticated} = useAuth()
  const {notes} = useNotes()

  const dummyNote = {
    title: "Start writing your notes now!",
    description: "It is easy and fast.",
    date: "25/01/2025",
  };
  

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(search.toLowerCase());
  });
  // Sorting notes by date (newest first)
  const sortedNotes = filteredNotes.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  // Masonry breakpoint columns configuration
  const breakpointColumnsObj = {
    default: 5,
    1400: 4,
    1100: 3,
    700: 2,
    300: 1,
  };

  function handleCloseModal() {
    setShowModal(false);
    setSelectedNote(null);
  }

  function handleOpenModal(note = null) {
    setSelectedNote(note); // Pass note to edit or null for creating a new one
    setShowModal(true);
  }

  return (
    <div className="relative p-4 min-h-screen">
    {(!notes.length && isAuthenticated) && <div className="flex items-center justify-center h-screen text-2xl text-gray-400">
        <p>No notes yet! Click the + button to create one</p>
    </div>}
      {showModal && (
        <Modal handleCloseModal={handleCloseModal}>
          {isAuthenticated ? (
            <AddNote handleCloseModal={handleCloseModal} note={selectedNote} />
          ) : (
            <Authentication handleCloseModal={handleCloseModal} />
          )}
        </Modal>
      )}
      {isAuthenticated ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {sortedNotes.map((note, noteIndex) => {
            return (
              <div
                key={noteIndex}
                className="mb-4 rounded-2xl cursor-pointer"
                onClick={() => handleOpenModal(note)}
              >
                <Note note={note} />
              </div>
            );
          })}
        </Masonry>
      ) : (
        <div
          className="mb-4 rounded-2xl cursor-pointer"
          onClick={() => handleOpenModal(dummyNote)}
        >
          <Note note={dummyNote} />
        </div>
      )}

      <button
        onClick={() => handleOpenModal()}
        className="fixed bottom-5 right-5 md:bottom-10 md:right-10 p-4 md:p-5 rounded-full w-[4rem] md:w-[5.5rem] bg-blue-600 text-white text-3xl md:text-5xl shadow-lg cursor-pointer hover:bg-blue-700 active:bg-blue-800 transition-all duration-300"
      >
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}
