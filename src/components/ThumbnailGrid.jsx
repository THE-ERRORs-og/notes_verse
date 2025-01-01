import React, { useState } from "react";
import { useNotes } from "../context/NotesContext"; // Import the context
import Pagination from "../components/Pagination";

function ThumbnailGrid() {
  const { notes, loading, error } = useNotes(); // Fetch notes from the context
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Calculate total pages based on the number of notes
  const totalPages = Math.ceil(notes.length / itemsPerPage);

  // Determine the notes to display on the current page
  const currentNotes = notes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>Error: {error}</div>; // Show error state

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10">
        {currentNotes.map((note) => (
          <div
            key={note.id}
            className="bg-gray-800 rounded overflow-hidden shadow-lg hover:scale-105 transition-transform"
          >
            <img
              src={note.thumbnail || "path-to-default-thumbnail.jpg"} // Use default thumbnail if not available
              alt={note.name || "Note"}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold text-white">
                {note.name || "Unnamed Note"}
              </h2>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ThumbnailGrid;
