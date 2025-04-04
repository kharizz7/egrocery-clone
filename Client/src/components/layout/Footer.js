import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-4 py-10 px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm text-center md:text-left">
        {/* About Us */}
        <div>
          <h2 className="text-lg font-semibold mb-4">About Us</h2>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:text-gray-400">About Us</Link></li>
            <li><Link to="/terms" className="hover:text-gray-400">Terms of Use</Link></li>
            <li><Link to="/shop" className="hover:text-gray-400">Shop</Link></li>
            <li><Link to="/contact" className="hover:text-gray-400">Contact Us</Link></li>
            <li><Link to="/cart" className="hover:text-gray-400">Cart</Link></li>
            <li><Link to="/account" className="hover:text-gray-400">My Account</Link></li>
          </ul>
        </div>

        {/* Help Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Help</h2>
          <ul className="space-y-2">
            <li><Link to="/faq" className="hover:text-gray-400">FAQs</Link></li>
            <li><Link to="/support" className="hover:text-gray-400">Customer Support</Link></li>
            <li><Link to="/returns" className="hover:text-gray-400">Return Policy</Link></li>
          </ul>
        </div>

        {/* Consumer Policy */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Consumer Policy</h2>
          <ul className="space-y-2">
            <li><Link to="/privacy" className="hover:text-gray-400">Privacy Policy</Link></li>
            <li><Link to="/refunds" className="hover:text-gray-400">Refund Policy</Link></li>
            <li><Link to="/shipping" className="hover:text-gray-400">Shipping Policy</Link></li>
          </ul>
        </div>

        {/* Registered Office */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Registered Office</h2>
          <p>122/1, 1st Cross Street,</p>
          <p>Vivekananda Nagar, Kumbakonam</p>
          <p>Tamil Nadu - 612001</p>
          <p>Mobile: +91 8765342310</p>
        </div>
      </div>

      {/* Social Links */}
      <h2 className=" text-lg text-white font-semibold text-center mt-6">Follow us on</h2>
      <div className="flex justify-center space-x-6 text-2xl mt-2">
        
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:scale-110 transition-transform">
          <FaFacebook />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 hover:scale-110 transition-transform">
          <FaTwitter />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700 hover:scale-110 transition-transform">
          <FaInstagram />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 hover:scale-110 transition-transform">
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
