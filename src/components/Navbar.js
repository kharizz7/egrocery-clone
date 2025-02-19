import React, { useState } from "react";
import { Link } from "react-router-dom"; // ✅ Use Link for navigation
import Logo from "../assets/egrocery-logo.png";
import Account from "../assets/account.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="text-white shadow-md">
      <div className="container p-4 bg-gray-200 flex items-center justify-between">
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-black focus:outline-none mr-1 flex items-center"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          &#9776;
        </button>

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img className="h-10 w-10 ml-2" src={Logo} alt="Logo" />
        </Link>

        {/* Search Bar (Only in Desktop View) */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex items-center border border-green-700 bg-white rounded-md">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full p-2 text-black focus:outline-none"
            />
            <button className="bg-green-900 p-2 text-white">Go</button>
          </div>
        </div>

        {/* Login */}
        <div className="flex items-center space-x-4 ml-6">
          <Link to="/login">
            <img src={Account} className="w-7 h-7" alt="Login" />
          </Link>
        </div>
      </div>

      {/* Navigation Links (Mobile & Desktop) */}
      <div
        className={`bg-gray-700 p-2 transition-all duration-300 ease-in-out ${
          menuOpen ? "block" : "hidden md:flex"
        }`}
      >
        <ul className="flex flex-col md:flex-row md:space-x-6">
          <li><Link to="/babycare" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>Babycare</Link></li>
          <li><Link to="/bakery" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>Bakery</Link></li>
          <li><Link to="/beauty" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>Beauty</Link></li>
          <li><Link to="/beverages" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>Beverages</Link></li>
          <li><Link to="/household" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>Household</Link></li>
          <li><Link to="/foodgrains" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>Foodgrains</Link></li>
          <li><Link to="/snacks" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>Snacks</Link></li>
          <li><Link to="/gourmets" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>Gourmets</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
