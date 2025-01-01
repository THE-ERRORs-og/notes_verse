import React from "react";

function CategoryBar() {
  const categories = [
    "Latest Notes",
    "Math",
    "Physics",
    "Chemistry",
    "Biology",
    "Programming",
    "Engineering",
  ];
  return (
    <div className="bg-gray-900 text-white py-3">
      <div className="container mx-auto flex gap-4 overflow-x-auto scrollbar-hide">
        {categories.map((category, index) => (
          <button
            key={index}
            className="px-4 py-2 bg-gray-800 rounded hover:bg-blue-500 whitespace-nowrap"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryBar;
