import React from "react";

function Header() {
  return (
    <header className="bg-gray-800 text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Notes_Verse</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-64 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="p-2 bg-blue-500 rounded text-white hover:bg-blue-600">
            Search
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
