import { useState } from "react";
import Authentication from "./Authentication";
import Modal from "./Modal";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated, logout, globalUser } = useAuth();
  
  function handleAuthenticate() {
    if (isAuthenticated) {
      logout();
    } else {
      setShowModal(true);
    }
  }
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white rounded-b-3xl">
      {showModal && (
        <Modal
          handleCloseModal={() => {
            setShowModal(false);
          }}
        >
          <Authentication handleCloseModal={() => setShowModal(false)} />
        </Modal>
      )}

      <h1 className="text-3xl font-semibold">Notes</h1>
      {globalUser ? (
        // Render this if globalUser is set (i.e., user is authenticated)
        <h2 className="text-xl">Welcome, {globalUser.username}!</h2>
      ) : (
        // Render a placeholder or something else if user is not authenticated
        <h2 className="text-xl">Welcome, Guest!</h2>
      )}
      <button
        onClick={() => handleAuthenticate()}
        className="px-4 py-2 text-xl bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 cursor-pointer"
      >
        {isAuthenticated ? "Logout" : "Login"}
      </button>
    </header>
  );
}
