import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center mt-8 gap-4 items-center">
      
      {/* PREV */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-white/10 rounded-lg disabled:opacity-40"
      >
        Prev
      </button>

      {/* DROPDOWN */}
      <select
        value={currentPage}
        onChange={(e) => onPageChange(Number(e.target.value))}
        className="px-4 py-2 bg-cyan-500 border border-white/20 rounded-lg text-white"
      >
        {pages.map((page) => (
          <option key={page} value={page}>
            Page {page}
          </option>
        ))}
      </select>

      {/* NEXT */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-white/10 rounded-lg disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;