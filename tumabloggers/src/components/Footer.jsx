import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-500 text-white p-8 text-center space-y-6">
      {/* Socials Section */}
      <h3 className="text-xl font-semibold">Follow us on our socials</h3>
      
      <div className="flex justify-center space-x-6">
        <a 
          href="https://facebook.com" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FaFacebook className="w-6 h-6 hover:text-green-500 transition-colors" />
        </a>
        <a 
          href="https://twitter.com" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <FaTwitter className="w-6 h-6 hover:text-green-500 transition-colors" />
        </a>
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram className="w-6 h-6 hover:text-green-500 transition-colors" />
        </a>
      </div>

      {/* Copyright Section */}
      <p className="text-sm text-white">
        © {currentYear} Tuma. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
