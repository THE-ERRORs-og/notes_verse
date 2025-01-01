import React, { useState } from "react";
import Pagination from "../components/Pagination";

function ThumbnailGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const notes = [
    { id: 1, title: "Math Notes", thumbnail: "path-to-thumbnail1.jpg" },
    { id: 2, title: "Physics Notes", thumbnail: "path-to-thumbnail2.jpg" },
    { id: 3, title: "Chemistry Notes", thumbnail: "path-to-thumbnail3.jpg" },
    { id: 4, title: "Programming Notes", thumbnail: "path-to-thumbnail4.jpg" },
    // Add more notes here
  ];

  const totalPages = Math.ceil(notes.length / itemsPerPage);

  const currentNotes = notes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10">
        {currentNotes.map((note) => (
          <div
            key={note.id}
            className="bg-gray-800 rounded overflow-hidden shadow-lg hover:scale-105 transition-transform"
          >
            <img
              src={note.thumbnail}
              alt={note.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold text-white">{note.title}</h2>
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
