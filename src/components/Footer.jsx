import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-600 text-gray-400 py-6 text-center">
      <p>Copyright © 2025 - Notes_Verse. All Rights Reserved.</p>
      <div className="flex justify-center gap-4 mt-2">
        <a href="#" className="hover:underline">
          About Us
        </a>
        <a href="#" className="hover:underline">
          Contact Us
        </a>
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}

export default Footer;
