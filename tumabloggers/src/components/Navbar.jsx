// src/components/Navbar.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import MobileMenu from "./MobileMenu";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isHomePage = location.pathname === "/";

  return (
    <>
      <nav className="bg-white shadow-xl fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] rounded-md p-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo or Back Button */}
            <div className="flex-shrink-0">
              {isHomePage ? (
                <img src={logo} alt="Logo" className="h-14 w-auto" />
              ) : (
                <Link to="/" className="text-gray-800">
                  <button
                    className="hover:bg-gray-200 p-2 rounded-full transition duration-300 ease-in-out "
                    aria-label="Back"
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
                        d="M15.75 19.5 8.25 12l7.5-7.5"
                      />
                    </svg>
                  </button>
                </Link>
              )}
            </div>

            {/* Centered Navigation Links */}
            <div className="hidden lg:flex flex-grow justify-center items-center space-x-8">
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

            {/* Hamburger Menu Icon - Visible on all screens */}
            <div className="flex items-center">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-full text-gray-800  hover:bg-gray-200 "
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
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} closeMenu={closeMenu} />
    </>
  );
}

export default Navbar;
