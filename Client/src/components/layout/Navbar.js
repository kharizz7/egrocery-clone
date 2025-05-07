import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../../assets/egrocery-logo.png";
import Account from "../../assets/account.png";
import Location from "../../assets/location.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const selectedAddress = useSelector((state) => state.user.selectedAddress);


  // Optional: useEffect to log when selectedAddress changes
  useEffect(() => {
    if (selectedAddress) {
      console.log("Selected Address from Redux:", selectedAddress);
    } else {
      console.log("No address selected");
    }
  }, [selectedAddress]);

  const handleAccountClick = () => {
    navigate(user ? "/profile" : "/account");
  };

  const handleLocation = () => {
    navigate("/addAddress");
  };

  return (
    <nav className="text-white shadow-md">
      <div className="container p-4 bg-gray-200 flex items-center justify-between">
        <button
          className="md:hidden text-black focus:outline-none mr-1 flex items-center"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          &#9776;
        </button>

        <Link to="/" className="flex-shrink-0">
          <img className="h-10 w-10 ml-2" src={Logo} alt="Logo" />
        </Link>

        <div
          className="flex items-center space-x-2 ml-6 cursor-pointer"
          onClick={handleLocation}
        >
          <img src={Location} className="w-7 h-7" alt="Location" />
          <span className="text-black text-sm">
            {selectedAddress
              ? `${selectedAddress.areaCity}, ${selectedAddress.pincode}`
              : "Set Address"}
          </span>
        </div>

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

        <div className="flex items-center space-x-4 ml-6">
          <img
            src={Account}
            className="w-7 h-7 cursor-pointer"
            alt="Account"
            onClick={handleAccountClick}
          />
        </div>
      </div>

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

      <div
        className={`bg-gray-700 p-2 transition-all duration-300 ease-in-out ${
          menuOpen ? "block" : "hidden md:flex"
        }`}
      >
        <ul className="flex flex-col md:flex-row md:space-x-6">
          {[
            "grocery",
            "misscilenaous",
            "Personal Care",
            "haircare",
            "housecare",
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
