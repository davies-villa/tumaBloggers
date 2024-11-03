// src/components/MobileMenu.jsx
import { Link } from "react-router-dom";

function MobileMenu({ isOpen, closeMenu }) {
  return (
    <>
      {/* Overlay with Smooth Fade */}
      <div
        className={`fixed inset-0 bg-black z-10 transition-opacity duration-300 ease-in-out 
        ${isOpen ? "opacity-50" : "opacity-0 pointer-events-none"}`}
        onClick={closeMenu}
      />

      {/* Sliding Menu */}
      <div
        className={`fixed inset-y-0 right-0 w-64 shadow-xl transform transition-transform duration-300 ease-in-out z-20 
        ${isOpen ? "translate-x-0 bg-white" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-6">
          {/* Close Menu Button (x) */}
          <button
            onClick={closeMenu}
            className="text-gray-800 focus:outline-none hover:bg-gray-200 p-2 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col space-y-4 px-6">
          <Link
            to="/"
            onClick={closeMenu}
            className="hover:text-green-600 p-2 hover:bg-gray-200 rounded-md"
          >
            Home
          </Link>
          <Link
            to="/blogs"
            onClick={closeMenu}
            className="hover:text-green-600 p-2 hover:bg-gray-200 rounded-md"
          >
            Blogs
          </Link>
          <Link
            to="/authors"
            onClick={closeMenu}
            className="hover:text-green-600 p-2 hover:bg-gray-200 rounded-md"
          >
            Authors
          </Link>
          <Link
            to="/about"
            onClick={closeMenu}
            className="hover:text-green-600 p-2 hover:bg-gray-200 rounded-md"
          >
            About Us
          </Link>
        </nav>
      </div>
    </>
  );
}

export default MobileMenu;
