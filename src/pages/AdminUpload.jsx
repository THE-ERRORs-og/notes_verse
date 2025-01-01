import React, { useState } from "react";
import { supabase, supabaseUrl as SUPABASE_URL } from "../config/supabase";
import { db } from "../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function AdminUpload() {
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [secThumbnails, setSecThumbnails] = useState([]);
  const [noteDetails, setNoteDetails] = useState({
    name: "",
    tags: "",
    sec_thumbnail: "",
    subject: "",
    teachers: "",
  });
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSecThumbnailsChange = (e) => {
    setSecThumbnails([...e.target.files]);
  };

  const handleChange = (e) => {
    setNoteDetails({ ...noteDetails, [e.target.name]: e.target.value });
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setUploading(true);

    try {
      // Upload file to Supabase
      const filePath = `notes/${Date.now()}_${file.name}`;
      
      console.log("uploading : ",filePath);

      const { data: fileData, error: fileError } = await supabase.storage
        .from("notesverse") // Replace with your Supabase storage bucket name
        .upload(filePath, file);

      if (fileError) {
        console.error("Supabase upload error:", fileError.message);
        alert("File upload failed!");
        return;
      }

      const fileURL = `${SUPABASE_URL}/storage/v1/object/public/${fileData.fullPath}`;

      // Upload thumbnail to Supabase
      let thumbnailURL = "";
      if (thumbnail) {
        const thumbnailPath = `thumbnails/${Date.now()}_${thumbnail.name}`;
        const { data: thumbData, error: thumbError } = await supabase.storage
          .from("notesverse")
          .upload(thumbnailPath, thumbnail);

        if (thumbError) {
          console.error("Supabase thumbnail upload error:", thumbError.message);
          alert("Thumbnail upload failed!");
          return;
        }

        thumbnailURL = `${SUPABASE_URL}/storage/v1/object/public/${thumbData.fullPath}`;
      }

      // Upload secondary thumbnails to Supabase
      let secThumbnailURLs = [];
      for (let i = 0; i < secThumbnails.length; i++) {
        const secThumbnailPath = `thumbnails/${Date.now()}_${
          secThumbnails[i].name
        }`;
        const { data: secThumbData, error: secThumbError } =
          await supabase.storage
            .from("notesverse")
            .upload(secThumbnailPath, secThumbnails[i]);

        if (secThumbError) {
          console.error(
            "Supabase secondary thumbnail upload error:",
            secThumbError.message
          );
          alert("Secondary thumbnail upload failed!");
          return;
        }

        secThumbnailURLs.push(
          `${SUPABASE_URL}/storage/v1/object/public/${secThumbData.fullPath}`
        );
      }

      // Process tags and teachers
      const tagsArray = noteDetails.tags.split(",").map((tag) => tag.trim());
      const teachersArray = noteDetails.teachers
        .split(",")
        .map((teacher) => teacher.trim());

      // Save metadata to Firestore
      await addDoc(collection(db, "notes"), {
        name: noteDetails.name,
        tags: tagsArray,
        thumbnail: thumbnailURL,
        sec_thumbnail: secThumbnailURLs,
        subject: noteDetails.subject,
        teachers: teachersArray,
        file_url: fileURL,
        uploadTime: serverTimestamp(),
      });

      alert("File uploaded successfully!");
      setFile(null);
      setThumbnail(null);
      setSecThumbnails([]);
      setNoteDetails({
        name: "",
        tags: "",
        sec_thumbnail: "",
        subject: "",
        teachers: "",
      });
    } catch (err) {
      console.error("Error uploading file:", err.message);
      alert("An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload Notes</h2>
      <div className="mb-4">
        <label className="block mb-2">Note Name:</label>
        <input
          type="text"
          name="name"
          value={noteDetails.name}
          onChange={handleChange}
          className="w-full p-2 bg-gray-700 text-white rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Tags (comma-separated):</label>
        <input
          type="text"
          name="tags"
          value={noteDetails.tags}
          onChange={handleChange}
          className="w-full p-2 bg-gray-700 text-white rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Thumbnail (optional):</label>
        <input
          type="file"
          onChange={handleThumbnailChange}
          className="w-full text-gray-400"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">
          Secondary Thumbnails (optional, multiple files):
        </label>
        <input
          type="file"
          multiple
          onChange={handleSecThumbnailsChange}
          className="w-full text-gray-400"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Subject:</label>
        <input
          type="text"
          name="subject"
          value={noteDetails.subject}
          onChange={handleChange}
          className="w-full p-2 bg-gray-700 text-white rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Teachers (comma-separated):</label>
        <input
          type="text"
          name="teachers"
          value={noteDetails.teachers}
          onChange={handleChange}
          className="w-full p-2 bg-gray-700 text-white rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Select File:</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full text-gray-400"
        />
      </div>
      <button
        onClick={handleUpload}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}

export default AdminUpload;
