import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage > totalPages - 3) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 bg-gray-800 py-4 rounded-lg">
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
          className={`px-4 py-2 rounded ${
            page === currentPage
              ? "bg-gray-900 text-white font-bold"
              : typeof page === "number"
              ? "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
              : "text-gray-500 cursor-default"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
