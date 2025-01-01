import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AdminUpload from "./pages/AdminUpload";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center bg-gray-600">
        <div className="w-4/5 max-w-screen-xl">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/upload" element={<AdminUpload />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
