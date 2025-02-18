import React from "react";
import Logo from '../assets/egrocery-logo.png'

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand */}
        <a href="/" >
          <img  className="h-10 w-10 mb-2" src={Logo} alt="" />
        </a>

        {/* Search */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 rounded-lg text-black focus:outline-none"
          />
          <button className="bg-blue-500 p-2 rounded-lg text-white">Search</button>
        </div>

        

        {/* Login and Cart */}
        <div className="flex items-center space-x-6">
          <a href="/login" className="hover:text-gray-200">Login</a>
          <a href="/cart" className="hover:text-gray-200">Cart</a>
        </div>

        {/* Mobile Hamburger Menu */}
        <button className="md:hidden text-white focus:outline-none">
          &#9776;
        </button>
      </div>
      {/* Navigation Links */}
      <div>
      <ul className="hidden md:flex space-x-6">
          <li>
            <a href="/home" className="hover:text-gray-200">Home</a>
          </li>
          <li>
            <a href="/about" className="hover:text-gray-200">About</a>
          </li>
          <li>
            <a href="/services" className="hover:text-gray-200">Services</a>
          </li>
          <li>
            <a href="/contact" className="hover:text-gray-200">Contact</a>
          </li>
        </ul>
      </div>
      
    </nav>
  );
};

export default Navbar;
