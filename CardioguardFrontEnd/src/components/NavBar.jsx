import { useState } from "react";

export default function NavBar() {
  // State
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Event handlers
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen); // Toggle menu open state
  };

  const handleMenuClose = () => {
    setMenuOpen(false); // Close menu
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown state
  };

  return (
    <div className="w-full bg-orange-700">
      <div className="flex items-center justify-between p-4">
        {/* Mobile Menu Icon */}
        <div className="sm:hidden">
          <button
            onClick={handleMenuToggle}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="sm:hidden absolute top-16 left-0 w-full bg-gray-900 z-50">
            <ul className="flex flex-col items-center">
              <li className="p-4">
                <a
                  href="/home"
                  className="text-white"
                  onClick={handleMenuClose}
                >
                  Home
                </a>
              </li>
              <li className="p-4">
                <a
                  href="/about"
                  className="text-white"
                  onClick={handleMenuClose}
                >
                  About
                </a>
              </li>
              <li className="p-4">
                <a
                  href="/contact"
                  className="text-white"
                  onClick={handleMenuClose}
                >
                  Contact Us
                </a>
              </li>
              <li className="p-4">
                <a
                  href="/services"
                  className="text-white"
                  onClick={handleMenuClose}
                >
                  Services
                </a>
              </li>
              <li className="p-4 relative">
                <button
                  onClick={handleDropdownToggle}
                  className="text-white focus:outline-none flex items-center"
                >
                  Users
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-50">
                    <ul className="py-2">
                      <li className="px-4 py-2">
                        <a
                          href="/admin"
                          className="text-white hover:bg-gray-700 block"
                          onClick={handleMenuClose}
                        >
                          Admin
                        </a>
                      </li>
                      <li className="px-4 py-2">
                        <a
                          href="/patient"
                          className="text-white hover:bg-gray-700 block"
                          onClick={handleMenuClose}
                        >
                          Patient
                        </a>
                      </li>
                      <li className="px-4 py-2">
                        <a
                          href="/doctor"
                          className="text-white hover:bg-gray-700 block"
                          onClick={handleMenuClose}
                        >
                          Doctor
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </div>
        )}

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center space-x-6">
          <a href="/" className="text-white hover:underline">
            Home
          </a>
          <a href="/about" className="text-white hover:underline">
            About
          </a>
          <a href="/contact" className="text-white hover:underline">
            Contact Us
          </a>
          <a href="/services" className="text-white hover:underline">
            Services
          </a>
          <div className="relative">
            <button
              onClick={handleDropdownToggle}
              className="text-white hover:underline focus:outline-none flex items-center"
            >
              Users
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-50">
                <ul className="py-2">
                  <li className="px-4 py-2">
                    <a href="/admin" className="text-white hover:bg-gray-700 block">
                      Admin
                    </a>
                  </li>
                  <li className="px-4 py-2">
                    <a href="/patient" className="text-white hover:bg-gray-700 block">
                      Patient
                    </a>
                  </li>
                  <li className="px-4 py-2">
                    <a href="/doctor" className="text-white hover:bg-gray-700 block">
                      Doctor
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Register and Login */}
        <div className="flex items-center space-x-4">
          <a href="/register-patient" className="text-white hover:underline">
            Register
          </a>
          <a href="/login" className="text-white hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
