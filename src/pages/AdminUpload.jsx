import React from "react";

function AdminUpload() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center">Admin Upload Page</h1>
      <p className="text-center mt-4 text-gray-600">
        Only admins can upload new notes here.
      </p>
    </div>
  );
}

export default AdminUpload;
