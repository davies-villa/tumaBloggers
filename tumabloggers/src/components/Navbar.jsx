import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav
      className="bg-white shadow-md fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] rounded-md p-2 z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
        <div className="flex items-center justify-between h-20 ">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <img src={logo} alt="Logo" className="h-14 w-auto" />
          </div>

          {/* Centered Navigation Links */}
          <div className="flex-grow hidden lg:flex justify-center space-x-8">
            <Link
              to="/"
              className="text-gray-800 hover:text-green-600 px-3 py-2 text-base font-medium"
            >
              Home
            </Link>
            <Link
              to="/blogs"
              className="text-gray-800 hover:text-green-600 px-3 py-2 text-base font-medium"
            >
              Blogs
            </Link>
            <Link
              to="/authors"
              className="text-gray-800 hover:text-green-600 px-3 py-2 text-base font-medium"
            >
              Authors
            </Link>
            <Link
              to="/about"
              className="text-gray-800 hover:text-green-600 px-3 py-2 text-base font-medium"
            >
              About Us
            </Link>
          </div>

          {/* Hamburger Menu Icon */}
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
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
                  d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md rounded-md px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            onClick={closeMenu}
            className="block text-gray-800 hover:text-green-600 px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            to="/blogs"
            onClick={closeMenu}
            className="block text-gray-800 hover:text-green-600 px-3 py-2 rounded-md text-base font-medium"
          >
            Blogs
          </Link>
          <Link
            to="/authors"
            onClick={closeMenu}
            className="block text-gray-800 hover:text-green-600 px-3 py-2 rounded-md text-base font-medium"
          >
            Authors
          </Link>
          <Link
            to="/about"
            onClick={closeMenu}
            className="block text-gray-800 hover:text-green-600 px-3 py-2 rounded-md text-base font-medium"
          >
            About Us
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
