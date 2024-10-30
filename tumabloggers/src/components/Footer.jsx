import React from "react"; 

const Footer = () => {
  const currentYear = new Date().getFullYear(); 

  return (
    <footer className="text-gray-400 p-8 text-center space-y-4">
      {/* Privacy Terms & Conditions */}
      <p className="text-sm">Privacy Terms & Conditions</p>

      {/* Copyright Section */}
      <p className="text-sm">
        © {currentYear} Tuma. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
