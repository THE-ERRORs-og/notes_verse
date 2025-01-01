import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, onSnapshot } from "firebase/firestore";

const NotesContext = createContext();

// Context Provider Component
export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "notes"),
      (snapshot) => {
        const notesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes(notesData);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching notes:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  return (
    <NotesContext.Provider value={{ notes, loading, error }}>
      {children}
    </NotesContext.Provider>
  );
};

// Custom Hook to use the Notes Context
export const useNotes = () => {
  return useContext(NotesContext);
};
