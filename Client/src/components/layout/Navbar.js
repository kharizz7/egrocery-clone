import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../../assets/egrocery-logo.png";
import Account from "../../assets/account.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Access user data from Redux
  const user = useSelector((state) => state.user.user);

  // Handle navigation based on login status
  const handleAccountClick = () => {
    if (user) {
      navigate("/profile"); // Redirect to profile if logged in
    } else {
      navigate("/account"); // Redirect to account if not logged in
    }
  };

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

        {/* Search Bar (Desktop) */}
        <div className="md:flex hidden w-[600px] justify-center">
          <div className="flex items-center border border-green-700 bg-white w-full">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full p-2 text-black focus:outline-none"
            />
            <button className="bg-green-900 p-2 text-white">Go</button>
          </div>
        </div>

        {/* Account Icon - Navigate Based on Login */}
        <div className="flex items-center space-x-4 ml-6">
          <img
            src={Account}
            className="w-7 h-7 cursor-pointer"
            alt="Account"
            onClick={handleAccountClick}
          />
        </div>

      </div>

      {/* Search Bar (Mobile) */}
      <div className="md:hidden flex-1 justify-center">
        <div className="flex items-center border border-green-700 bg-white">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full p-2 text-black focus:outline-none"
          />
          <button className="bg-green-900 p-2 text-white">Go</button>
        </div>
      </div>

      {/* Navigation Links */}
      <div
        className={`bg-gray-700 p-2 transition-all duration-300 ease-in-out ${
          menuOpen ? "block" : "hidden md:flex"
        }`}
      >
        <ul className="flex flex-col md:flex-row md:space-x-6">
          {[
            "grocery",
            "misscilenaous",
            "personalcare",
            "haircare",
            "housecare"
          ].map((item) => (
            <li key={item}>
              <Link
                to={`/${item}`}
                className="hover:text-gray-200"
                onClick={() => setMenuOpen(false)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
